    
    var game = {
        
        // settings
        symbolWidth: 216,
        symbolHeight: 144,
        
        slotCount : 3,
        fieldCount: 3,
        
        typeCount: 4,
        availableSymbols: ['A','B','C','D','E'],
        
        width: null,
        height: null,
        
        /* field
         * 
         * {
         * "1": 
         *      {
         *          "1": {"x": 0, "y": 0, "type": "A",
         *          "2": {"x": 0, "y": 144, "type": "B"
         *          ...
         *      }
         * "2": 
         *      {
         *          "1": {"x": 266, "y": 0, "type": "C",
         *          "2": {"x": 266, "y": 144, "type": "D"
         *          ...
         *      }
         *  ...  
         * }
         * 
         */
        field: {},
        

        fillField: function() {
            
            var randomSymbolList = {};
            var countItemInSlot = this.availableSymbols.length * this.typeCount;
            
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
                
                for (var j = 1; j <= countItemInSlot; j++) {
                    
                    var y = this.symbolHeight*(j-1);
                    
                    this.field[i][j] = {x: x, y: y, type: randomSymbolList[i][j]};
                    
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