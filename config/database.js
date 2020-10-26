// require mongoose
const mongoose = require('mongoose');

// require chalk for coloring console text
const chalk = require('chalk');

// import database url from the properties file
const dbURL = require('./properties').DB;

// color the console texts using chalk

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

// export thus function and import it in the server.js file
module.exports = function() {
    // create the mongoose database for handling all the events
    mongoose.connect(dbURL);

    // text display on connection
    mongoose.connection.on('connected', function() {
        console.log(connected("Mongoose default connection is open to", dbURL));
    });

    // text display on error
    mongoose.connection.on('error', function(err) {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    // display when disconnected
    mongoose.connection.on('disconnected', function() {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    // termination

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(termination("Mongoose default connection is disconnected due to the application termination"));
            process.exit(0);
        });
    });
}