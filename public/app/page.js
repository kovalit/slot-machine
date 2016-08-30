define(["./config", "./game", "./draw"], function (config, game, draw) {
     
     
    return {

        createCanvas : function() {
            
                var canvas = document.createElement("canvas");
                
                canvas.setAttribute("width",  config.width);
                canvas.setAttribute("height", config.height);
                canvas.setAttribute("id", "gameField");
                draw.setContext(canvas);
                
                document.body.insertBefore(canvas, document.body.childNodes[0]);
                this.loadImages();       
  
        },
        
        
        loadImages: function() {
            
            for (var index in config.availableSymbols) {
                var key = config.availableSymbols[index];
                var image = new Image();
                image.src = "img/symbol" + key + ".png";
                image.onload = this.checkImageLoad();
                game.addSymbols(key, image);
            }  
            
        },
        
        checkImageLoad: (function() {
                var imageLoaded = 1;
                
                return function() {
                    imageLoaded++;
                    if (imageLoaded === config.availableSymbols.length) {
                        this.createButton();
                        setTimeout(game.firstDraw, 100);
                    }

                };
        })(),

        startClick: function() {
            
            if (!game.isPlay) {
                game.init();
                game.isPlay = true;
                requestAnimationFrame(game.outputPlayfield.bind(game));
                setTimeout(game.stop.bind(game), config.stopDelay);
            }
            
        },
        
        
        createButton: function() {
            
                var wrapper = document.getElementById('wrapper'); 
                var input = document.createElement("input");
                
                input.setAttribute("type",  "button");
                input.setAttribute("value", "Start");
                input.setAttribute("id", "startBtn");
                
                input.onclick = this.startClick;    
                
                wrapper.appendChild(input);
                
        }
        
    };
});