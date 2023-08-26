/*
*
* Most utils taken from https://github.com/vikrum/kidpix/blob/main/js/util/utils.js
*
*/

export function distanceBetween(ev1, ev2) {
    var deltaxsq = (ev2._x - ev1._x) * (ev2._x - ev1._x);
    var deltaysq = (ev2._y - ev1._y) * (ev2._y - ev1._y);
    return Math.sqrt(deltaxsq + deltaysq);
}

export function angleBetween(ev1, ev2) {
    var y = ev2._y - ev1._y;
    var x = ev2._x - ev1._x;
    var angle = Math.atan(y / (x == 0 ? 0.001 : x)) + (x < 0 ? Math.PI : 0);
    return angle;
}

export function angleBetweenRad(ev1, ev2) {
    return Math.atan2(ev2._x - ev1._x, ev2._y - ev1._y);
}

export function ziggurat() {
    return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
}

export function boxmuller() {
    const r = Math.sqrt(-2 * Math.log(Math.random()));
    const theta = 2 * Math.PI * Math.random();
    return [r * Math.cos(theta), y = r * Math.sin(theta)];
}

export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// Standard Normal variate using Box-Muller transform.
// https://stackoverflow.com/a/36481059
export function randn_bm(min, max, skew) {
    let u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) {
        num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    } else {
        num = Math.pow(num, skew); // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
    }
    return num;
}


// http://michalbe.blogspot.com/2011/02/javascript-random-numbers-with-custom_23.html
export function srng(seed) {
    seed = seed || 7;
    var constant = Math.pow(2, 11) + 1;
    var prime = 4241;
    var maximum = 4243;
    return {
        next: function() {
            seed *= constant;
            seed += prime;
            return seed % maximum / maximum;
        }
    }
}

// https://stackoverflow.com/questions/17924214/canvas-how-would-you-properly-interpolate-between-two-points-using-bresenhams
export function bresenham(x1, y1, x2, y2, callback) {
    var dx = x2 - x1;
    var sx = 1;
    var dy = y2 - y1;
    var sy = 1;
    var space = 0;
    var spacing = 0;

    if (dx < 0) {
        sx = -1;
        dx = -dx;
    }

    if (dy < 0) {
        sy = -1;
        dy = -dy;
    }

    dx = dx << 1;
    dy = dy << 1;

    if (dy < dx) {
        var fraction = dy - (dx >> 1);

        while (x1 != x2) {
            if (fraction >= 0) {
                y1 += sy;
                fraction -= dx;
            }

            fraction += dy;
            x1 += sx;

            if (space == spacing) {
                callback(x1, y1);
                space = 0;
            } else {
                space += 1;
            }
        }
    } else {
        var fraction = dx - (dy >> 1);

        while (y1 != y2) {
            if (fraction >= 0) {
                x1 += sx;
                fraction -= dy;
            }

            fraction += dx;
            y1 += sy;

            if (space == spacing) {
                callback(x1, y1);
                space = 0;
            } else {
                space += 1;
            }
        }
    }

    callback(x1, y1);
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function invlerp(a, b, v) {
    return (1.0 * (v - a)) / (1.0 * (b - a));
}

export function remap(imin, imax, omin, omax, v) {
    return lerp(omin, omax, invlerp(imin, imax, v));
}

// Given the 4 control points on a Bezier curve 
// get x,y at interval T along the curve (0<=T<=1)
// The curve starts when T==0 and ends when T==1
// https://stackoverflow.com/questions/34681457/html5-canvas-bezier-curve-get-all-the-points
export function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
    var x = CubicN(percent, startPt[0], controlPt1[0], controlPt2[0], endPt[0]);
    var y = CubicN(percent, startPt[1], controlPt1[1], controlPt2[1], endPt[1]);
    return ({
        _x: x,
        _y: y
    });
}

// cubic helper formula
export function CubicN(T, a, b, c, d) {
    var t2 = T * T;
    var t3 = t2 * T;
    return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}

// https://stackoverflow.com/a/38626906
export function bezierLength(startPt, controlPt1, controlPt2, endPt) {
    var a = startPt;
    var b = endPt;
    var c1 = controlPt1;
    var c2 = controlPt2;

    // output the curve in SVG bezier syntax
    var svgBezier = `M${a[0]} ${a[1]} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${b[0]} ${b[1]}`;

    // create a new <path> element
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // add the curve
    path.setAttribute('d', svgBezier);

    // get the length using browser power
    return path.getTotalLength();
}

export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function sortKeys(dict) {
    var keys = [];
    for (var key in dict) {
        keys.push(key);
    }
    keys.sort();
    return keys;
}