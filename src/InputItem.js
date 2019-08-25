function InputItem(i, ix, y, {dw, dh, dg}, c, tc) {

    let ctx;
    let text = '';
    const x = ix + i * (dw + dg);
    const tx = x + dw / 2;
    const ty = y + dh / 2;
    const font = `bold ${dh * 0.618}px monospace`;
    let isActive = false;

    return {
        render,
        setContext,
        setDigit,
        activate,
        deactivate
    };

    function render() {
        ctx.fillStyle = isActive ? COLORS.c5 : COLORS.c4;
        ctx.fillRect(x, y, dw, dh);
        ctx.fillStyle = tc;
        ctx.font = font;
        ctx.fillText(text, tx, ty);
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
    }
}