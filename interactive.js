var ns = "http://www.w3.org/2000/svg";

var svg = document.getElementById("s");
var move = document.getElementById("move");
var clear = document.getElementById("clear");

function circleListener(e) {
    if (this.getAttribute("fill") == "red") {
        this.setAttribute("fill", "purple");
    }
    else {
        this.remove();
        var x = Math.floor(Math.random() * (+svg.getAttribute("width")+1));
        var y = Math.floor(Math.random() * (+svg.getAttribute("height")+1));
        drawCircle(x,y,20);
    }
    e.stopPropagation();
}

function drawCircle(x,y,r) {
    var ret = document.createElementNS(ns, "circle");
    ret.setAttribute("cx", x);
    ret.setAttribute("cy", y);
    ret.setAttribute("r", r);
    ret.setAttribute("fill", "red");

    ret.addEventListener("click", circleListener);

    svg.appendChild(ret);
}

function newCircle(e) {
    var x = e.offsetX;
    var y = e.offsetY;

    drawCircle(x, y, 20);
}

function bounceCircles(e) {
    console.log("bounce");
    // magic 
}

function clearSVG(e) {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

svg.addEventListener("click", newCircle);
move.addEventListener("click", bounceCircles);
clear.addEventListener("click", clearSVG);
