function Line({p1, p2, width, color}) {

    let ctx;
    this.isStatic = true;

    this.render = () => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
    };

    this.setContext = (c) => {
        ctx = c;
    };
}