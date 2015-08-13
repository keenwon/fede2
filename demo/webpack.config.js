'use strict';

var path = require('path');

function getPath(jsPath) {
    return path.join(__dirname, jsPath);
}

module.exports = [
    // normal
    {
        entry: {
            'normal/main': getPath('dev/js/normal/main')
        },
        output: {
            path: getPath('dist/js'),
            filename: '[name].js'
        }
    },

    // code splitting
    {
        entry: {
            'common/c': getPath('dev/js/common/c')
        },
        output: {
            path: getPath('dist/js'),
            filename: '[name].js',
            library: 'c',
            libraryTarget: 'umd'
        }
    },
    {
        entry: {
            'splitting1/main': getPath('dev/js/splitting1/main'),
            'splitting2/main': getPath('dev/js/splitting2/main')
        },
        output: {
            path: getPath('dist/js'),
            filename: '[name].js'
        },
        externals: {
            'c': true
        }
    },

    // lazy load
    {
        entry: {
            'lazyLoad/main': getPath('dev/js/lazyLoad/main')
        },
        output: {
            path: getPath('dist/js'),
            publicPath: '/js/',
            filename: '[name].js',
            chunkFilename: 'lazyLoad/[chunkhash].js'
        }
    },

    // library
    {
        entry: {
            'library/main': getPath('dev/js/library/main')
        },
        output: {
            path: getPath('dist/js'),
            filename: '[name].js'
        },
        module: {
            loaders: [
                {test: /\.css$/, loader: 'style!css'}
            ]
        }
    },

    // shim
    {
        entry: {
            'shimming/main': getPath('dev/js/shimming/main')
        },
        output: {
            path: getPath('dist/js'),
            filename: '[name].js'
        }
    }
];