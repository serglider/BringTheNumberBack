function World() {

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let objects = [];
    let dynamicObjects = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';

    requestAnimationFrame(loop);

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
    }

    function loop(t) {
        update(t);
        clear();
        render();
        requestAnimationFrame(loop);
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update(t) {
        dynamicObjects.forEach(obj => obj.update(t));
    }

    function render() {
        objects.forEach(obj => obj.render());
    }
}
