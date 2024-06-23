// index.js
const express = require('express');
require('dotenv').config();
require('./db/conn');
const router = require('./routes/router');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

// CORS Configuration
const corsOption = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
};

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOption));
app.use(router);

module.exports = app;
