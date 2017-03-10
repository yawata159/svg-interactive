var ns = "http://www.w3.org/2000/svg";

var svg = document.getElementById("s");
var move = document.getElementById("move");
var clear = document.getElementById("clear");

var rid = 0;

function circleListener(e) {
    if (this.getAttribute("fill") == "red") {
        this.setAttribute("fill", "purple");
    }
    else {
        this.remove();
        var x = Math.floor(Math.random() * (+svg.getAttribute("width")+1));
        var y = Math.floor(Math.random() * (+svg.getAttribute("height")+1));
        drawCircle(x,y,40);
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

    drawCircle(x, y, 40);
}

function bounceCircles(e) {
    window.cancelAnimationFrame( rid );
    function move(circle) {
	var xspeed = 2;
	var yspeed = 2;
	function move2() {
	    var x = parseInt(circle.getAttribute("cx"));
	    var y = parseInt(circle.getAttribute("cy"));
	    if (x >= parseInt(svg.getAttribute("width")) - parseInt(circle.getAttribute("r")) || x <= parseInt(circle.getAttribute("r"))) {
		xspeed = -xspeed;
	    }
            if (y >= parseInt(svg.getAttribute("height")) - parseInt(circle.getAttribute("r")) || y <= parseInt(circle.getAttribute("r"))) {
                yspeed = -yspeed;
	    }
	    circle.setAttribute("cx",x + xspeed);
	    circle.setAttribute("cy",y + yspeed);
	    rid = window.requestAnimationFrame( move2 );
	}
	move2();
    }
    for (i = 1; i < svg.childNodes.length; i++){
	move(svg.childNodes[i]);
    }
}

function clearSVG(e) {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

svg.addEventListener("click", newCircle);
move.addEventListener("click", bounceCircles);
clear.addEventListener("click", clearSVG);
