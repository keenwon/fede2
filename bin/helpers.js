'use strict';

module.exports = function (env) {
    env = env || 'production';

    return {
        'development': function (options) {
            return env === 'development' ? options.fn(this) : options.inverse(this);
        },
        'production': function (options) {
            return env === 'production' ? options.fn(this) : options.inverse(this);
        }
    };
};