module.exports = {
    tweetStatus: function (T, text) {
        //var randInt = Math.floor(16800*1000);
        var tweet = {
            status: text
        }

        T.post('statuses/update', tweet, this.isTweeted);
    },

    isTweeted: function (err, data, response) {
        //console.log(response);
        if (err) {
            console.log(err);
        } else {
            console.log("it works!");
        }
    }
}