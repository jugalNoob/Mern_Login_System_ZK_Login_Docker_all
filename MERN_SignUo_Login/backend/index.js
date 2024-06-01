
const express = require('express');
require('dotenv').config();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
// const port = process.env.PORT || 9000;

// Cors Configuration

const corsOption = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true // Corrected property name and value
};




// Other Middleware
app.use(cookieParser());
app.use(express.json());

app.use(cors(corsOption));
app.use(router);

// Start the server


module.exports = app;



