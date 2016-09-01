define(function () {
    
    var _fixedParams = {
        
            lots    : {
                1 : {
                    'src'   : 'img/lots/seven.png',
                    'rate'  : 500,
                    'type'  : 'seven'
                },
                2 : {
                    'src'   : 'img/lots/cherry.png',
                    'rate'  : 400,
                    'type'  : 'cherry'
                },
                3 : {
                    'src'   : 'img/lots/watermelon.png',
                    'rate'  : 300,
                    'type'  : 'watermelon'
                },
                4 : {
                    'src'   : 'img/lots/plum.png',
                    'rate'  : 200,
                    'type'  : 'plum'
                },
                5 : {
                    'src'   : 'img/lots/lemon.png',
                    'rate'  : 100,
                    'type'  : 'lemon'
                }
                
            },
            
            symbolWidth         : 216,  // px
            
            symbolHeight        : 144,  // px

            slotCount           : 3,    // column count
            lineCount           : 3,    // row count

            centerLine          : 2,    // win line

            speed               : 12,   // offset per iteration, px

            winAnimationCount   : 5,    // win keyframes count

            stopGameDelay       : 1000, // ms
            stopSlotDelay       : 1000, // ms  

            winAnimationDelay   : 200   // ms
    };
    
    var _calcParams = {
            lotsCount           : null,      
            width               : null,
            height              : null,           
            itemsInSlotAmount   : null,  
            slotHeight          : null,
            duplicateCount      : null
    };
    
    
    _calcParams.lotsCount           = Object.keys(_fixedParams.lots).length; 
    _calcParams.duplicateCount      = parseInt(_fixedParams.lineCount / _calcParams.lotsCount) + 1;
    _calcParams.width               = _fixedParams.symbolWidth * _fixedParams.slotCount;
    _calcParams.height              = _fixedParams.lineCount * _fixedParams.symbolHeight;          
    _calcParams.itemsInSlotAmount   = _calcParams.lotsCount * _calcParams.duplicateCount;  
    _calcParams.slotHeight          = _calcParams.itemsInSlotAmount * _fixedParams.symbolHeight; 
    
    
    var _mergedParams = Object.assign(_fixedParams, _calcParams);
    
    return _mergedParams;
    
});
