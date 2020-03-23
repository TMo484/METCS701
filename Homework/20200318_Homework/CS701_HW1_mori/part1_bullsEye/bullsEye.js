var bullsEyeModule = (function() {

    window.onload = init;

    // canvas and context variables
    var canvas;
    var context;

    // center of the pattern
    var centerX, centerY;


    function init() {
        
            canvas = document.getElementById("testCanvas");
            context = canvas.getContext("2d");

            centerX = canvas.width / 2;
            centerY = canvas.height / 2;
            
            // draw the initial pattern
            drawPattern();
    }


    // called whenever the slider value changes
    function drawPattern()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // grab the slider value
        let sliderValue = document.getElementById("band").value
        // assign the slider value to the output tag
        document.getElementById("widthDisplay").innerHTML = sliderValue 
        // set an initial state so the color is always red on the outermost ring
        context.fillStyle = "#0000ff"

        // start with radius equal to the canvas width; so long as the radius is greater than zero, draw a circle
        // then reduce the radius by the slider value 
        for (let radius = (canvas.width/2); radius > 0; radius-=(sliderValue)) {    
            // switch the color on every iteration
            context.fillStyle = context.fillStyle === "#ff0000" ? "#0000ff" : "#ff0000"
            context.beginPath()
            context.arc(centerX, centerY, radius, 0, (2 * Math.PI), true)
            context.fill()
            context.closePath();
        }


        


    }
    

    return {
        drawPattern: drawPattern
    };

})();






