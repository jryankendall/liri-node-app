//Requires
require('dotenv').config();

var keys = require('./keys');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var constructs = require('./constructors');
moment().format();

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Getting command line args
var argV = process.argv;
var commandArg = argV[2];
var queryArg = argV
  .slice(3, argV.length)
  .join(' ')
  .toLowerCase();

//Setting up global vars
var cLog = console.log;
var txtFile = './random.txt';
var fileArray = [];

//these API keys may become non-functional after several months, if so you can replace it with your own API key from the appropriate places
var bandApiKey = 'codingbootcamp';
var movieApiKey = 'trilogy';

//Just prints arguments for reference
/* setTimeout(function() {
    cLog("Command: " + commandArg + "\nQuery Arguments: " + queryArg);
}, 100) */
//Was just for testing purposes

//Called to search for concerts with command line arg 'concert-this'
function getConcerts(artist) {
  var theArtist = artist.replace(/\x22|\x27/g, '');
  axios({
    method: 'get',
    url:
      'https://rest.bandsintown.com/artists/' +
      theArtist +
      '/events?app_id=' +
      bandApiKey
  })
    .then(function(response) {
      var data = response.data;
      for (var x in data) {
        var concertTime = moment(data[x].datetime, 'YYYY-MM-DDTHH:mm:ss');
        var concertVenue = data[x].venue;
        var concertLineup = data[x].lineup.join(', ');
        cLog('\n' + (parseInt(x) + 1) + '. ' + concertLineup);
        cLog(
          'Venue: ' +
            concertVenue.name +
            ' in ' +
            concertVenue.city +
            ', ' +
            concertVenue.region +
            ' ' +
            concertVenue.country
        );
        cLog('Date: ' + concertTime.format('dddd, MMMM Do YYYY'));
      }
    })
    .catch(function(error) {
      cLog('Something went wrong\n------');
      cLog(error);
      cLog('-----');
    });
}

//Called when an unknown command line command is entered
function listCommands() {
  cLog(
    'Invalid command. Valid commands are: \nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says\n--End of Line--\n'
  );
}

//In order for this function to... function, you'll need a '.env' file in the same directory as this js file, with your ID and client secret.
//An example file example.env file is here to assist
function spotifyThis(search) {
  spotify.search({ type: 'track', query: search, limit: 1 }, function(
    error,
    response
  ) {
    if (error) {
      return cLog(error);
    }

    var data = response.tracks.items[0];
    var newSong = new constructs.Song(data);
    newSong.printData();
  });
}

//Movie search API function
function movieThis(search) {
  axios({
    method: 'get',
    url: 'http://www.omdbapi.com/?apikey=' + movieApiKey + '&t=' + search
  })
    .then(function(response) {
      var data = response.data;
      var newMovie = new constructs.Movie(data);
      newMovie.printData();
    })
    .catch(function(error) {
      cLog('Something went wrong\n------');
      cLog(error);
      cLog('-----');
    });
}

//Reads the input file, in this case random.txt usually.
function readRandom(inputFile) {
  fs.readFile(inputFile, 'utf8', function(err, data) {
    if (err) cLog(err);

    fileArray = data.split(',');
    //Concert API throws a fit if it has quotations in the query so this trims off any extraneous quotation marks
    fileArray[1] = fileArray[1].replace(/\x22|\x27/g, '');
    cLog('Command: ' + fileArray[0]);
    cLog('Query: ' + fileArray[1]);
    execCommand(fileArray[0], fileArray[1]);
    //Wanted to make this work by 'returning' the results, but ran into callback heck so just nested it.
  });
}

//Was working on nesting some functions for better synchronization but didn't have much luck. This is the result below.
function doThis(func, file) {
  func(file);
}

//Main command execution function. Reads command, executes appropriate function
function execCommand(inputCommand, inputQuery) {
  switch (inputCommand) {
    case 'concert-this':
      if (inputQuery == undefined || inputQuery == '') {
        inputQuery = 'smash mouth';
      }
      getConcerts(inputQuery);
      break;
    case 'spotify-this-song':
      if (inputQuery == undefined || inputQuery == '') {
        inputQuery = 'all star';
      }
      spotifyThis(inputQuery);
      break;
    case 'movie-this':
      if (inputQuery == undefined || inputQuery == '') {
        inputQuery = 'ed wood';
      }
      movieThis(inputQuery);
      break;
    case 'do-what-it-says':
      doThis(readRandom, txtFile);
      break;
    default:
      //lists commands if an unknown one is entered
      listCommands();
      break;
  }
}

//Lists commands if nothing is entered
if (commandArg == '' || commandArg == undefined) {
  listCommands();
  return false;
} else {
  execCommand(commandArg, queryArg);
}
