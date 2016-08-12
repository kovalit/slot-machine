  


    var main = {
        
        symbols: {},
        context: null,
        
        createCanvas : function() {
                var canvas = document.createElement("canvas");
                
                var width = game.slotCount * game.symbolWidth;
                var height = game.fieldCount * game.symbolHeight;
                
                canvas.setAttribute("width", width);
                canvas.setAttribute("height", height);
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
           this.context.drawImage(this.symbols.D.img, 
                    0, 0, 
                    game.symbolWidth, game.symbolHeight, 
                    0, 0, 
                    game.symbolWidth, game.symbolHeight
                ); 
        },
        
        startClick: function() {
   
            main.draw();
            
        },
        
        subscribeToEvents: function() {
            document.getElementById('srartBth').onclick = this.startClick;   
        }
        
    };
    
    (function () {
        main.load();
        main.createCanvas();
        main.subscribeToEvents();
        
        
    }());