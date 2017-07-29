
var fS3 = require('./lib/filesS3');
var fL = require('./lib/filesLocal');
var util = require('util');

function logObject(data) {
    console.log(util.inspect(data));
    return data;
}


fS3.listFiles()
    .then(logObject)
    .then(function (data) {
        return Promise.all(
            data.filter(function (item) {
                return item.startsWith('2007') && item.endsWith('json');
            }).map(function (item) {
                return fS3.readFile(item);
            })
        );
    }).then(function (data) {
        return fL.writeFile(data, 'data.json');
    }).then(logObject);
