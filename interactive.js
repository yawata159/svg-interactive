var ns = "http://www.w3.org/2000/svg";

var svg = document.getElementById("s");
var move = document.getElementById("move");
var clear = document.getElementById("clear");
var stop = document.getElementById("stop");

var rid = 0;

function circleListener(e) {
    if (this.getAttribute("fill") == "red") {
        this.setAttribute("fill", "purple");
    }
    else {
        this.remove();
        var x = Math.floor(Math.random() * (+svg.getAttribute("width")+1));
        var y = Math.floor(Math.random() * (+svg.getAttribute("height")+1));
        drawCircle(x,y);
    }
    e.stopPropagation();
}

function drawCircle(x,y) {
    var ret = document.createElementNS(ns, "circle");
    ret.setAttribute("cx", x);
    ret.setAttribute("cy", y);
    ret.setAttribute("r", 20);
    ret.setAttribute("fill", "red");

    ret.xdir = 1;
    ret.ydir = 1;

    ret.addEventListener("click", circleListener);

    svg.appendChild(ret);
}

function newCircle(e) {
    var x = e.offsetX;
    var y = e.offsetY;

    drawCircle(x, y);
}

function bounceCircles(e) {
    window.cancelAnimationFrame(rid);

    function move() {
        var circles = svg.children;
    
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            var x = +circle.getAttribute("cx");
            var y = +circle.getAttribute("cy");
            var r = +circle.getAttribute("r");


            if (x <= r) circle.xdir = 1;
            else if (x >= svg.getAttribute("width") - r) circle.xdir = - 1;

            if (y <= r) circle.ydir =  1;
            else if (y >= svg.getAttribute("height") - r) circle.ydir =  - 1;

            circle.setAttribute("cx", x + +circle.xdir);
            circle.setAttribute("cy", y + +circle.ydir);

        }

        rid = window.requestAnimationFrame(move);
    }
    move()

}

function clearSVG(e) {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

function stopIt(e) {
    window.cancelAnimationFrame(rid);
}

svg.addEventListener("click", newCircle);
move.addEventListener("click", bounceCircles);
clear.addEventListener("click", clearSVG);
stop.addEventListener("click", stopIt);
