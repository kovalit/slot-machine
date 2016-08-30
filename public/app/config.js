define(function () {
    
    var _fixedParams = {
            symbolWidth         : 216,  // px
            
            symbolHeight        : 144,  // px

            slotCount           : 3,    // column count
            lineCount           : 3,    // row count
            typeCount           : 4,    // unique symbol count 

            centerLine          : 2,    // win line

            availableSymbols    : ['A','B','C','D','E'],

            speed               : 12,   // offset per iteration, px

            winAnimationCount   : 5,    // win keyframes count

            stopDelay           : 1000, // ms
            stopSlotDelay       : 1000, // ms  

            winAnimationDelay   : 200   // ms
    };
    
    var _calcParams = {
            width               : _fixedParams.symbolWidth * _fixedParams.slotCount,
            height              : _fixedParams.lineCount * _fixedParams.symbolHeight,           
            countSymbolInSlot   : _fixedParams.availableSymbols.length * _fixedParams.typeCount,  
            slotHeight          : _fixedParams.symbolHeight * _fixedParams.availableSymbols.length * _fixedParams.typeCount    
    }  
    
    var _mergedParams = Object.assign(_fixedParams, _calcParams);
    
    return _mergedParams;
    
});
