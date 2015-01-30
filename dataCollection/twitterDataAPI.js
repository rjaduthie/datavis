var Twit = require('twit');
var fs = require('fs');
var twit = new Twit({
	consumer_key : 'nqLmaeDCF5cSabmSnKNymmNKT',
	consumer_secret : 'GXq3PxH0bztI9KtpWJ0SKFoNFLViCaXJuhCc81zwSUZMZWTFgK',
	access_token : '22052295-gbFW5yDbeV8oJso75RvoJ7L0By6L1UG8Ug4PQB4js',
	access_token_secret : 'QbVQQHqom9mFRkXUlFTiEiDPt5k3Wt2twoyKnHonzKBGU'
});

var scotland = [ '-8', '54', '-0.5', '60.85' ];
var uk = [ '-9.23', '49.84', '2.69', '60.85' ];
var ireland = [ '-9.5', '51.4', '-5.5', '55.5' ];
//var stream1 = twit.stream('statuses/filter', { locations: scotland});
//var stream2 = twit.stream('statuses/filter', { locations: ireland});
var stream3 = twit.stream('statuses/filter', { track: "awesome"});
var log = fs.createWriteStream('tweets.log');

//stream1.on('tweet', processTweet);
//stream2.on('tweet', processTweet);
stream3.on('tweet', processTweet);

function processTweet(tweet) {

	var regexp = /.*beaut[(y)(iful)].*/gi;
	var words = tweet.text.match(regexp);
    if (words != null) {
        console.log(tweet);
    }
	//log.write(words);
    //strTweet = JSON.stringify(tweet);
    //log.write(strTweet);
}