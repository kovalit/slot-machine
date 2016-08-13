
    var main = {
        
        symbols: {},
        context: null,
        
        

        
        
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
         
        
        startClick: function() {
            game.init();
            setTimeout(game.stop, 1000);
            requestAnimationFrame(game.draw);
        },
        
        
        subscribeToEvents: function() {
            document.getElementById('srartBth').onclick = this.startClick;   
        }
        
    };
    
    