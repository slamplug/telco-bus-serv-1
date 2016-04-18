var express = require('express');
var router = express.Router();
var async = require('async');
var qs = require('querystring');
var request = require('request');
var config = require('config');

router.get('/', function(req, res, next) {

    var lcqParams = qs.stringify({
        cli: req.query.cli,
        postcode: req.query.postcode
    });

    var lcOptions = {
        host: config.get('lineCheckHostname'),
        path: '/telco__tt--line-characteristics-adaptor/v1/line-characteristics?' + lcqParams,
    };

    //console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
    //console.log(lcOptions.host + lcOptions.path);

    /*
        send line characteristics and address match in parallel
    */
    async.parallel({
        callOne: function(callback) {
            var url = lcOptions.host + lcOptions.path
            request(url, function(error, response, body) {
                callback(error, body)
            })
        }/*,
        callTwo: function(callback) {
            request("http://google.com", function(error, response, body) {
                callback(error, body)
            })
        }*/
    }, function(err, results) {
        if (err) {
            res.status(500)
            res.send(JSON.stringify({
                errorCode: 500,
                errorMessage: err
            }));
        } else {
            // Merge the results and stuff

            //var lcResponse = JSON.parse(results.callOne);
            //console.log(results.callOne);
            //console.log(results.callOne)
            //console.log(results.callTwo)
            res.send(results.callOne);
            //res.send(JSON.stringify({
            //    cli: req.query.cli,
            //    postcode: req.query.postcode
            //}));
        }
    });
});

module.exports = router;