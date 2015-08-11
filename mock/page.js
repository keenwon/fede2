module.exports = function (app) {

    // pages
    app.get('/', function (req, res) {
        res.render('index');
    });

};
