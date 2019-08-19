function Curve(start, finish) {

    this.c = 'white';

    this.isAlive = true;
    this.isYoung = true;
    this.isStatic = true;
    this.done = false;

    let ctx;
    const sx = start.x;
    const sy = start.y;
    const ex = finish.x;
    const ey = finish.y;

    const cp1x = start.x + 100;
    const cp1y = start.y - 300;
    const cp2x = finish.x - 100;
    const cp2y = finish.y - 300;


    this.render = () => {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
        ctx.strokeStyle = this.c;
        ctx.stroke();
    };

    this.setContext = (c) => {
        ctx = c;
    };

    this.getDots = d => {
        return d.map(({normTime}) => getBezierXY(normTime, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey));
    };
}

// function drawDot(ctx, t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
//     const {x, y} = getBezierXY(t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey);
//     ctx.beginPath();
//     ctx.fillStyle = '#88f';
//     ctx.arc(x, y, 5, 0, Math.PI * 2);
//     ctx.fill();
//     return {x, y};
//
// }

function getBezierXY(t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
    return {
        x: Math.pow(1 - t, 3) * sx + 3 * t * Math.pow(1 - t, 2) * cp1x
            + 3 * t * t * (1 - t) * cp2x + t * t * t * ex,
        y: Math.pow(1 - t, 3) * sy + 3 * t * Math.pow(1 - t, 2) * cp1y
            + 3 * t * t * (1 - t) * cp2y + t * t * t * ey
    };
}