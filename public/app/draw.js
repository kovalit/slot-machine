define(function () {
    
    /**
    * Контекст для рисования на холсте
    * @private
    */
    var _context;
         
    return {
        
        /**
        * Устанавливает контекст
        */
        setContext: function(canvas) {
                _context    = canvas.getContext("2d");
        },

        /**
        * Очищает холст
        * 
        * @param  {number} width - ширина области
        * @param  {number} height - высота области
        * @param  {number} left - начало области слева
        * @param  {number} top - начало области сверху
        */
        clear: function(width, height, left, top) {
                if (left === undefined) {
                    left = 0;
                }
                if (top === undefined) {
                    top = 0;
                }
                _context.clearRect(left, top, width, height);
        },
        
        /**
        * Отображает изображение на холсте 
        * 
        * @param  {Image} pictire - ширина области
        * @param  {number} x - позиция изображения на холсте слева
        * @param  {number} y - позиция изображения на холсте сверху
        * @param  {number} width - ширина изображения и ширина области отображения 
        * @param  {number} height - высота изображения и высота области отображения 
        * @param  {number} dx - начальная позиция на изображении слева
        * @param  {number} dy - начальная позиция на изображении сверху
        */
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