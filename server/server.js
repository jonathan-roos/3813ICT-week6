// Import modules
const express = require('express') 
var cors = require('cors');
const app = express(); // Create express app instance
const http = require('http').Server(app); // create an HTTP server instance 
const path = require('path');

// Port used for server
const PORT = 3000;

// Middleware
app.use(express.json())
app.use(cors()) // Adding CORS middleware to app
app.use(express.static(path.join(__dirname + '../dist/chat'))); // Serve the built Angular app static files

const io = require('socket.io')(http,{
    cors:{
        origin: "http://localhost:4200",
        methods: ["GET","POST"],
    }
});

const server = require('./listen.js');
const sockets = require('./socket.js');

// Start server listening for requests on port 3000
server.listen(http, PORT);
sockets.connect(io, PORT);