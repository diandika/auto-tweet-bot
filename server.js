//console.log('this is suck');

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);
console.log(T);

var fs = require('fs');
var obj
fs.readFile('./tweet_file.json',preprocess);

function preprocess(err,data){
  if (err){
    throw err;
  }
  obj = JSON.parse(data);
  console.log(obj);
}

var id_acc = 1094789694280261600;

var stream = T.stream('statuses/filter', {follow: id_acc});
stream.on('tweet', function(err, data, response){
  console.log(data);
});

function tweetStatus(){
  var randInt = Math.floor(Math.random()*1000);
  var tweet = {
    status: 'this should be tweeted once in a minute\n#' + randInt + ' <- for unique tweet'
  }

  T.post('statuses/update', tweet, isTweeted);

  function isTweeted(err, data, response){
    //console.log(response);
    if (err) {
      console.log(err);
    } else {
      console.log("it works!");
    }
  }
}
