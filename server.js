//console.log('this is suck');

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);
//console.log(T);

var fs = require('fs');
var obj
fs.readFile('./tweet_file.json',preprocess);

function preprocess(err,data){
  if (err){
    throw err;
  }
  obj = JSON.parse(data);
  //console.log(obj.repeated_phrase);
}
//var id_acc = 1094789694280261600;

tweetIt();
setInterval(tweetIt, 16800*1000);

function tweetIt(){
  T.get('statuses/user_timeline', {screen_name: 'MAESHIMAAMI_ave', count: 2}, function(err, data, response){
    if (err){
      return
    }
    for (var i in data) {
      if (data[i].text.includes("おやすみなさい")) {
        obj.saved_phrase = data[i].text;
        break;
      }
    }
    var status= obj.saved_phrase + "\n\n" + obj.repeated_phrase;
    console.log(status);
    tweetStatus(status);
  })
}

function tweetStatus(text){
  //var randInt = Math.floor(16800*1000);
  var tweet = {
    status: text
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
