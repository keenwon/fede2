'use strict';

var fs = require('fs'),
    path = require('path'),
    util = require('util');

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
            mock(app, itemPath);
        } else if (item !== '_map.js') {
            try {
                require(itemPath)(app);
            } catch (e) {
                console.log(util.format('注意：文件"%s"不是变准的mock文件，已跳过', itemPath));
            }
        }
    });
}