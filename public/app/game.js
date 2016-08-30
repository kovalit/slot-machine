define(["./config", "./draw"], function (config, draw) {
    
    var _symbols        = {};
    var _playfield      = {};
    var _stopedSlots    = {};
    var _centerSymbols  = [];

            
    return {
        
        isPlay: false,

        addSymbols: function(type, image) {
            if (_symbols[type] === undefined) {
                _symbols[type] = {
                    img: image
                };  
            }
        },

        init: function() {

                _playfield      = {};
                _centerSymbols  = [];
                
                this.isPlay     = false;
                
                this.fillPlayfield();
                
                this.initStopedSlots();
                
                draw.clear(config.width, config.height);
                
        },
        
        
        firstDraw: function() {
            
            for (var i = 1; i <= config.slotCount; i++) {
                for (var j = 1; j <= config.lineCount ; j++) {
                    var x       = (i-1) * config.symbolWidth;
                    var y       = (j-1) * config.symbolHeight;
                    var type    = config.availableSymbols[j-1];
                    draw.image(_symbols[type].img, x, y, config.symbolWidth, config.symbolHeight);   
                }
            }
            
        },
        
        
        initStopedSlots: function() {
            
            for (var i = 1; i <= config.slotCount; i++) {
                _stopedSlots[i] = {
                    isFinishTime: false,
                    isFinishCalc: false, 
                    isFinishDraw: false
                };
            }  
        },
        
        
        stop: function() {
            for (var i = 1; i <= config.slotCount; i++) { 
                
                var isStop = _stopedSlots[i].isFinishTime;
                if (!isStop) {
                    _stopedSlots[i].isFinishTime = true;
                    break;
                }
            }
            
            var isLastStop = _stopedSlots[config.slotCount].isFinishTime;

            if(!isLastStop) {
                setTimeout(this.stop.bind(this), config.stopSlotDelay);
            }
            
        },
        
        
        fillPlayfield: function() {
            
            var randomSymbolList = {};
            
            for (var i = 1; i <= config.slotCount; i++) {
                
                randomSymbolList[i] = [];
                
                for (var j = 1; j <= config.typeCount; j++) {
                    
                    var randomArr = this.shuffle(config.availableSymbols);
                    randomSymbolList[i] = randomSymbolList[i].concat(randomArr); 
                    
                }
                
            }  
            
            for (var i = 1; i <= config.slotCount; i++) {
                
                _playfield[i] = {};
                
                var x = config.symbolWidth * (i - 1);
                
                for (var j = 1; j <= config.countSymbolInSlot ; j++) {
                    
                    var y = config.symbolHeight * (j - 1);
                    
                    if (j > config.lineCount) {
                        y -= config.slotHeight;
                    }
                    _playfield[i][j] = {
                        x: x, 
                        y: y, 
                        type: randomSymbolList[i][j - 1]
                    };
                    
                }
                
            }   
  
        },
        
        
        outputPlayfield: function () {
            
            this.calcPlayfield();
            
            var clearSize = 0;
            
            for (var i = 1; i< config.slotCount; i++) {
                if (_stopedSlots[i].isFinishDraw) {
                    clearSize += config.symbolWidth;
                }
            }

            draw.clear(config.width - clearSize, config.height, clearSize, 0);
             
            for (var i = 1; i <= config.slotCount; i++) {
                
                if (_stopedSlots[i].isFinishDraw) {
                    continue;
                }
                
                for (var j = 1; j <= config.countSymbolInSlot ; j++) {

                    var x       = _playfield[i][j].x;
                    var y       = _playfield[i][j].y;
                    var type    = _playfield[i][j].type;
                    var isDraw  = (y + config.symbolHeight) > 0;
                    
                    if (isDraw) {
                        draw.image(_symbols[type].img, x, y, config.symbolWidth, config.symbolHeight);
                    }
                    
                }
                
                if (_stopedSlots[i].isFinishCalc) {
                    _stopedSlots[i].isFinishDraw = true;
                }

    
            };
            
            var isLastStop = _stopedSlots[config.slotCount].isFinishDraw;

            if(!isLastStop) {
                requestAnimationFrame(this.outputPlayfield.bind(this));
            }
            else {
                this.isPlay = false;
                var isWin = this.checkWin();
                if (isWin) {
                    requestAnimationFrame(this.winAnimation.bind(this));
                }
            }
    
        },
        
        calcPlayfield : function () {
        
            for (var i = 1; i <= config.slotCount; i++) {
                   
                var offset = config.speed;
                
                if (_stopedSlots[i].isFinishCalc) {
                    continue;
                }

                if (_stopedSlots[i].isFinishTime) {
                      var banance = this.calcBalance(i);
                      offset = banance.offset;
                      
                      _stopedSlots[i].isFinishCalc = banance.isLastCalc;
                }

                for (var j = 1; j <= config.countSymbolInSlot ; j++) {

                    var y = _playfield[i][j].y;

                    y += offset;
                    
                    if (y > config.height) {
                        y = -config.slotHeight + y;
                    }
                                       
                    _playfield[i][j].y = y;
              
                }
            }
            
           
        },
        
                
        calcBalance: function (slot) {
            
            var result = {
                offset: config.speed, 
                isLastCalc: false
            };
            
            for (var j = 1; j <= config.countSymbolInSlot ; j++) {
                    var y = _playfield[slot][j].y;
                    if (y <= 0 && Math.abs(y) <= config.speed) {
                        result.offset = Math.abs(y);
                        result.isLastCalc = true;
                        break;
                    }

            }
            
            return result;
            
        },
        
        
        checkWin: function() {
            
            var isWin = true;
           
            for (var i = 1; i <= config.slotCount; i++) {

               for (var j = 1; j <= config.countSymbolInSlot ; j++) {
                   
                   if (_playfield[i][j].y === config.symbolHeight * (config.centerLine - 1)) {
                       _centerSymbols.push(_playfield[i][j].type);
                   }

               }
            }
            
            var symbol = _centerSymbols[0];
            for (var key in _centerSymbols) {
               if (symbol !== _centerSymbols[key]) {
                   isWin = false; 
                   break;
               }
               symbol = _centerSymbols[key];
           }
           return isWin;

        },
        
        
        winAnimation: function() {
            
            this.winIterator += 1;
            
            var end = (this.winIterator > config.winAnimationCount);
            
            if (!end) {
              //  main.context.clearRect(0, (config.centerLine-1) * config.symbolHeight, this.width, config.symbolHeight);
            }
            
            for (var i = 1; i <= config.slotCount; i++) {
                
                var x        = config.symbolWidth * (i-1);
                var y       = config.symbolHeight * (config.centerLine -1);
                var dx      = (this.winIterator - 1) * config.symbolWidth;
                
                var type    = _centerSymbols[i-1];
                
//                main.context.drawImage(main.symbols[type].img, 
//                        dx, 0, 
//                        config.symbolWidth, config.symbolHeight, 
//                        x, y, 
//                        config.symbolWidth, config.symbolHeight
//                    );
            }
            
            if (!end) {
                    setTimeout(
                            function() {
                                requestAnimationFrame(this.winAnimation);   
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
});