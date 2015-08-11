'use strict';

var path = require('path'),
    fs = require('fs'),

    express = require('express'),
    app = express(),
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mock = require('./mock'),

    devDir = path.join(__dirname, '../dev'),
    mockDir = path.join(__dirname, '../mock'),

    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpack = require("webpack"),
    ReplacePlugin = require('./ReplacePlugin'),
    webpackConfig = require('../webpack.config.js');

// views
var helpers = require('./helpers')('development');
for (var item in helpers) {
    if (helpers.hasOwnProperty(item)) {
        hbs.registerHelper(item, helpers[item]);
    }
}
app.set('views', devDir);
app.set('view engine', 'hbs');

// bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// webpack
var mapFilePath = path.join(mockDir, '_map.js'),
    mapRules;
if (fs.existsSync(mapFilePath)) {
    mapRules = require(mapFilePath);
}

if (!Object.prototype.toString.call(webpackConfig) === '[object Array]') {
    webpackConfig = [webpackConfig];
}

for (var i = 0, j = webpackConfig.length; i < j; i++) {
    webpackConfig[i].context = __dirname;
    webpackConfig[i].plugins = [
        new ReplacePlugin(mapRules)
    ];
}

app.use(webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: '/js/'
}));

// static
app.use(express.static(devDir));

// logger
app.use(morgan('dev'));

// mock
mock(app, mockDir);

app.listen(3000);
console.log('Server running at http://localhost:3000/');
