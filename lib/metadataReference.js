
var unirest = require('unirest');

exports.getReferenceMetadata = function (fileName) {
    return new Promise(function (resolve) {
        unirest.get('http://narweebaptist.org.au/?rest_route=/nbc/v1/sermon/' + fileName)
            .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
            .end(function (response) {

                var result = { source: 'reference' };

                if (response.ok) {
                    Object.assign(result, {
                        referenceTitle: response.body.title.rendered.replace(/&#\d+; /g, ''),
                        excerpt: response.body.excerpt.rendered.replace(/audio for download: /i, '').replace(/<\/?p>/g, '').replace('\n', '').replace(/&#\d+; /g, ''),
                        series: response.body.series[0],
                        biblebook: response.body.biblebook[0],
                        speaker: response.body.speaker[0]
                    });

                } else {
                    // for now we'll tolerate missing data
                    console.error(JSON.stringify(response));
                }

                console.log('reference metadata is available for: ' + fileName);
                resolve(result);
            });
    });
};