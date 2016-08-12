
    var main = {
        
        symbols: {},
        context: null,

        y: 0,
        
        
        calcParams : function() {
                game.width              = game.slotCount * game.symbolWidth;
                game.height             = game.lineCount * game.symbolHeight;
                game.countSymbolInSlot  = game.availableSymbols.length * game.typeCount;  
                game.slotHeight         = game.countSymbolInSlot * game.symbolHeight;  
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
           game.init();
          // game.draw();
            requestAnimationFrame(game.calc);
        },
        
        subscribeToEvents: function() {
            document.getElementById('srartBth').onclick = this.startClick;   
        }
        
    };
    
    