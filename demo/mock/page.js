module.exports = function (app) {

    // pages
    app.get('/', function (req, res) {
        res.render('normal');
    });
    app.get('/normal', function (req, res) {
        res.render('normal');
    });

    app.get('/splitting1', function (req, res) {
        res.render('splitting1');
    });

    app.get('/splitting2', function (req, res) {
        res.render('splitting2');
    });

    app.get('/lazyLoad', function (req, res) {
        res.render('lazyLoad');
    });

    app.get('/library', function (req, res) {
        res.render('library');
    });

    app.get('/shimming', function (req, res) {
        res.render('shimming');
    });
};
