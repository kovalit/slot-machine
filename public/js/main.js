
    var main = {
        
        symbols: {},
        context: null,
        
        calcParams : function() {
                game.width              = config.slotCount * config.symbolWidth;
                game.height             = config.lineCount * config.symbolHeight;
                game.countSymbolInSlot  = config.availableSymbols.length * config.typeCount;  
                game.slotHeight         = game.countSymbolInSlot * config.symbolHeight;  
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
            for (var index in config.availableSymbols) {
                var key = config.availableSymbols[index];
                this.symbols[key] = {img: new Image()};
                this.symbols[key].img.src = "img/symbol" + key + ".png";
            }  
        },
         
        
        startClick: function() {
            game.init();
            setTimeout(game.stop, config.stopDelay);
            requestAnimationFrame(game.draw);
        },
        
        
        subscribeToEvents: function() {
            document.getElementById('startBtn').onclick = this.startClick;   
        }
        
    };
    
    