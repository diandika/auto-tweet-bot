var Twit = require('twit');
var config = require('./config');
var postTweet = require('./func/tweet.js');

var T = new Twit(config);
//console.log(T);

var fs = require('fs');
var obj
fs.readFile('./tweet_file.json', preprocess);

function preprocess(err, data) {
    if (err) {
        throw err;
    }
    obj = JSON.parse(data);
    //console.log(obj);
    programBegin();
}
//var id_acc = 1094789694280261600;

function programBegin() {
    postTweet.tweetStatus(T, "あら? ");
    tweetIt();
    setInterval(tweetIt, 60 * 1000);
}

function tweetIt() {
    var now = new Date();
    var time = {
        "h": now.getHours(),
        "m": now.getMinutes(),
        "s": now.getSeconds()
    }
    console.log(obj.emoji[Math.floor(Math.random() * (obj.emoji.length - 1))]);

    if (time.h === 15 && time.m === 0) {
        var teaTime = "あら、おやつの時間だわ";
        if (obj.saved_phrase !== teaTime) {
            var emojiIdx = Math.floor(Math.random() * (obj.emoji.length - 1));
            postTweet.tweetStatus(T, teaTime + " " + obj.emoji[emojiIdx]);
        }
    }

    T.get('statuses/user_timeline', { screen_name: 'MAESHIMAAMI_ave', count: 1 }, function (err, data, response) {
        if (err) {
            return;
        }
        //console.log(data[0].text);
        var status, jsonOutput;
        for (var i in data) {
            var amitaCurrentTweet = data[i].text;
            if (amitaCurrentTweet.includes("おやすみなさい") || amitaCurrentTweet.includes("おはよう")) {
                if (amitaCurrentTweet === obj.saved_phrase) {
                    console.log('same as last time');
                    break;
                } else {
                    obj.saved_phrase = amitaCurrentTweet;
                    status = amitaCurrentTweet.includes("おはよう") ? (obj.saved_phrase + "\n\n" + obj.repeated_phrase) : obj.saved_phrase;
                    console.log(status);
                    postTweet.tweetStatus(T, status);
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

