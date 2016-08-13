    
    var game = {

        countSymbolInSlot   : null,
        width               : null,
        height              : null,
        
        slotHeight          : null,
        
        iterator            : 0,
        winIterator         : 0,
        isPlay              : false,
        
        /* field
         * 
         * {
         * "1": 
         *      {
         *          "1": {"x": 0, "y": 0, "type": "A"},
         *          "2": {"x": 0, "y": 144, "type": "B"},
         *          ...
         *      }
         * "2": 
         *      {
         *          "1": {"x": 266, "y": 0, "type": "C"},
         *          "2": {"x": 266, "y": 144, "type": "D"},
         *          ...
         *      }
         *  ...  
         * }
         * 
         */
        field: {},
        
        stopedSlots: {},
        
        centerSymbols: null,
        
        
        init: function() {
            
                this.iterator = 0;
                this.winIterator = 0;
                
                this.field = {};
                this.centerSymbols = [];
                
                this.fillField();
                
                this.initStopedSlots();
                
                main.context.clearRect(0, 0, game.width, game.height);
                
        },
        
        
        initStopedSlots: function() {
            for (var i = 1; i <= config.slotCount; i++) {
                this.stopedSlots[i] = {isFinishTime: false, isFinishCalc: false};
            }
        },
        
        
        stop: function() {
            for (var i = 1; i <= config.slotCount; i++) { 
                
                var isStop = game.stopedSlots[i].isFinishTime;
                if (!isStop) {
                    game.stopedSlots[i].isFinishTime = true;
                    break;
                }
            }
            
            var isLastStop = game.stopedSlots[config.slotCount].isFinishTime;

            if(!isLastStop) {
                setTimeout(game.stop, config.stopSlotDelay);
            }
        },
        
        
        fillField: function() {
            
            var randomSymbolList = {};
            
            for (var i = 1; i <= config.slotCount; i++) {
                
                randomSymbolList[i] = [];
                
                for (var j = 1; j <= config.typeCount; j++) {
                    
                    var randomArr = this.shuffle(config.availableSymbols);
                    randomSymbolList[i] = randomSymbolList[i].concat(randomArr); 
                    
                }
                
            }  
            
            
            for (var i = 1; i <= config.slotCount; i++) {
                
                this.field[i] = {};
                
                var x = config.symbolWidth * (i - 1);
                
                for (var j = 1; j <= game.countSymbolInSlot ; j++) {
                    
                    var y = config.symbolHeight * (j - 1);
                    
                    if (j > config.lineCount) {
                        y -= this.slotHeight;
                    }
                    this.field[i][j] = {x: x, y: y, type: randomSymbolList[i][j-1]};
                    
                }
                
            }   

            
        },
        
        
        draw: function () {
            
            game.calc();
            
            for (var i = 1; i <= config.slotCount; i++) {
                
                if (game.stopedSlots[i].isFinishCalc) {
                    continue;
                }
                
                for (var j = 1; j <= game.countSymbolInSlot ; j++) {

                    var x       = game.field[i][j].x;
                    var y       = game.field[i][j].y;
                    var type    = game.field[i][j].type;
                    
                    if (y < game.height) {

                        main.context.drawImage(main.symbols[type].img, 
                                0, 0, 
                                config.symbolWidth, config.symbolHeight, 
                                x, y, 
                                config.symbolWidth, config.symbolHeight
                            );
                
                    }
                    
                }
                
                if (game.stopedSlots[i].isFinishTime && (game.iterator % config.symbolHeight) === 0) {
                    game.stopedSlots[i].isFinishCalc = true;
                    continue;
                }
    
            };
            
            var isLastStop = game.stopedSlots[config.slotCount].isFinishCalc;

            if(!isLastStop) {
                requestAnimationFrame(game.draw);
            }
            else {
                game.isPlay = false;
                var isWin = game.checkWin();
                if (isWin) {
                    requestAnimationFrame(game.winAnimation);
                }
            }
    
        },
        
        
        calc: function () {
            
            game.iterator += config.speed;
            
            if (game.iterator >= game.slotHeight) {
                game.iterator = 0;
            }
            
            for (var i = 1; i <= config.slotCount; i++) {
                if (game.stopedSlots[i].isFinishCalc) {
                    continue;
                }

                for (var j = 1; j <= game.countSymbolInSlot ; j++) {
                    
                    var y = game.field[i][j].y;

                    y += config.speed;
                    
                    if (y > game.height) {
                        y = -game.slotHeight + y;
                    }

                    game.field[i][j].y = y;
                }
   
            }
        },
        
        
        checkWin: function() {
            
          var isWin = true;
           
           for (var i = 1; i <= config.slotCount; i++) {

               for (var j = 1; j <= game.countSymbolInSlot ; j++) {
                   
                   if (game.field[i][j].y === config.symbolHeight * (config.centerLine - 1)) {
                       game.centerSymbols.push(game.field[i][j].type);
                   }

               }
            }
            
            var symbol = game.centerSymbols[0];
            for (var key in game.centerSymbols) {
               if (symbol !== game.centerSymbols[key]) {
                   isWin = false; 
                   break;
               }
               symbol = game.centerSymbols[key];
           }
           return isWin;
        },
        
        
        winAnimation: function() {
            game.winIterator +=1;
            
            for (var i = 1; i <= config.slotCount; i++) {
                
                var x = config.symbolWidth * (i-1);
                var y = config.symbolHeight * (config.centerLine -1);
                var dx = (game.winIterator - 1) * config.symbolWidth;
                
                var type    = game.centerSymbols[i-1];
                
                main.context.drawImage(main.symbols[type].img, 
                        dx, 0, 
                        config.symbolWidth, config.symbolHeight, 
                        x, y, 
                        config.symbolWidth, config.symbolHeight
                    );
            }
            
            if (game.winIterator <= config.winAnimationCount) {
                     window.setTimeout(
                             function() {
                                requestAnimationFrame(game.winAnimation);   
                             }, 
                        config.winAnimationDelay);
            }
        },
        
        
        shuffle: function (array) {
            
            var rand;
            var index = -1;
            var length = array.length;
            var result = Array(length);
            while (++index < length) {
                rand = Math.floor(Math.random() * (index + 1));
                result[index] = result[rand];
                result[rand] = array[index];
            }
            
            return result;

        }
        
    };