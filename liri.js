require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js")
var request = require("request");
var Spotify = require("node-spotify-api")
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var toSearch = process.argv[3];

//console.log('our action is: ' + action)

switch (action) {
    case "spotify-this-song":
        callSpotify();
        break;
    case "my-tweets":
        callTwitter();
        break;
    case "movie-this":
        callOmdb();
        break;
    case "do-what-it-says":
        callRandom();
        break;
};

function callSpotify() {
    if (toSearch === undefined) {
        var defaultSong = spotify.search({
            type: 'track',
            query: 'despacito',

        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            else {
                console.log("\n *** 🔊  SPOTIFY  🎧  ***\n");
                var foundTracks = data.tracks.items;
                for (var i = 0; i < foundTracks.length; i++) {
                    console.log('Title: ' + foundTracks[i].name);

                    for (var j = 0; j < foundTracks[i].artists.length; j++) {
                        console.log('Artist: ' + foundTracks[i].artists[j].name)
                    }
                    console.log('Album: ' + foundTracks[i].album.name);
                    console.log('Preview Link: ' + foundTracks[i].preview_url)
                    console.log("\n")
                }
            }
            console.log("\n------------\n");
        });
    }
    else {
        spotify.search({
            type: 'track',
            query: toSearch,
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            else {
                console.log("\n *** 🔊  SPOTIFY  🎧  ***\n");
                var foundTracks = data.tracks.items;
                for (var i = 0; i < foundTracks.length; i++) {
                    console.log('Title: ' + foundTracks[i].name);

                    for (var j = 0; j < foundTracks[i].artists.length; j++) {
                        console.log('Artist: ' + foundTracks[i].artists[j].name)
                    }
                    console.log('Album: ' + foundTracks[i].album.name);
                    console.log('Preview Link: ' + foundTracks[i].preview_url)
                    console.log("\n")
                }
            }
            console.log("\n------------\n");
        });
    }
}

function callTwitter() {
    var params = { screen_name: 'adrrriiii' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            return console.log('Error occurred: ' + error);;
        } else {
            console.log("\n *** 🔎   TWITTER  📰  ***\n");
            for (var i = 0; i < tweets.length; i++) {
                console.log((i + 1) + ". " + tweets[i].text);
            }
            console.log("\n------------\n");
        }
    });
}

function callOmdb() {
    console.log("\n *** 🎬  MOVIE  🎥  ***\n")
    if (toSearch === undefined) {
        var queryUrl = "http://www.omdbapi.com/?t=mr%20nobody&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                console.log("Movie Title: " + JSON.parse(body).Title + "\n");
                console.log("* If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/> \n* It's on Netflix! \n")
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });

    }

    else {
        var queryUrl = "http://www.omdbapi.com/?t=" + toSearch + "&y=&plot=short&apikey=trilogy";
        //    console.log(queryUrl);
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    }
}

function callRandom() {
   fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
        return console.log(err);
      }
      var dataArr = data.split(',');

      callSpotify(dataArr[1]);
   })

}