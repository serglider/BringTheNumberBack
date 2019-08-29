function World() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const FPS_INTERVAL = 0.3;
    let objects = [];
    let dynamicObjects = [];
    let tickTime = performance.now();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';

    return {
        getBounds,
        moveToTop,
        add,
        remove,
        reset
    };

    function getBounds() {
        return [canvas.width, canvas.height];
    }
    
    function remove(obj) {
        objects = objects.filter(item => item !== obj);
        dynamicObjects = dynamicObjects.filter(item => item !== obj);
    }

    function add(obj) {
        obj.setContext(ctx);
        objects.push(obj);
        if (typeof obj.update === 'function') {
            dynamicObjects.push(obj);
        }
    }

    function moveToTop(obj) {
        objects = objects.filter(item => item !== obj);
        objects.push(obj);
    }

    function reset() {
        objects = [];
        dynamicObjects = [];
        tickTime = performance.now();
        loop(tickTime);
    }

    function loop(t) {
        const elapsed = t - tickTime;
        update(t);
        if (elapsed > FPS_INTERVAL) {
            tickTime = t;
            clear();
            render();
        }
        requestAnimationFrame(loop);
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width - 10, canvas.height - 10);
    }

    function update(t) {
        dynamicObjects.forEach(obj => obj.update(t));
    }

    function render() {
        objects.forEach(obj => obj.render());
    }
}
