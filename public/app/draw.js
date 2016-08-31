define(function () {
    
    var _context;
         
    return {
        
        setContext: function(canvas) {
                _context    = canvas.getContext("2d");
        },

        clear: function(width, height, left, top) {
                if (left === undefined) {
                    left = 0;
                }
                if (top === undefined) {
                    top = 0;
                }
                _context.clearRect(left, top, width, height);
        },
        
        
        image: function(pictire, x, y, width, height, dx, dy) {
                if (dx === undefined) {
                    dx = 0;
                }
                if (dy === undefined) {
                    dy = 0;
                }
                _context.drawImage(pictire, 
                        dx, dy, 
                        width, height, 
                        x, y, 
                        width, height
                );
        }
        
    };
});