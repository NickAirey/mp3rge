/*global describe,it*/

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var assert = chai.assert;

var m = require('../lib/merge');

describe('#merge() tests', function () {
    it("empty input", function () {
        assert.deepEqual(m.merge([]), {source: 'merge'});
    });

    it("bogus", function () {
        assert.deepEqual(m.merge([ {source: 'bogus', a: 1, b: 2}]), {source: 'merge'});
    });

    it("single", function () {
        assert.deepEqual(m.merge([ {source: 'file', a: 1, b: 2}]), {source: 'merge', a: 1, b: 2});
    });

    it("single and bogus", function () {
        assert.deepEqual(m.merge([ {source: 'file', a: 1, b: 2},  {source: 'bogus', a: 3}]), {source: 'merge', a: 1, b: 2});
    });

    it("two values", function () {
        assert.deepEqual(m.merge([ {source: 'upload', a: 1, b: 3},  {source: 'file', a: 2}]), {source: 'merge', a: 1, b: 3});
    });

    it("three values", function () {
        assert.deepEqual(m.merge([ {source: 'upload', a: 1, b: 3},  {source: 'reference', a: 4}, {source: 'file', a: 2}]), {source: 'merge', a: 4, b: 3});
    });
});
