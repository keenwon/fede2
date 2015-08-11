'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = mock;

function mock(app, dir) {
    if (!fs.existsSync(dir)) {
        return;
    }

    var dirList = fs.readdirSync(dir),
        itemPath;

    dirList.forEach(function (item) {
        itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            mock(itemPath);
        } else if (item !== '_map.js') {
            require(itemPath)(app);
        }
    });
}