define(["./config", "./draw"], function (config, draw) {
    
    /**
    * Игровой автомат
    * @private
    */
    var _machine = {
        
        /**
        * Изображения лотов
        * @type {Object}
        */
        symbols        : {},
        
        /**
        * Игровое поле
        * @type {Object}
        */
        playfield      : {},
        
        /**
        * Призкани остановки
        * @type {Object}
        */
        stopFlags    : {},
        
        /**
        * Массив центральных лотов
        * @type {Array}
        */
        centerSymbols  : [],
        
        /**
        * Сбрасывает флаги остановки для каждого слота
        * @this   {_machine}
        */
        resetStopFlags: function() {
            for (var i = 1; i <= config.slotCount; i++) {
                this.stopFlags[i] = {
                    isFinishTime: false,
                    isFinishCalc: false, 
                    isFinishDraw: false
                };
            }  
        },
        
        /**
        * Заполняет игровое поле случайным образом
        *
        * @this   {_machine}
        */
        setPlayfield: function() {
            var randomSymbolList = {};
            
            var lotsKey = Object.keys(config.lots);
            
            for (var i = 1; i <= config.slotCount; i++) {
                
                randomSymbolList[i] = [];
                
                for (var j = 1; j <= config.duplicateCount; j++) {    
                    var randomArr = this.shuffle(lotsKey);
                    randomSymbolList[i] = randomSymbolList[i].concat(randomArr); 
                } 
            }  

            for (var i = 1; i <= config.slotCount; i++) {
                
                this.playfield[i] = {};
                
                var x = config.symbolWidth * (i - 1);
                
                for (var j = 1; j <= config.itemsInSlotAmount ; j++) {
                    
                    var y = config.symbolHeight * (j - 1);
                    
                    if (j > config.lineCount) {
                        y -= config.slotHeight;
                    }
                    this.playfield[i][j] = {
                        x: x, 
                        y: y, 
                        type: randomSymbolList[i][j - 1]
                    };
                }
            }   
        },
        
        /**
        * Отображает игровое поле
        *
        * @this   {_machine}
        */
        putPlayfield: function () {
            
            this.calcPlayfield();
            
            var clearSize = 0;
            
            for (var i = 1; i< config.slotCount; i++) {
                if (this.stopFlags[i].isFinishDraw) {
                    clearSize += config.symbolWidth;
                }
            }

            draw.clear(config.width - clearSize, config.height, clearSize, 0);
             
            for (var i = 1; i <= config.slotCount; i++) {
                
                if (this.stopFlags[i].isFinishDraw) {
                    continue;
                }
                
                for (var j = 1; j <= config.itemsInSlotAmount ; j++) {

                    var x       = this.playfield[i][j].x;
                    var y       = this.playfield[i][j].y;
                    var type    = this.playfield[i][j].type;
                    var isDraw  = (y + config.symbolHeight) > 0;
                    if (isDraw) {
                        draw.image(this.symbols[type].img, x, y, config.symbolWidth, config.symbolHeight);
                    }
                    
                }
                
                if (this.stopFlags[i].isFinishCalc) {
                    this.stopFlags[i].isFinishDraw = true;
                }
    
            };
            
            var isLastStop = this.stopFlags[config.slotCount].isFinishDraw;

            if(!isLastStop) {
                requestAnimationFrame(this.putPlayfield.bind(this));
            }
            else {
                gameplay.isPlay = false;
                var isWin = this.checkWin();
                if (isWin) {
                    requestAnimationFrame(this.winAnimation.bind(this, 0));
                }
            }
    
        },
        
        /**
        * Производит расчет игрового поля
        *
        * @this   {_machine}
        */
        calcPlayfield : function () {
        
            for (var i = 1; i <= config.slotCount; i++) {
                   
                var offset = config.speed;
                
                if (this.stopFlags[i].isFinishCalc) {
                    continue;
                }

                if (this.stopFlags[i].isFinishTime) {
                      var banance = this.calcBalance(i);
                      offset = banance.offset;
                      
                      this.stopFlags[i].isFinishCalc = banance.isLastCalc;
                }

                for (var j = 1; j <= config.itemsInSlotAmount ; j++) {

                    var y = this.playfield[i][j].y;

                    y += offset;
                    
                    if (y > config.height) {
                        y = -config.slotHeight + y;
                    }
                                       
                    this.playfield[i][j].y = y;
              
                }
            } 
           
        },
        
        /**
        * Вычисляет остаточное смещение после события stop
        *
        * @param    {number} slot - номер слота
        * @return   {Object} 
        */       
        calcBalance: function (slot) {
            
            var result = {
                offset: config.speed, 
                isLastCalc: false
            };
            
            for (var j = 1; j <= config.itemsInSlotAmount ; j++) {
                    var y = this.playfield[slot][j].y;
                    if (y <= 0 && Math.abs(y) <= config.speed) { 
                        result.offset = Math.abs(y);
                        result.isLastCalc = true;
                        break;
                    }
            }
         
            return result;
            
        },
        
        /**
        * Проверяет выйгрыш
        * 
        * @this   {_machine}
        * @return   {Boolean} 
        */  
        checkWin: function() {
            
            var isWin       =  true;
            var currentScore = 0;
           
            for (var i = 1; i <= config.slotCount; i++) {

               for (var j = 1; j <= config.itemsInSlotAmount ; j++) {
                   
                   if (this.playfield[i][j].y === config.symbolHeight * (config.centerLine - 1)) {
                       this.centerSymbols.push(this.playfield[i][j].type);
                   }

               }
            }
            
            var symbol = this.centerSymbols[0];
            for (var key in this.centerSymbols) {
               if (symbol !== this.centerSymbols[key]) {
                   isWin = false; 
                   break;
               }
               symbol = this.centerSymbols[key];
           }
           
            if (isWin) {
                currentScore = config.lots[symbol].rate;
                gameplay.addScore(currentScore);
            }
           
            return isWin;

        },
        
        /**
        * Проигрывает выйгрышную анимацию
        *
        * @return   {Boolean} 
        */ 
        winAnimation: function(winIterator) {

                winIterator++;
                
                var end = (winIterator > config.winAnimationCount);

                if (!end) {
                    draw.clear(config.width, config.symbolHeight, 0, (config.centerLine-1) * config.symbolHeight)
                }

                for (var i = 1; i <= config.slotCount; i++) {

                    var x       = config.symbolWidth * (i-1);
                    var y       = config.symbolHeight * (config.centerLine -1);
                    var dx      = (winIterator - 1) * config.symbolWidth;

                    var type    = this.centerSymbols[i-1];

                    draw.image(this.symbols[type].img, x, y, config.symbolWidth, config.symbolHeight, dx);
                }

                if (!end) {
                    setTimeout(function() {
                        requestAnimationFrame(this.winAnimation.bind(this, winIterator));
                    }.bind(this), config.winAnimationDelay);
                }
        
        },
        
        /**
        * Перетасовывает массив случайным образом
        * 
        * @param    {array} array - входной массив
        * @return   {array} 
        */ 
        shuffle: function (array) {
            
            for (var i = array.length - 1; i >= 0; i--) {

                 var randomIndex = Math.floor(Math.random()*(i+1)); 
                 var itemAtIndex = array[randomIndex]; 

                 array[randomIndex] = array[i]; 
                 array[i] = itemAtIndex;
             }
             return array;

        }
        
    };

    /**
    * События игры
    * @public
    */
    var gameplay = {
        
        /**
        * Признак начала игры
        */ 
        isPlay  : false,
        
        /**
        * Счет игры
        */ 
        score   : 0,

        /**
        * Добавляет лот в игровой автомат
        * 
        * @param    {number} type - номер лота в списке
        * @param    {Image} image - изображение лота
        */ 
        addSymbols: function(type, image) {

            if (_machine.symbols[type] === undefined) {
                _machine.symbols[type] = {
                    img: image
                };  
            }
        },

        /**
        * Запускает игровой автомат
        * 
        * @this   {_gameplay}
        */ 
        run: function() {

                _machine.playfield      = {};
                _machine.centerSymbols  = [];
                _machine.setPlayfield();
                _machine.resetStopFlags();
                
                this.isPlay = true;
                
                draw.clear(config.width, config.height);
                
                requestAnimationFrame(_machine.putPlayfield.bind(_machine));
                
        },
        
        /**
        * Инициализирует остановку игрового автомата
        * 
        * @this   {_gameplay}
        */ 
        stop: function() {
            for (var i = 1; i <= config.slotCount; i++) { 
                
                var isStop = _machine.stopFlags[i].isFinishTime;
                if (!isStop) {
                    _machine.stopFlags[i].isFinishTime = true;
                    break;
                }
            }
            
            var isLastStop = _machine.stopFlags[config.slotCount].isFinishTime;

            if(!isLastStop) {
                setTimeout(this.stop.bind(this), config.stopSlotDelay);
            }
        },
        
        /**
        * Добавляет счет
        * 
        * @param  {value} number - входной массив
        * @this   {_gameplay}
        */ 
        addScore: function(value) {
            this.score += value;
            console.log(this.score);
        },

        /**
        * Отображает исходное состояние
        */ 
        drawInitialState: function() {
            for (var i = 1; i <= config.slotCount; i++) {
                var counter = 0;
                for (var j = 1; j <= config.lineCount ; j++) {
                    counter ++;
                    var x       = (i - 1) * config.symbolWidth;
                    var y       = (j - 1) * config.symbolHeight;
                    var type    = counter;
                    if (counter >= config.lotsCount) {
                        counter = 0;
                    }

                    draw.image(_machine.symbols[type].img, x, y, config.symbolWidth, config.symbolHeight);   
                }
            }  
        }
        
    };
    
    return gameplay;
    
});