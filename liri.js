//Requires
require("dotenv").config();

var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
moment().format();

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Getting command line args
var argV = process.argv;
var commandArg = argV[2];
var queryArg = argV[3];

//concats all extra command line args to the query in case the user doesnt use quotes around their search input, etc
if (argV.length >= 5) {
    for (var i = 4; i < argV.length; i++) {
        queryArg += " " + argV[i];
    }
}

setTimeout(function() {
    console.log("Command: " + commandArg + "\nQuery Arguments: " + queryArg);
}, 100)

