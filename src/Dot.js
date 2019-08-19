function Dot(x, y, r, c, t) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.t = t;

    this.isAlive = true;
    this.isYoung = true;
    this.isStatic = true;
    this.done = false;

    let ctx;
    const PI2 = 2 * Math.PI;


    this.render = () => {
        if (this.isAlive) {
            ctx.fillStyle = this.c;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, PI2);
            ctx.fill();
        }
    };

    this.contains = (x, y) => {
        const ok = Math.abs(this.x - x) < this.r && Math.abs(this.y - y) < this.r;
        if (ok) {
            this.c = 'green';
        } else {
            this.c = c;
        }
        return ok;
    };

    this.setContext = c => {
        ctx = c;
    };

    this.update = () => {
    };

    this.intersects = other => {
        if (this.done) return false;
        const d = dist(this, other);
        return d < this.r + other.r;
    };

    function dist(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
}
