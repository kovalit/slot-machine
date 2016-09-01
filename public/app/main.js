define(function (require) {
    
    var requestAnimationFrame =  window.requestAnimationFrame ||
                     window.webkitRequestAnimationFrame ||
                     window.mozRequestAnimationFrame ||
                     window.oRequestAnimationFrame ||
                     window.msRequestAnimationFrame ||
                     function (callback) {
                             window.setTimeout(callback, 1000 / 60);
                     };
 
    window.requestAnimationFrame = requestAnimationFrame;
    
    var config = require('./config');
    var game = require('./game');
    var page = require('./page');
    var draw = require('./draw');

    page.createCanvas();

});

