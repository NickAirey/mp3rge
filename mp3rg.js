
var m = require('lib/merge');
var mp3Read = require('lib/metadataMp3Read');
var mp3Write = require('lib/metdataMp3Write');
var upload = require('lib/metadataFromUpload');
var f = require('lib/filesLocal');

var mp3Extension = '.mp3';
var jsonExtension = '.json';

/*
 [ parallel ]
   - get metadata from mp3
   - get metadata from upload

 then merge metadata objects

 then [ parallel ]
   - write merged data into mp3
   - write merged data to json file
 */

var fileName = '123';

Promise.all([
        mp3Read.read(fileName + mp3Extension),
        upload.read(fileName + mp3Extension)
    ])
    .then(m.merge)
    .then(function (metadata) {
        return Promise.all([
            f.writeFile(fileName + jsonExtension, metadata),
            mp3Write.write(fileName + mp3Extension, metadata)
        ]);
    });
