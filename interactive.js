var ns = "http://www.w3.org/2000/svg";
var svg = document.getElementById("s");
var rand = document.getElementById("random");
var move = document.getElementById("move");
var clear = document.getElementById("clear");
var stop = document.getElementById("stop");

var rid = 0;

function newCircle(e) {
    regularCircle(e.offsetX, e.offsetY);
}

function randCircle(e) {
    var x = Math.floor(Math.random() * (+svg.getAttribute("width")+1));
    var y = Math.floor(Math.random() * (+svg.getAttribute("height")+1));
    regularCircle(x, y);
}

function regularCircle(x,y) {
    drawCircle(30, x, y, 1, 1);
}

function drawCircle(r,x,y,xdir,ydir) {
    var ret = document.createElementNS(ns, "circle");
    ret.setAttribute("cx", x);
    ret.setAttribute("cy", y);
    ret.setAttribute("r", r);
    ret.setAttribute("fill", "red");

    ret.xdir = xdir;
    ret.ydir = ydir;

    ret.addEventListener("click", circleListener);

    svg.appendChild(ret);
    return ret;
}

function circleListener(e) {
    if (this.getAttribute("fill") == "red") {
        this.setAttribute("fill", "purple");
    }
    else {
        this.remove();
        randCircle();
    }
    e.stopPropagation();
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
            var width = +svg.getAttribute("width");

            if (x == width/2) {
                circle.setAttribute("r", r/2);
                var duplicate = drawCircle(r/2 , x, y, -circle.xdir, -circle.ydir);
                nextFrame(duplicate);
            }
            nextFrame(circle);
        }
        rid = window.requestAnimationFrame(move);
    }
    move()
}

function nextFrame(circle) {
    var x = +circle.getAttribute("cx");
    var y = +circle.getAttribute("cy");
    var r = +circle.getAttribute("r");
    var width = +svg.getAttribute("width");
    var height = +svg.getAttribute("height");

    if (x <= r) circle.xdir = Math.abs(circle.xdir);
    else if (x >= +width - r) circle.xdir = -Math.abs(circle.xdir);

    if (y <= r) circle.ydir =  Math.abs(circle.xdir);
    else if (y >= +height - r) circle.ydir =  -Math.abs(circle.xdir);

    circle.setAttribute("cx", x + +circle.xdir);
    circle.setAttribute("cy", y + +circle.ydir);

    if (r <= 1) circle.remove();
}

function clearSVG(e) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
}

function stopIt(e) {
    window.cancelAnimationFrame(rid);
}

svg.addEventListener("click", newCircle);
rand.addEventListener("click", randCircle);
move.addEventListener("click", bounceCircles);
clear.addEventListener("click", clearSVG);
stop.addEventListener("click", stopIt);
