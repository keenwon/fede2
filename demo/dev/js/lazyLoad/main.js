function execute() {
    require.ensure(['./other'], function (require) {
        var other = require('./other');

        var url1 = 'https://github.com',
            url2 = 'https://www.google.com.hk';

        other();
    });
}

document.onclick = execute;