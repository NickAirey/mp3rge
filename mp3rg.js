
var mergeObjects = require('./lib/merge').merge;
var extractMp3Meta = require('./lib/metadataMp3Read').parseMetadata;
var writeMp3MetaTags = require('./lib/metadataMp3Write').write;
var files = require('./lib/filesLocal');
//var files = require('./lib/filesS3');
var extractFilenameMeta = require('./lib/metadataFromFilename').parseMetadata;
var getReferenceMetadata = require('./lib/metadataReference').getReferenceMetadata;
var util = require('util');

var mp3Extension = '.mp3';
var jsonExtension = '.json';

/*
 [ parallel ]
   - get metadata from mp3
   - get metadata from upload
   - get metadata from reference website

 then mergeObjects metadata objects

 then [ parallel ]
   - write merged data into mp3
   - write merged data to json file
 */

var fileName = '20060604am';

function logObject(data) {
    console.log(util.inspect(data));
    return data;
}

function processFile(fileName) {
    return Promise.all([
            files.readFileStream(fileName + mp3Extension).then(extractMp3Meta),
            extractFilenameMeta(fileName + mp3Extension),
            getReferenceMetadata(fileName)
        ])
        .then(mergeObjects)
        .then(logObject)
        .then(function (data) {
            return Promise.all([
                files.writeFile(data, fileName + jsonExtension),
                writeMp3MetaTags(data, fileName + mp3Extension)
            ]);
        })
        .then(logObject)
        .catch(console.error);
}

console.log('processing: ' + fileName);
processFile(fileName).then(function() {
    console.log('done: '+fileName);
});

