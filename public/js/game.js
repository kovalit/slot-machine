    
    var game = {
        
        // Initial params
        symbolWidth: 216,
        symbolHeight: 144,
        
        slotCount : 3,
        lineCount: 3,
        typeCount: 4,
        
        availableSymbols: ['A','B','C','D','E'],
        
        // Calculated params
        countSymbolInSlot: null,
        width: null,
        height: null,
        
        slotHeight: null,
        
        iterator: null,
        
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
        
        
        init: function() {
            
                this.iterator = 0;
                
                this.field = {};
                
                this.fillField();
                
        },
        

        fillField: function() {
            
            var randomSymbolList = {};
            
            for (var i = 1; i <= this.slotCount; i++) {
                
                randomSymbolList[i] = [];
                
                for (var j = 1; j <= this.typeCount; j++) {
                    
                    var randomArr = this.shuffle(this.availableSymbols);
                    randomSymbolList[i] = randomSymbolList[i].concat(randomArr); 
                    
                }
                
            }  
            
            
            for (var i = 1; i <= this.slotCount; i++) {
                
                this.field[i] = {};
                
                var x = this.symbolWidth*(i-1);
                
                for (var j = 1; j <= game.countSymbolInSlot ; j++) {
                    
                    var y = this.symbolHeight*(j-1);
                    
                    if (j > this.lineCount) {
                        y -= this.slotHeight;
                    }
                    this.field[i][j] = {x: x, y: y, type: randomSymbolList[i][j-1]};
                    
                }
                
            }   

            
        },
        
        
        draw: function () {
            
            main.context.clearRect(0, 0, game.width, game.height);
            
            for (var i = 1; i <= this.slotCount; i++) {
                
                for (var j = 1; j <= game.countSymbolInSlot ; j++) {
                    
                    var x = this.field[i][j].x;
                    var y = this.field[i][j].y;
                    var type = this.field[i][j].type;
                    
                    if (y < game.height) {

                        main.context.drawImage(main.symbols[type].img, 
                                0, 0, 
                                game.symbolWidth, game.symbolHeight, 
                                x, y, 
                                game.symbolWidth, game.symbolHeight
                            );
                
                    }
                    
                }
                
            } 
            
        },
        
        
        calc: function () {
            
            game.iterator += 10;
            
            if (game.iterator >= game.slotHeight) {
                game.iterator = 0;
            }
            
            for (var i = 1; i <= game.slotCount; i++) {
                
                for (var j = 1; j <= game.countSymbolInSlot ; j++) {
                    
                    var y = game.field[i][j].y;
                    y += game.iterator;
                    
                    if (y > game.height) {
                        y = -game.slotHeight;
                    }

                    game.field[i][j].y = y;
                }
                
            }
            console.log(game.iterator);
            game.draw();
            requestAnimationFrame(game.calc); 
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