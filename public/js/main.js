
    var main = {
        
        symbols: {},
        context: null,
        imageLoaded: 0,
        
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
                
                document.body.insertBefore(canvas, document.body.childNodes[0]);
                
                main.context = canvas.getContext("2d");
  
        },
        
        
        loadImages: function() {
            for (var index in config.availableSymbols) {
                var key = config.availableSymbols[index];
                this.symbols[key] = {img: new Image()};
                this.symbols[key].img.src = "img/symbol" + key + ".png";
                this.symbols[key].onload = main.checkImageLoad();
            }  
        },
        
        checkImageLoad: function() {
                main.imageLoaded ++;
                if (main.imageLoaded === config.availableSymbols.length) {
                    main.createButton();
                    setTimeout(main.firstDraw, 100);
                }
        },
        
        
        firstDraw: function() {
            for (var i = 1; i <= config.slotCount; i++) {
                for (var j = 1; j <= config.lineCount ; j++) {
                    var x       = (i-1)*config.symbolWidth;
                    var y       = (j-1)*config.symbolHeight;
                    var type = config.availableSymbols[j-1];
                    main.context.drawImage(main.symbols[type].img, 
                                0, 0, 
                                config.symbolWidth, config.symbolHeight, 
                                x, y, 
                                config.symbolWidth, config.symbolHeight
                            );
                    
                }
            }
        },
         
        
        startClick: function() {
            if (!game.isPlay) {
                game.init();
                game.isPlay = true;
                requestAnimationFrame(game.draw);
                setTimeout(game.stop, config.stopDelay);
            }
        },
        
        
        createButton: function() {
                var input = document.createElement("input");
                
                input.setAttribute("type",  "button");
                input.setAttribute("value", "Start");
                input.setAttribute("id", "startBtn");
                
                input.onclick = this.startClick;    
                
                var wrapper = document.getElementById('wrapper'); 
                wrapper.appendChild(input);
        }
        
    }; 