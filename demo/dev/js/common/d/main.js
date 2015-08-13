require('./main.css');

module.exports = function () {

    document.onclick = function(){
        var div = document.createElement('div');
        div.className = 'div1';

        document.body.appendChild(div);
    };

    console.log('library d');
};