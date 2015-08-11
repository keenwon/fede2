'use strict';

var path = require('path');

function getPath(jsPath) {
    return path.join(__dirname, jsPath);
}

module.exports = [
    {
        entry: {
            // 定义打包的模块
            'index/main': getPath('dev/js/index/main')
        },
        output: {
            path: getPath('dist/js/'),
            filename: '[name].js'
        }
    }
];