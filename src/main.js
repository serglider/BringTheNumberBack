const world = new World();
const start = new Dot(200, 400, 10, 'white');
const finish = new Dot(600, 400, 10, 'white');
const curve = new Curve(start, finish);
const drawing = new Drawing();

const ctx = world.getContext();
const canvas = ctx.canvas;
let isDrawing;

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mousemove', onMouseMove);
window.onkeyup = e => {
    if (e.key === ' ') {
        console.log();
        init();
    }
};

init();

function init() {
    world.reset();
    drawing.reset();
    world.add(curve);
    world.add(start);
    world.add(finish);
    world.add(drawing);
}

function onMouseDown(e) {
    if (start.contains(e.pageX, e.pageY)) {
        isDrawing = true;
    }
}

function onMouseUp(e) {
    isDrawing = false;
    if (finish.contains(e.pageX, e.pageY)) {
        drawing.setNormTimeline();
        const drawingDots = drawing.getDots();
        const curveDots = curve.getDots(drawingDots);
        compare(drawingDots, curveDots);
    }
}

function compare(drawing, curve) {
    const sum = drawing.reduce((acc, {x, y}, i) => {
        const dx = (Math.abs(x - curve[i].x) / curve[i].x) * 100;
        const dy = (Math.abs(y - curve[i].y) / curve[i].y) * 100;
        acc += (dx + dy) / 2;
        return acc;
    }, 0);

    console.log(sum / drawing.length);
}

function onMouseMove(e) {
    if (isDrawing) {
        const dot = new Dot(e.pageX, e.pageY, 2, 'red', e.timeStamp);
        drawing.add(dot);
    }
}
