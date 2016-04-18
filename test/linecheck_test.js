var request = require('sync-request');
var sleep = require('sleep');
var mockApiServer = require('mock-api-server');

describe('line-characteristics tests', function() {

    var api = new mockApiServer({"port": 7777});

    before(function(done) {
        //console.log('****** in before');
        api.start(function(err) {
            console.log(err);
            done(err);
        });
    });

    after(function() {
        //console.log('****** in after');
        api.stop();
    });

    it('should find broadband available', function() {
        console.log('****** running test...');
        var result = request('GET', "http://localhost:3000/linecheck?cli=01630656588&postcode=TF93DJ");
        console.log(result.getBody());
        console.log(result.statusCode);

        var json = JSON.parse(result.getBody());
        console.log(json);
    });
});
