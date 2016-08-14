    (function () {

            main.calcParams();
            main.createCanvas();
            main.loadImages();
            
            game.initStopedSlots();


            var requestAnimationFrame =  window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                    };

            window.requestAnimationFrame = requestAnimationFrame;

        }());