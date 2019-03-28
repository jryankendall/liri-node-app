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

//Setting up global vars
var searchTerm = "";
var cLog = console.log;

setTimeout(function() {
    cLog("Command: " + commandArg + "\nQuery Arguments: " + queryArg);
}, 100)

function getConcerts(artist) {
    axios({
        method : 'get',
        url : "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    }).then(function(response){
        var data = response.data;
        cLog("You Searched For: " + artist + "\nResults:");
        for (var x in data) {
            var concertTime = moment(data[x].datetime, "YYYY-MM-DDTHH:mm:ss");
            var concertVenue = data[x].venue;
            var concertLineup = data[x].lineup.join(', ');
            cLog("\n" + (parseInt(x)+1) + ". " + concertLineup);
            cLog("Venue: " + concertVenue.name + " in " + concertVenue.city + ", " + concertVenue.region + " " + concertVenue.country);
            cLog("Date: " + concertTime.format("dddd, MMMM Do YYYY"));
        }
    }).catch(function(error) {
        cLog("Something went wrong\n------");
        cLog(error);
        cLog("-----");
    });
}

function spotifyThis(search) {
    spotify.search({ type: 'track', query: search, limit: 1}, function(error, response) {
        if (error) {
            return cLog(error);
        }

        var data = response.tracks.items;
        cLog(response.tracks.items);
    })
}

if (commandArg == undefined) {
    cLog("Invalid arguments received. Try again.");
    return false;
} else {
    switch (commandArg) {
        case "concert-this":
            getConcerts(queryArg);
            break;
        case "spotify-this-song":
            if (queryArg == undefined) {
                spotifyThis("the sign");
            } else 
            {
                spotifyThis(queryArg);
            }
            break;
        case "movie-this":
            movieThis(queryArg);
            break;
        case "do-what-it-says":
            doThis(queryArg);
            break;
        default:
            cLog("Invalid command. Valid commands are: \nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says\n--End of Line--\n");
            break;
    }
}