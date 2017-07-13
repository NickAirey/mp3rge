
var f = require('lib/filesLocal');


// takes a mp3 input stream
// returns the metadata json from the mp3
function parseMetaData(stream, fileName) {
    return new Promise(function (resolve, reject) {
        console.log(fileName + ": parsing metadata from stream");

        var result = null;

        stream.on('end', function () {
            console.log(fileName + ': stream read complete');
            resolve(result);
        });

        stream.on('error', reject);

        mm(stream, { duration: true }, function (err, metadata) {
            if (err) {
                // we can't reject the promise here because we're already reading the file, hence the promise is resolved
                console.error(fileName + ": " + err.toString());
            } else {
                console.log(fileName + ': metadata is available: ' + JSON.stringify(metadata));
            }
            result = metadata;
        });
    });
}

exports.read = function (fileName) {
    return f.readFileStream(fileName + mp3Extension)
        .then(function (stream) {
            return parseMetaData(stream, fileName + mp3Extension);
        });
};
