'use strict';

var RawSource = require("webpack-core/lib/RawSource");

function ReplacePlugin(mapRules) {
    this.mapRules = mapRules || {};
}

ReplacePlugin.prototype.apply = function(compiler) {
    var mapRules = this.mapRules,
        reg,
        source;

    compiler.plugin("compilation", function(compilation) {
        compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
            var files = [];

            chunks.forEach(function(chunk) {
                chunk.files.forEach(function(file) {
                    files.push(file);
                });
            });

            compilation.additionalChunkAssets.forEach(function(file) {
                files.push(file);
            });

            files.forEach(function(file) {
                source = compilation.assets[file].source();
                for (var rule in mapRules) {
                    reg = new RegExp(rule, 'gm');
                    source = source.replace(reg, mapRules[rule]);
                }
                compilation.assets[file] = new RawSource(source);
            });

            callback();
        })
    });
};

module.exports = ReplacePlugin;
