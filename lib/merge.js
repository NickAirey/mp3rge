

// takes array of objects [{source: 'abc', ...}, ...]
// returns a single merged object
exports.merge = function (args) {
    var file = args.find(function (item) {
        return item.source === 'file';
    }) || {};

    var upload = args.find(function (item) {
        return item.source === 'upload';
    }) || {};

    var reference = args.find(function (item) {
        return item.source === 'reference';
    }) || {};

    return Object.assign(file, upload, reference, {source: 'merge'});
};