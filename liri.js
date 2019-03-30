//Requires
require("dotenv").config();

var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var constructs = require("./constructors");
moment().format();

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Getting command line args
var argV = process.argv;
var commandArg = argV[2];
var queryArg = argV.slice(3, argV.length).join(" ").toLowerCase();


//Setting up global vars
var searchTerm = "";
var cLog = console.log;

//these API keys may become non-functional after several months, if so you can replace it with your own API key from the appropriate places
var bandApiKey = "codingbootcamp";
var movieApiKey = "trilogy";

//Just prints arguments for reference
/* setTimeout(function() {
    cLog("Command: " + commandArg + "\nQuery Arguments: " + queryArg);
}, 100) */
//Was just for testing purposes


//Called to search for concerts with command line arg 'concert-this'
function getConcerts(artist) {
    axios({
        method : 'get',
        url : "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandApiKey
    }).then(function(response){
        var data = response.data;
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

function listCommands() {
    cLog("Invalid command. Valid commands are: \nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says\n--End of Line--\n");
}

//In order for this function to... function, you'll need a '.env' file in the same directory as this js file, with your ID and client secret.
//An example file example.env file is here to assist
function spotifyThis(search) {
    spotify.search({ type: 'track', query: search, limit: 1}, function(error, response) {
        if (error) {
            return cLog(error);
        }

        var data = response.tracks.items[0];
        var newSong = new constructs.Song(data);
        newSong.printData();
    })
}

function movieThis(search) {
    axios({
        method: 'get',
        url: "http://www.omdbapi.com/?apikey=" + movieApiKey + "&t=" + search
    }).then(function(response){
        var data = response.data;
        var newMovie = new constructs.Movie(data);
        newMovie.printData();
    }).catch(function(error) {
        cLog("Something went wrong\n------");
        cLog(error);
        cLog("-----");
    });
};

if (commandArg == "" || commandArg == undefined) {
    listCommands();
    return false;
} else {
    switch (commandArg) {
        case "concert-this":
            if (queryArg == undefined || queryArg == "") {
                queryArg = "smash mouth";
            }
            getConcerts(queryArg);
            break;
        case "spotify-this-song":
            if (queryArg == undefined || queryArg == "") {
                queryArg = "all star";
            }
            spotifyThis(queryArg);
            break;
        case "movie-this":
            if (queryArg == undefined || queryArg == "") {
                queryArg = "ed wood";
            }
            movieThis(queryArg);
            break;
        case "do-what-it-says":
            doThis(queryArg);
            break;
        default:
            listCommands();
            break;
    }
}