// index.js
const express = require('express');
require('dotenv').config();
require('./db/conn');
const router = require('./routes/router');
const  { rateLimit }= require('express-rate-limit')
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const status =require('./status/stat')

const app = express();

// ---  status check in memory ------


app.use(status());



// ----------- >> Multi Hnadle error
// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof BadRequestError) {
        return res.status(400).json({ error: err.message });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ error: err.message });
    }

    // Handle other types of errors
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});




// CORS Configuration --------------------<><><><><>
const corsOption = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
};


// express-rate-limit  -----------<><><><><> ---------------

// limit: (req, res) => {
//         // Example: Dynamically set limit based on request properties
//         // For instance, return a different limit based on the user role
//         if (req.user && req.user.role === 'admin') {
//             return 200; // Higher limit for admin users
//         }
//         return 100; // Default limit for other users
//     },
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: true, // Enable the `X-RateLimit-*` headers.
    statusCode: 429, // The status code to be sent when rate limit is exceeded
    keyGenerator: (req, res) => {
        // Example: Use the 'x-forwarded-for' header if present, otherwise use the remote IP address
        return req.headers['x-forwarded-for'] || req.ip;
    },
    handler: (req, res) => {
        res.status(429).json({
            status: 429,
            message: "Too many requests, please try again later.",
            requestWasSuccessful: false
        });
    },
    message: {
        status: 429,
        message: "Too many requests, please try again later.",
        requestWasSuccessful: false
    }
});

/// My middele Ware 





// Helmet Configuration ------------------<><><><><>>

app.use(helmet({
    xDnsPrefetchControl: { allow: false },
    xContentTypeOptions: false,
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "example.com"]
        }
    },
    xDownloadOptions: false,
    frameguard: {
        action: 'deny'
    },
    referrerPolicy: {
        policy: 'same-origin'
    }
    // Add more helmet options here
}));





// Middleware ------------------------------<><><><><>>
app.use(limiter)
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOption));
app.use(router);



// exports ----------- <><><><> -------


module.exports = app;
