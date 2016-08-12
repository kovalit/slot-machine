    (function () {

            main.calcParams();
            main.loadImages();
            main.createCanvas();
            main.subscribeToEvents();
            
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