
//
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// allows for environment variables to be configured in dotenv file
require('dotenv').config(); 

// creates express web server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // allows the server to parse json that is sent and received

// database uri (connection string)
const uri = process.env.ATLAS_URI;
// start connection to the MongoDB Atlas DB
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
// confirm connection to MongoDB Atlas DB
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//
const execerisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// sets up routes
app.use('/exercises', execerisesRouter);
app.use('/users', usersRouter);

// starts server on port
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});