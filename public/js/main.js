  


    var main = {
        
        createCanvas : function() {
                var canvas = document.createElement("canvas");
                
                var width = game.slotCount * game.letterWidth;
                var height = game.fieldCount * game.letterHeight;
                
                canvas.setAttribute("width", width);
                canvas.setAttribute("height", height);
                canvas.setAttribute("id", "gameField");
                
                document.body.appendChild(canvas); 
        },
        
        startClick: function() {
            alert('start');
        },
        
        subscribeToEvents: function() {
            document.getElementById('srartBth').onclick = this.startClick;   
        }
        
    };
    
    (function () {
        
        main.createCanvas();
        main.subscribeToEvents();
        
    }());