var Twit = require('twit');
var config = require('./config');
var postTweet = require('./func/tweet.js');

var T = new Twit(config);

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
    //postTweet.tweetStatus(T, "あら? ");
    tweetIt();
    setInterval(tweetIt, 20 * 60 * 1000);
}

function tweetIt() {
    var now = new Date();
    var time = {
        "h": now.getHours(),
        "m": now.getMinutes(),
        "s": now.getSeconds()
    }
    //console.log(obj.emoji[Math.floor(Math.random() * (obj.emoji.length - 1))]);
    var outjsonOutput = {};
    if (time.h == 15 && obj.lastTweet != 1) {
        var intTweeting = Math.floor(Math.random() * 100);
        var isTweeting = (intTweeting % 11) == 0;
        if (isTweeting) {
            var rawTweet = "あら、おやつの時間だわ";
            var emojiIdx = Math.floor(Math.random() * (obj.emoji.length - 1));
            var tweet = rawTweet + emojiIdx;
            postTweet.tweetStatus(T, tweet);
            obj.lastTweet = 1;
            outjsonOutput = JSON.stringify(obj);
            fs.writeFile('./tweet_file.json', jsonOutput, function (err) { if (err) console.log(err); });
        }
    } else if (time.h == 22 && obj.lastTweet != 2) {
        var intTweeting = Math.floor(Math.random() * 100);
        var isTweeting = (intTweeting % 11) == 0;
        if (isTweeting) {
            var rawTweet = "おやすみ〜";
            var emojiIdx = Math.floor(Math.random() * (obj.emoji.length - 1));
            var tweet = rawTweet + emojiIdx;
            postTweet.tweetStatus(T, tweet);
            obj.lastTweet = 2;
            outjsonOutput = JSON.stringify(obj);
            fs.writeFile('./tweet_file.json', jsonOutput, function (err) { if (err) console.log(err); });
        }
        obj.isTeaTimeDone = false;
    } else if (time.h == 10 && obj.lastTweet != 3) {
        var intTweeting = Math.floor(Math.random() * 100);
        var isTweeting = (intTweeting % 11) == 0;
        if (isTweeting) {
            var rawTweet = "おはよう〜";
            var emojiIdx = Math.floor(Math.random() * (obj.emoji.length - 1));
            var tweet = rawTweet + emojiIdx;
            postTweet.tweetStatus(T, tweet);
            obj.lastTweet = 3;
            outjsonOutput = JSON.stringify(obj);
            fs.writeFile('./tweet_file.json', jsonOutput, function (err) { if (err) console.log(err); });
        }
    }

    /*T.get('statuses/user_timeline', { id: 619187741, count: 1 }, function (err, data, response) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data[0].text);
        var status, jsonOutput;
        for (var i in data) {
            var amitaCurrentTweet = data[i].text;
            if (amitaCurrentTweet.includes("おやすみなさい") || amitaCurrentTweet.includes("おはよ")) {
                if (amitaCurrentTweet === obj.saved_phrase) {
                    //console.log('same as last time');
                    break;
                } else {
                    obj.saved_phrase = amitaCurrentTweet;
                    status = amitaCurrentTweet.includes("おはよ") ? (obj.saved_phrase + "\n\n" + obj.repeated_phrase) : obj.saved_phrase;
                    console.log(status);
                    postTweet.tweetStatus(T, status);
                    jsonOutput = JSON.stringify(obj);
                    console.log(jsonOutput);
                    fs.writeFile('./tweet_file.json', jsonOutput, function (err) { console.log(err); });
                    return;
                }
            } else {
                //console.log('not oyasuminasai nor ohayou');
                //console.log(data[i].text);
            }
        }
        jsonOutput = JSON.stringify(obj);
        fs.writeFile('./tweet_file.json', jsonOutput, function (err) { if (err) console.log(err); });
    });*/
}

