function World() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const FPS_INTERVAL = 0.3;
    let objects = [];
    let isStopped = true;
    let tickTime = performance.now();
    let lastTicks = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    this.getBounds = () => {
        return [canvas.width, canvas.height];
    };

    this.getContext = () => {
        return ctx;
    };

    this.add = obj => {
        obj.setContext(ctx);
        objects.push(obj);
    };

    this.reset = () => {
        isStopped = false;
        objects = [];
        tickTime = performance.now();
        lastTicks = 0;
        loop(tickTime);
    };

    function loop(t) {
        if (lastTicks > 3) return;
        const elapsed = t - tickTime;
        // update(t);
        if (elapsed > FPS_INTERVAL) {
            tickTime = t;
            clear();
            render();
        }
        if (isStopped) lastTicks++;
        requestAnimationFrame(loop);
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width - 10, canvas.height - 10);
    }

    // function update(t) {
    //     for (let i = objects.length - 1; i >= 0; i--) {
    //         objects[i].update(t);
    //     }
    // }

    function render() {
        objects.forEach(obj => obj.render());
    }
}
