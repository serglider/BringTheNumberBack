function ResultDisplay(cx, cy, {dw, dh}) {

    let ctx;
    let title = '';
    let text1 = '';
    let text2 = '';
    let alpha = 0;
    let speed = 0.03;
    const hideTimeout = 4000;
    let isHiding = false;
    const titleFont = `bold ${dh * 0.618}px monospace`;
    const textFont = `bold ${dh * 0.618 * 0.618}px monospace`;
    const w = dw * 16;
    const h = dh * 4;
    const x = cx - w / 2;
    const y = cy - h / 2;


    return {
        render,
        update,
        setContext,
        show,
        hide
    };

    function render() {
        if (title) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = COLORS.c2;
            ctx.fillRect(x, y, w, h);
            ctx.fillStyle = COLORS.c3;
            ctx.font = titleFont;
            ctx.fillText(title, cx, cy - dh);
            ctx.font = textFont;
            ctx.fillText(text1, cx, cy);
            ctx.font = textFont;
            ctx.fillText(text2, cx, cy + dh);
            ctx.restore();
        }
    }

    function update() {
        if (title) {
            if (isHiding) {
                alpha -= speed;
                if (alpha < 0) {
                    title = '';
                }
            } else {
                alpha += speed;
                if (alpha > 1) {
                    alpha = 1;
                }
            }
        }
    }

    function setContext(c) {
        ctx = c;
    }

    function show(result) {
        [title, text1, text2] = result.split('.');
        setTimeout(hide, hideTimeout);
    }

    function hide() {
        isHiding = true;
    }
}