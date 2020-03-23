(function() {

    window.onload = init;

    function init() {
        // access the canvas element and its context
        var canvas = document.getElementById("testCanvas");
        var context = canvas.getContext("2d");
        var ballSize = 30; //radius
         
        canvas.onmousedown = function(e) {
            // grab the coordinates for later use
            let x = e.clientX - e.target.offsetLeft
            let y = e.clientY - e.target.offsetTop

            // create an object that represents this circle
            let circleObject = {
                    x: x, 
                    y: y, 
                    size: ballSize,
                    color: randomColor(), 
                    isDisplayed: true} 

            // draw the circle
            context.fillStyle = circleObject.color
            context.beginPath()
            context.arc(circleObject.x, circleObject.y, circleObject.size, 0, (Math.PI * 2))
            context.fill()
            context.closePath()


            
        };

    }

})();
