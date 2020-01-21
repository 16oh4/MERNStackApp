//Libraries to "import" for use
const express = require('express');     //Express is a web app framework for Node.js
const cors = require('cors');           //CORS is cross-origin resource sharing
const mongoose = require('mongoose');   //Abstraction for schema to represent application data for better communication with mongoDB

//Allows the use of .env as portable files
//Will become part of process.env (From Node.js)
require('dotenv').config();

//Create an express app
const app = express();

//Define port to use in Node.js
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Fetch the URI from the .env file
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,      //mongoDB node.js driver re written
    useCreateIndex: true,       //for using deprecated function
    useUnifiedTopology: true,
} );

//get reference to the connection we tried to open above
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
});

//Import the exercises and users .js files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//When someone accesses the mysite.com/exercises or users files, then it will load everything in the routers
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//Open server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

/*
console.log(module.filename);
console.log(module.id);
console.log(module.exports);
*/