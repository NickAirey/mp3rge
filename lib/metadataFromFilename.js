
exports.parseMetadata = function (fileName) {

    var matches = fileName.match(/^(\d{4})(\d{2})(\d{2})(\w+)/);

    var result = { source: 'filename', filename: fileName};

    if (matches) {
        var year = parseInt(matches[1], 10);
        var month = parseInt(matches[2], 10) - 1;
        var day = parseInt(matches[3], 10);

        var hour;
        var lang;

        switch (matches[4]) {
        case "am":
            hour = 9;
            lang = "en";
            break;
        case "man":
            hour = 13;
            lang = "cn";
            break;
        case "pm":
            hour = 18;
            lang = "en";
            break;
        }

        var d = new Date(year, month, day, hour);

        Object.assign(result, {date: d, lang: lang});
    }
    console.log('filename metadata is available for: ' + fileName);
    return result;
};