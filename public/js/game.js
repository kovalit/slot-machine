    
    var game = {
        
        // settings
        symbolWidth: 216,
        symbolHeight: 144,
        
        slotCount : 3,
        lineCount: 3,
        typeCount: 4,
        
        availableSymbols: ['A','B','C','D','E'],
        
        // calc params
        countItemInSlot: null,
        width: null,
        height: null,
        
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
                
                for (var j = 1; j <= game.countItemInSlot ; j++) {
                    
                    var y = this.symbolHeight*(j-1);
                    
                    this.field[i][j] = {x: x, y: y, type: randomSymbolList[i][j]};
                    
                }
                
            }         
            
        },
        
        
        draw: function () {
            
            main.context.clearRect(0, 0, game.width, game.height);
            
            for (var i = 1; i <= this.slotCount; i++) {
                
                for (var j = 1; j <= game.countItemInSlot ; j++) {
                    
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