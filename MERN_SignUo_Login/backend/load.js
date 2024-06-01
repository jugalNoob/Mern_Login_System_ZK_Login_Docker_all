// cluster.js
const cluster = require('cluster');
const os = require('os');
const app = require('./index');

if (cluster.isPrimary) {
    const totalCPUs = os.cpus().length;

    console.log(totalCPUs)
    console.log(`Primary ${process.pid} is running`);
    for (let i = 6; i < totalCPUs; i++) {
       let worker = cluster.fork();
       worker.send('hi there'); // Sending a message to the worker
    }

    // Listen for dying workers
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        if (signal) {
            console.log(`Worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
            console.log(`Worker exited with error code: ${code}`);
        } else {
            console.log('Worker success!');
        }
    });

    cluster.on('disconnect', (worker) => {
        console.log(`The worker #${worker.id} has disconnected`);
    });
} else {
    process.on('message', (message) => {
        console.log(`Worker ${process.pid} received message: ${message}`);
    });
    // If it's a worker process, start the Express server
    const server = app.listen(9000, () => {
        console.log(`Worker ${process.pid} started and listening on port 9000`);
    });

    server.on('error', (error) => {
        console.error('Server failed to start:', error);
    });
}


// const cluster = require('cluster');
// const os = require('os');

// const express = require('express');

// // Create Express app
// const app = express();

// // Check if it's the primary process
// if (cluster.isPrimary) {
//     const totalCPUs = os.cpus().length;
//     for (let i = 7; i < totalCPUs; i++) {
//         cluster.fork();
//     }
// } else {

  
//     // Start server in worker process
//     const server = app.listen(9000, () => {
//         console.log(`Server is running on port 9000 in process ${process.pid}`);
//     });

//     server.on('error', (error) => {
//         console.error('Server failed to start:', error);
//     });
// }
