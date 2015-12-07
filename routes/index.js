var express = require('express');
var router = express.Router();
var twitterAPI = require('node-twitter-api');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var splitweet = require('splitweet')
var ss = splitweet.split;
var twitter = new twitterAPI({
    consumerKey: 'wZ55SggBffWW5sjcq8HUvFywU',
    consumerSecret: 'el2cXHRHbPpF4AmCGU2CMlc35gkeXKJEeNLnV574hvQsV5d9Pq',
    callback: 'http://chn.mod.bz/callbackurl'
    //callback: 'http://127.0.0.1:8080/callbackurl'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.ejs');
});

router.post('/preview', function(req, res, next) {
    res.render('preview.ejs',{
        tweetContent: req.body.tweetContent
    });
});

router.post('/twitterSignIn', function(req, res, next) {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            var sess = req.session;
            sess.rToken = requestToken;
            sess.rTokenSecret = requestTokenSecret;
            sess.tweetType= req.body.tweetType;
            res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
        }
    });
});

router.get('/callbackurl', function(req, res, next) {
    var oToken = req.query.oauth_token;
    var oVerifier = req.query.oauth_verifier;
    var rToken = '';
    var rTokenSecret = '';
    var sess = req.session;
    rToken = sess.rToken;
    rTokenSecret = sess.rTokenSecret;

    twitter.getAccessToken(rToken, rTokenSecret, oVerifier, function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            aToken = accessToken;
            aTokenSecret = accessTokenSecret;
            req.session.aToken = accessToken;
            req.session.aTokenSecret = accessTokenSecret;
            if(sess.tweetType === 'One'){
                req.session.handle = "#ChennaiRescue";
                //req.session.handle = "#prabusah";
                res.render('rescue.ejs',{
                    tweetContent: sess.tweetType
                });
            }else if(sess.tweetType === 'Two'){
                req.session.handle = "#VolunteerForChennai";
                //req.session.handle = "#prabusah";
                res.render('volunteer.ejs',{
                    tweetContent: sess.tweetType
                });
            }else {
                req.session.handle = "#ChennaiRainsHelp";
                //req.session.handle = "#prabusah";
                res.render('help.ejs',{
                    tweetContent: sess.tweetType
                });
            }    
        }
    });
});

router.post('/update', upload.single('my_file'), function(req, res, next) {
    var sess = req.session;
    var result = '';
    if(req.file !== undefined) {
        twitter.uploadMedia({
                media: req.file.path,
                isBase64: false
            },
            sess.aToken,
            sess.aTokenSecret,
            function(error, data) {
                if (error) {
                    result = "Upload failed. Please try later : "+ error; 
                    res.render('status.ejs',{
                        status: result
                    });
                } else {
                    fs.unlink(req.file.path);
                    var tweetText = req.body.tweetContent;
                    var tweetArr = ss(tweetText, 115, '...');
                    var init = 1 + "/"+tweetArr.length+" ";
                    twitter.statuses("update", {
                            status: init + tweetArr[0],
                            media_ids: data.media_id_string
                        },
                        sess.aToken,
                        sess.aTokenSecret,
                        function(error, data) {
                            if (error) {
                                res.render('status.ejs',{
                                    status: "Oops Failed!" + error
                                });
                            } else {
                                result = "Tweet Success!";
                            }
                    });
                    for(i=1; i< tweetArr.length; i++){
                        var init = (i+1) + "/"+tweetArr.length+" ";
                        twitter.statuses("update", {
                            status: init + req.session.handle + " " + tweetArr[i]
                        },
                        sess.aToken,
                        sess.aTokenSecret,
                        function(error, data) {
                            if (error) {
                                res.render('status.ejs',{
                                    status: "Oops Failed!" + error
                                });
                            } else {
                                result = "Tweet Success!";
                            }
                        });
                    }
                    res.render('status.ejs',{
                        status: "Tweet Success!"
                    });                    
                }
        });
    }else {
        var tweetText = req.body.tweetContent;
        var tweetArr = ss(tweetText, 115, '...');
        var init = 1 + "/"+tweetArr.length+" ";
        twitter.statuses("update", {
                status: init + tweetArr[0]
            },
            sess.aToken,
            sess.aTokenSecret,
            function(error, data) {
                if (error) {
                    res.render('status.ejs',{
                        status: "Oops Failed!" + error
                    });
                } else {
                    result = "Tweet Success!";
                }
        });
        for(i=1; i< tweetArr.length; i++){
            var init = (i+1) + "/"+tweetArr.length+" ";
            twitter.statuses("update", {
                status: init + req.session.handle + " " + tweetArr[i]
            },
            sess.aToken,
            sess.aTokenSecret,
            function(error, data) {
                if (error) {
                    res.render('status.ejs',{
                        status: "Oops Failed!" + error
                    });
                } else {
                    result = "Tweet Success!";
                }
            });
        }
        res.render('status.ejs',{
            status: "Tweet Success!"
        });
    }
});

module.exports = router; //mising this will show "requires middleware function but got a ' + gettype(fn));" 
