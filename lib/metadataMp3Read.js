
var mm = require('musicmetadata');

// takes a mp3 input stream
// returns the metadata json from the mp3
exports.parseMetadata = function (stream) {
    return new Promise(function (resolve, reject) {
        console.log("reading stream");

        var result = null;

        stream.on('end', function () {
            if (result === null) {
                result = {source: 'tags'};
            }

            if (result.artist) {
                Object.assign(result, {artist: result.artist[0], source: 'tags'});
            }

            console.log('stream read complete');
            resolve(result);
        });

        stream.on('error', reject);

        mm(stream, { duration: true }, function (err, data) {
            if (err) {
                // we can't reject the promise here because we're already reading the file, hence the promise is resolved
                console.error(err.toString());
            }
            console.log('tag metadata is available');
            result = data;
        });
    });
};
