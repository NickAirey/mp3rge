/*global describe,it*/

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var assert = chai.assert;

var parse = require('../lib/metadataFromFilename').parseMetadata;

describe('#metadatafromFilename() tests', function () {
    it("empty input", function () {
        assert.deepEqual(parse(''), {source: 'filename', filename: ''});
    });

    it("valid am", function () {
        var actual = parse('20060604am.mp3');
        var expected = new Date("June 4, 2006 09:00");

        assert.equal(actual.date.getTime(), expected.getTime());
        assert.equal(actual.lang, "en");
        assert.equal(actual.filename, "20060604am.mp3");
    });

    it("valid man", function () {
        var actual = parse('20070102man.mp3');
        var expected = new Date("Jan 2, 2007 13:00");

        assert.equal(actual.date.getTime(), expected.getTime());
        assert.equal(actual.lang, "cn");
        assert.equal(actual.filename, "20070102man.mp3");
    });

    it("valid pm", function () {
        var actual = parse('20170613pm.mp3');
        var expected = new Date("June 13, 2017 18:00");

        assert.equal(actual.date.getTime(), expected.getTime());
        assert.equal(actual.lang, "en");
        assert.equal(actual.filename, "20170613pm.mp3");
    });
});
