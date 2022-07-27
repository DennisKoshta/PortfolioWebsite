const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight-4
canvas.width = window.innerWidth-4

const ctx = canvas.getContext("2d")

// Initialization
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.lineCap = 'round';

let prevX = null
let prevY = null

let draw = false

var sizeSlider = document.getElementById("sizeSlider")
ctx.lineWidth = sizeSlider.value

// Set draw toggle listeners
canvas.addEventListener("mousedown", (e) => {draw = true})
canvas.addEventListener("mouseup", (e) => {draw = false})

// Canvas clear logic
let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", clearCanvas)

// Saving drawing as image
let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", saveCanvas)

// Creating color logic
let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)

let oldClr = [clrs[0], clrs[0].style.border]
let prevColor = clrs[0].dataset.clr

clrs.forEach(clr => {
    clr.addEventListener("click", () => setColor(clr))
})
function setColor(clr) {
    if (clr.dataset.clr == "random") {
        canvas.addEventListener("mouseup", randomColor)
        randomColor()
    }
    else {
        ctx.strokeStyle = clr.dataset.clr
        ctx.fillStyle = clr.dataset.clr

        prevColor = clr.dataset.clr

        canvas.removeEventListener("mouseup", randomColor)
    }
    
    // Reset old color border
    oldClr[0].style.border = oldClr[1]
    // Set old color to current color
    oldClr = [clr, clr.style.border]
    // Set highlight border
    clr.style.border = "3px solid #FFFFFF"
}

setColor(clrs[0])

// Creating mode logic
let modes = document.querySelectorAll(".mode")
modes = Array.from(modes)

let oldMode = [modes[0], modes[0].style.border]

modes.forEach(mode => {
    mode.addEventListener("click", () => setMode(mode))
})
function setMode(mode) {
    switch(mode.dataset.mode) {
        case "draw":
            canvas.addEventListener("mousemove", drawLine)
            canvas.addEventListener("mousedown", drawPoint)
            canvas.removeEventListener("mousedown", drawTree)

            ctx.lineWidth = sizeSlider.value

            break

        case "stamp":
            canvas.addEventListener("mousedown", drawTree)
            canvas.removeEventListener("mousemove", drawLine)
            canvas.removeEventListener("mousedown", drawPoint)

            break

        default:
            break
    }

    // Reset old color border
    oldMode[0].style.border = oldMode[1]
    // Set old color to current color
    oldMode = [mode, mode.style.border]
    // Set highlight border
    mode.style.border = "3px solid #FFFFFF"
}

setMode(modes[0])

// Size slider updates
sizeSlider.oninput = function() {ctx.lineWidth = this.value}

// Canvas resizing logic
// window.addEventListener('resize', () => {
//     // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight

//     // ctx.scale(0.1, 0.1)
//     // ctx.putImageData(imageData, 0, 0)

//     // clearCanvas()
//     // setColor(clrs[3])
// })

//DRAWING FUNCTIONS
function drawTree(e, len = (60 * (sizeSlider.value / 40)), angle = 0, branchWidth = (30 * (sizeSlider.value / 100))) {
    console.log(len)
    if (Array.isArray(e)) {
        x = e[0]
        y = e[1]
    }
    else {
        x = e.clientX
        y = e.clientY + (len*2)
    }

    ctx.lineWidth = branchWidth

    ctx.beginPath()
    ctx.save()

    ctx.translate(x, y)
    ctx.rotate(angle * Math.PI/180)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -len)
    ctx.stroke()

    ctx.shadowBlur = 50
    ctx.shadowColor = "rgba(0,0,0,0.4)"

    if(len < sizeSlider.value/5) {
        ctx.restore()
        return
    }

    drawTree([0, -len], len*0.8, angle-15, branchWidth*0.8)
    drawTree([0, -len], len*0.8, angle+15, branchWidth*0.8)
    // drawTree(0, -len, len*0.8, angle+15, branchWidth*0.8)

    ctx.restore()
}

function drawLine(e) {
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    let currentX = e.clientX
    let currentY = e.clientY

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()
    // randomColor()
    // drawTree(e)

    prevX = currentX
    prevY = currentY
}

function drawPoint(e) {
    let currentX = e.clientX
    let currentY = e.clientY

    ctx.beginPath()
    ctx.moveTo(currentX, currentY-1)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()
}

function clearCanvas() {
    ctx.save()

    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.restore()
}

function saveCanvas() {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    // what ever name you specify here
    // the image will be saved as that name
    a.download = "sketch.png"
    a.click()
}

function randomColor() {
    // var clr = clrs[Math.floor(Math.random() * 6)]

    // while (clr.dataset.clr == prevColor) {
    //     clr = clrs[Math.floor(Math.random() * 6)]
    // }
    
    var randomColor = 'hsl('+ 360*Math.random() +', '+ (100-50*Math.random()) +'%, '+ (50*Math.random()+25) +'%)'

    ctx.strokeStyle = randomColor
    ctx.fillStyle = randomColor

    prevColor = randomColor
}