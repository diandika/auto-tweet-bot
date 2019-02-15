//console.log('this is suck');

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

setInterval(tweetStatus, 1000*60);

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
