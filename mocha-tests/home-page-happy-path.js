var request = require('superagent');
var expect = require('expect.js');

// TODO: Runs with 'mocha home-page-happy-path.js' This may be enough for CI.

before(function () {

    console.log("Starting tests");
});

describe('suite one', function () {

    it('Home page loads successfully', function (done) {
        request.get('localhost:3000').end(function (res) {

            expect(res).to.exist;
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('Main title is displayed', function (done) {
        request.get('localhost:3000').end(function (res) {

            expect(res.text).to.contain('Parking Lot');
            done();
        });
    });
});