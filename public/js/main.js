  


    var main = {
        
        symbols: {},
        context: null,

        y: 0,
        
        calcParams : function() {
                game.width = game.slotCount * game.symbolWidth;
                game.height = game.lineCount * game.symbolHeight;
                game.countItemInSlot = game.availableSymbols.length * game.typeCount;  
        },
        
        createCanvas : function() {
                var canvas = document.createElement("canvas");
                


                canvas.setAttribute("width",  game.width);
                canvas.setAttribute("height", game.height);
                canvas.setAttribute("id", "gameField");
                
                document.body.appendChild(canvas); 
                
                this.context = canvas.getContext("2d");
        },
        
        loadImages: function() {
            for (var index in game.availableSymbols) {
                var key = game.availableSymbols[index];
                this.symbols[key] = {img: new Image()};
                this.symbols[key].img.src = "img/symbol" + key + ".png";
            }  
        },
        
        draw : function() {
            main.y += 10;
            if (main.y >= game.height) {
               main.y =0; 
            }
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
           //requestAnimationFrame(main.draw); 
           game.draw();
        },
        
        subscribeToEvents: function() {
            document.getElementById('srartBth').onclick = this.startClick;   
        }
        
    };
    
    (function () {
        

        
        main.calcParams();
        main.loadImages();
        main.createCanvas();
        main.subscribeToEvents();
        
        game.fillField();
        
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