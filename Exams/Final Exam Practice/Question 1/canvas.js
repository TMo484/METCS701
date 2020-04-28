let canvas = document.getElementById("canvas")
let context = canvas.getContext("2d")

let ballRadius = 15
let numRows = canvas.height / ballRadius

for(let i=(numRows-1); i>=0; i--) {
    context.fillStyle = i%2 === 0 ? "#ff0000" : "#0000ff"
    let yOffset = (i*ballRadius) + (ballRadius/2)
    for (let j=0; j<=i; j++) {
        let xOffset = (((numRows - i)/2) * ballRadius) + (j * ballRadius)
        context.beginPath()
        context.arc(xOffset, yOffset, ballRadius/2, 0, (2*Math.PI), true)
        context.fill()
        context.closePath()
    }
}