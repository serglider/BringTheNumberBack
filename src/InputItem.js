function InputItem(i, ix, y, {dw, dh, dg, df}, c, tc, texture) {

    const x = ix + i * (dw + dg);
    const tx = x + dw / 2;
    const ty = y + dh / 2;
    const tweenDuration = 300;
    let ctx;
    let text = '';
    let isActive = false;
    let isAnim = false;
    let dy = dh * 10;

    return {
        render,
        setContext,
        setDigit,
        activate,
        deactivate
    };

    function render() {
        ctx.fillStyle = isActive ? COLORS.c5 : c;
        ctx.fillRect(x, y, dw, dh);
        if (isAnim) {
            ctx.drawImage(texture, 0, dy, dw, dh, x, y, dw, dh);
        } else {
            ctx.fillStyle = tc;
            ctx.font = df;
            ctx.fillText(text, tx, ty);
        }
    }

    function setContext(c) {
        ctx = c;
    }

    function activate() {
        isActive = true;
    }

    function deactivate() {
        isActive = false;
    }

    function setDigit(d) {
        text = d;
        isAnim = true;
        const start = {dy};
        const end = {dy: d * dh};
        tween(start, end, tweenDuration, EASINGS.OUT_ELASTIC, onProgress, onComplete);

        function onProgress() {
            dy = start.dy;
        }

        function onComplete() {
            dy = d * dh;
            isAnim = false;
        }
    }
}
