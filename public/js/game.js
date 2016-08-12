    
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
        
        // main objects
        slots: {},
        
        

        fillSlots: function() {
            
            for (var i = 1; i <= this.slotCount; i++) {
                
                this.slots[i] = [];
                
                for (var j = 1; j <= this.typeCount; j++) {
                    
                    var randomArr = this.shuffle(this.availableSymbols);
                    this.slots[i] = this.slots[i].concat(randomArr); 
                    
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