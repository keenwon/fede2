'use strict';

var path = require('path'),
    fs = require('fs'),
    sass = require('node-sass'),
    postcss = require('postcss'),
    autoprefixer = require('autoprefixer');

module.exports = intercept;

function intercept(staticDir) {
    return function (req, res, next) {
        var pathname, scssFilePath;

        pathname = req._parsedUrl.pathname;
        if (!/\.css$/.test(pathname)) {
            next();
            return;
        }

        scssFilePath = path.join(staticDir, pathname.replace(/\.css/, '.scss'));
        if (fs.existsSync(scssFilePath)) {
            cssRender(scssFilePath, function (result) {
                res.set('Content-Type', 'text/javascript; charset=UTF-8');
                res.end(result.css);
            });
        } else {
            next();
        }
    };
}

function cssRender(scssFilePath, callback) {
    var css = sass.renderSync({
        file: scssFilePath
    }).css.toString();

    postcss([autoprefixer])
        .process(css)
        .then(callback)
        .catch(function (error) {
            console.error(error);
        });
}