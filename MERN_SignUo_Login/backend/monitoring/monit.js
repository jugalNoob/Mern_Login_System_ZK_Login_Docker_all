const client = require("prom-client"); // Metrics collection
const responseTime = require('response-time');
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");

const express = require('express');
const router = express.Router();

var StatsD = require('node-statsd')
var stats = new StatsD()


const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
};


const logger = createLogger(options);

// Collect default metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });


// Histogram for request-response time
const reqResTime = new client.Histogram({  
  name: "http_express_req_res_time_Historgram",
  help: "This tells how much is taken by req and res",
  labelNames: ['method', 'route', 'status_code'],
  buckets: [1, 50, 100, 200, 500, 800, 1000, 2000]
});


// Counter for total requests
const totaReq = new client.Counter({
  name: "total_req",
  help: "Tells total req"
});




// Gauge for active connections
const activeConnections = new client.Gauge({
  name: "active_connections",
  help: "Number of active connections",
  labelNames: ['service'],
});


// Summary for request durations
const requestDurationSummary = new client.Summary({  //
  name: "request_duration_summary",
  help: "Summary of request durations",
  labelNames: ['method', 'route' ,'status_code'],
  percentiles: [0.5, 0.9, 0.99],
});


router.use((req,res , next)=>{

console.log( req.headers)
console.log(res.getHeaders())

  next()
})


// router.use((req, res, next) => {
//   let requestBodySize = 0;

//   req.on('data', (chunk) => {
//     requestBodySize += chunk.length;
//   });

//   req.on('end', () => {
//     console.log("Request Body Size (bytes):", requestBodySize);
//   });

//   next();
// });
  // console.log("Request Headers:", req.headers);
  // console.log("Response Headers:", res.getHeaders());  
// Middleware for response time


  router.use(responseTime((req, res, time) => {   //this is middle ware 

    
    //.Summary graph
      // Observe the actual request duration using the 'time' parameter
      requestDurationSummary.labels(
     req.method  || "GET" || "POST" || "PATCH" || "Delete",
        req.url ,// You can use 'req.url' as the route label
        res.statusCode
      ).observe(time);
    

    // Increment the activeConnections gauge for the service when a new connection is established
    activeConnections.labels({ service: 'your_service_name' }).inc();
  
    // Increment the total request counter
    totaReq.inc();
  
    activeConnections.labels({ service: 'your_service_name' }).inc();

    // Log the total number of requests how many user a  website
    console.log("Total Requests:", totaReq.hashMap[''].value);
  
    // Log the current date and time
    let datatimes = new Date();
    console.log("Current Date and Time:", datatimes);


      // Log additional request and response information
  console.log("Request Headers:", req.headers);
  console.log("Response Headers:", res.getHeaders());



  // Calculate and log the size of the response body
  // let responseSize = 0;
  // res.on('data', (chunk) => {
  //   responseSize += chunk.length;
  // });
  // // console.log(responseSize)
  // res.on('end', () => {
  //   console.log("Response Size (bytes):", responseSize);
  // });
  // console.log("Request Headers:", req.headers);
  // console.log("Response Headers:", res.getHeaders());


  //check histogram graph
    // Observe the request-response time using the provided parameters
    reqResTime.labels({
      method: req.method || "GET" || "POST" || "PATCH" || "Delete",
      route: req.url,
      status_code: res.statusCode
    }).observe(time);
  

      // Decrement the activeConnections gauge when the response is finished
  // res.on('finish', () => {
  //   activeConnections.labels({ service: 'your_service_name' }).dec();
  // });


    // Log the response time
    console.log("Request Time:", time);



  }));
  

  ///Slow check Your  ////////////////////FIXME - 
  router.get("/slow", async (req, res) => {
    try {
      // The response time is captured by the 'response-time' middleware
      // totaReq.inc();
      logger.info('req came on /slow router');
      res.json({
        name: "jugal",
        class: "40"
      });
    } catch (error) {
      logger.error(error.message);
    }
  });


  //Meterix Your 
router.get("/metrics" ,async (req,res)=>{
    res.setHeader("Content-Type" ,client.register.contentType)
    const metrics=await client.register.metrics()
    // res.send(  totaReq.inc())
    res.send(metrics)

    

    // console.log(metrics)

})



module.exports = router; // Export the router for use in app.js