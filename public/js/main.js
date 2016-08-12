  


    var main = {
        
        symbols: {},
        context: null,

        y: 0,
        
        createCanvas : function() {
                var canvas = document.createElement("canvas");
                
                game.width = game.slotCount * game.symbolWidth;
                game.height = game.fieldCount * game.symbolHeight;

                canvas.setAttribute("width",  game.width);
                canvas.setAttribute("height", game.height);
                canvas.setAttribute("id", "gameField");
                
                document.body.appendChild(canvas); 
                
                this.context = canvas.getContext("2d");
        },
        
        load: function() {
            for (var index in game.availableSymbols) {
                var key = game.availableSymbols[index];
                this.symbols[key] = {img: new Image()};
                this.symbols[key].img.src = "img/symbol" + key + ".png";
            }  
        },
        
        draw : function() {
            main.y += 10;
            main.context.clearRect(0, 0, game.width, game.height);
           main.context.drawImage(main.symbols.D.img, 
                    0, 0, 
                    game.symbolWidth, game.symbolHeight, 
                    0, main.y, 
                    game.symbolWidth, game.symbolHeight
                ); 
            requestAnimationFrame(main.draw);
        },
        
        startClick: function() {
           requestAnimationFrame(main.draw); 
        },
        
        subscribeToEvents: function() {
            document.getElementById('srartBth').onclick = this.startClick;   
        }
        
    };
    
    (function () {
        main.load();
        main.createCanvas();
        main.subscribeToEvents();
        
        var requestAnimationFrame =  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                        window.setTimeout(callback, 10);
                };
        
        window.requestAnimationFrame = requestAnimationFrame;
        
        
    }());