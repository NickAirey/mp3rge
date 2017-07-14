
var mergeObjects = require('./lib/merge').merge;
var extractMp3Meta = require('./lib/metadataMp3Read').parseMetadata;
var writeMp3MetaTags = require('./lib/metadataMp3Write').write;
var f = require('./lib/filesLocal');
var extractFilenameMeta = require('./lib/metadataFromFilename').parseMetadata;
var util = require('util');

var mp3Extension = '.mp3';
var jsonExtension = '.json';

/*
 [ parallel ]
   - get metadata from mp3
   - get metadata from upload

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

var readStream = f.readFileStream(fileName + mp3Extension);

Promise.all([readStream.then(extractMp3Meta), extractFilenameMeta(fileName + mp3Extension)])
    .then(logObject)
    .then(mergeObjects)
    .then(logObject)
    .then(function (data) {
        return Promise.all([ f.writeFile(data, fileName + jsonExtension), writeMp3MetaTags(data, fileName + mp3Extension) ]);
    })
    .then(logObject)
    .catch(console.error);
