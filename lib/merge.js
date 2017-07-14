

// takes array of objects [{source: 'abc', ...}, ...]
// returns a single merged object
exports.merge = function (args) {
    var file = args.find(function (item) {
        return item.source === 'tags';
    }) || {};

    var upload = args.find(function (item) {
        return item.source === 'filename';
    }) || {};

    var reference = args.find(function (item) {
        return item.source === 'reference';
    }) || {};

    return Object.assign(file, upload, reference, {source: 'merge'});
};