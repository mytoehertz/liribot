require("dotenv").config();
var keys = require("./keys.js");
var axios = require('axios');
//require all the modules
//use if and else statement to determine which API to use, concert-this spotify-this-song, movie-this, do-what-it-says

var Spotify = require("node-spotify-api");
var fs = require("fs");
var args = process.argv; // ['/path/to/node', 'path/to/js/file', 'ACTION', 'QUERY', 'TERM']
var action = args[2];
var query = args.slice(3).join("+"); // [3,4,5]
//The Action
switch (action) {
  case "spotify-this-song":
    getSong(query);
    break;
    case "movie-this":
    getMovie(query);
    break;
  case "concert-this":
    getConcerts(query);
    break;
  default:
    console.log("ACTION NOT SUPPORTED");
}
function getSong(songName) {
  var spotify = new Spotify(keys.spotify);
  if (!inputs) {
    inputs = "Feel Good inc";
  }
  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }
    var songInfo = data.tracks.items;
    console.log("Artist(s): " + songInfo[0].artists[0].name);
    console.log("Song Name: " + songInfo[0].name);
    console.log("Preview Link: " + songInfo[0].preview_url);
    console.log("Album: " + songInfo[0].album.name);
  });
}
function getConcerts(artist) {
  var bandsInTownURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${
    keys.bandsInTown.key
  }`;
  axios.get(bandsInTownURL).then(function(res) {
    console.log(res.data);
  });
}

function getMovie(movie) {
    var omdbURL = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=${
    keys.omdb.key
  }`;
  axios.get(omdbURL).then(function(res) {
    console.log(res.data);
  });
}


//omdb movie 

let movieString = "";
for(var i = 3;i< process.argv.length;i++){
    if(i == process.argv.length - 1){
        movieString += process.argv[i];
    }else{
        movieString += process.argv[i]+"+";
    }  

}

var urlBase = "http://www.omdbapi.com/?t=";
var restOfUrl = '&y=&plot=short&apikey=';
var ombdKey = keys.ombd;

var fullURL = urlBase+movieString+restOfUrl+ombdKey;

//console.log(movieString);

axios
    .get(fullURL)
    .then(response => {
        console.log(response.data.Released);
    });