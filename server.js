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
  //console.log(obj);
}
//var id_acc = 1094789694280261600;

tweetIt();
setInterval(tweetIt, 60*1000);

function tweetIt() {
    T.get('statuses/user_timeline', { screen_name: 'MAESHIMAAMI_ave', count: 10 }, function (err, data, response) {
        if (err) {
            return
        }
        //console.log(data[0].text);
        var status, jsonOutput;
        for (var i in data) {
            if (data[i].text.includes("おやすみなさい")) {
                if (data[i].text === obj.saved_phrase) {
                    console.log('same oyasumi as last night');
                    break;
                } else {
                    obj.saved_phrase = data[i].text;
                    status = obj.saved_phrase;
                    console.log(status);
                    tweetStatus(status);
                    jsonOutput = JSON.stringify(obj);
                    console.log(jsonOutput);
                    fs.writeFile('./tweet_file.json', jsonOutput, function (err) { console.log(err); });
                    return;
                }
            } else if (data[i].text.includes("おはよう")) {
                if (data[i].text === obj.saved_phrase) {
                    console.log('same ohayou as last time');
                    break;
                } else {
                    obj.saved_phrase = data[i].text;
                    status = obj.saved_phrase + "\n\n" + obj.repeated_phrase;
                    console.log(status);
                    tweetStatus(status);
                    jsonOutput = JSON.stringify(obj);
                    console.log(jsonOutput);
                    fs.writeFile('./tweet_file.json', jsonOutput, function (err) { console.log(err); });
                    return;
                }
            } else {
                console.log('not oyasuminasai nor ohayou');
                console.log(data[i].text);
            }
        }
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        obj.last_tweeted = datetime;
        jsonOutput = JSON.stringify(obj);
        fs.writeFile('./tweet_file.json', jsonOutput, function (err) { if (err) console.log(err); });
    });
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
