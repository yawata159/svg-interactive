var ns = "http://www.w3.org/2000/svg";

var svg = document.getElementById("s");
var move = document.getElementById("move");
var clear = document.getElementById("clear");

function circleListener(e) {
    if (this.getAttribute("fill") == "red") {
        this.setAttribute("fill", "purple");
    }
    else {
        this.setAttribute("cx",Math.floor(Math.random() * 501));
        this.setAttribute("cy",Math.floor(Math.random() * 501));
    }
    e.stopPropagation();
}

function newCircle(x,y,r) {
    var ret = document.createElementNS(ns, "circle");
    ret.setAttribute("cx", x);
    ret.setAttribute("cy", y);
    ret.setAttribute("r", r);
    ret.setAttribute("fill", "red");

    ret.addEventListener("click", circleListener);

    return ret;
}

function newDot(e) {
    var x = e.offsetX;
    var y = e.offsetY;

    var circle = newCircle(x, y, 20);
    svg.appendChild(circle);
}

svg.addEventListener("click", newDot);
