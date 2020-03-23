(function(doc) {
    window.onload = init;

    var points = [];

    function init() {
        // access the canvas element and its context
        var canvas = doc.getElementById("testCanvas");
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
                    isDisplayed: true
                  } 


            // check to see if this circle overlaps any others
            points.forEach(prevCircle => {
              // find the hypotenuse between the centers; if it is less than twice the ball size, they are overlapping, hide the previous circle
              if (Math.sqrt(Math.abs(prevCircle.x-circleObject.x)**2 + Math.abs(prevCircle.y-circleObject.y)**2) < (ballSize * 2)) {
                prevCircle.isDisplayed = false;
              }
            })


            // add the circleObject to the array for future reference 
            points.push(circleObject)

            // clear the rectangle so we can redraw with non-hidden circles
            context.clearRect(0, 0, canvas.width, canvas.height)

            // iterate through the circles and redraw all the non-hidden circles
            points.forEach(circle => {
              if(circle.isDisplayed) {
                // draw the circles
                context.fillStyle = circle.color
                context.beginPath()
                context.arc(circle.x, circle.y, circle.size, 0, (Math.PI * 2))
                context.fill()
                context.closePath()
              }})};
      }

})(document);









