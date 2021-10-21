export function randomRGB() {
    const o = Math.round, r = Math.random, s = 255;
    const rgb = o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
    return rgb.split(',').map(Number);
}