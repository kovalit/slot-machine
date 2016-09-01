define(["./config", "./game", "./draw"], function (config, game, draw) {
     
    return {

        /**
        * Создает холст на странице
        *
        * @this   {page}
        */
        createCanvas : function() {

                var canvas = document.createElement("canvas");
                
                canvas.setAttribute("width",  config.width);
                canvas.setAttribute("height", config.height);
                draw.setContext(canvas);
                
                document.body.insertBefore(canvas, document.body.childNodes[0]);
                this.loadImages();       
  
        },
        
        /**
        * Загружает изображения лотов
        *
        * @this   {page}
        */
        loadImages: function() {
            
            for (var key in config.lots) {
                var image = new Image();
                image.src = config.lots[key].src;
                image.onload = this.checkImageLoad();
                game.addSymbols(key, image);
            }  
            
        },
        
        /**
        * Проверяет окончание загрузки
        *
        * @this   {page}
        */
        checkImageLoad: (function() {
                var imageLoaded = 1;
                
                return function() {
                    imageLoaded++;
                    if (imageLoaded === config.lotsCount) {
                        this.createButton();
                        setTimeout(game.drawInitialState, 100);
                    }
                };
        })(),

        /**
        * Создает кнопку старт
        *
        * @this   {page}
        */
        createButton: function() {
            
                var wrapper = document.getElementById('wrapper'); 
                var input = document.createElement("input");
                
                input.setAttribute("type",  "button");
                input.setAttribute("value", "Start");
                input.setAttribute("id", "startBtn");
                
                input.onclick = this.startClick;    
                
                wrapper.appendChild(input);
                
        },
        
        /**
        * Событие нажатия на кнопку старт
        */
        startClick: function() {
            
            if (!game.isPlay) {
                game.run();
                setTimeout(game.stop.bind(game), config.stopGameDelay);
            }
            
        }
        
    };
});