function ResultDisplay(cx, cy, {dw, dh, df}) {

    let ctx;
    let title = '';
    let text1 = '';
    let text2 = '';
    let alpha = 0;
    let alpha1 = 0;
    const hideTimeout = 4000;
    const inTweenDuration = 300;
    const inTweenDuration1 = 1200;
    const outTweenDuration = 1200;
    const textFont = `bold ${dh * 0.618 * 0.618}px monospace`;
    const w = dw * 16;
    const h = dh * 4;
    const x = cx - w / 2;
    const y = cy - h / 2;


    return {
        render,
        reset,
        setContext,
        show,
        hide
    };

    function reset() {
        alpha = 0;
        alpha1 = 0;
        title = '';
    }

    function render() {
        if (title) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = COLORS.c2;
            ctx.fillRect(x, y, w, h);

            ctx.lineWidth = 6;
            ctx.strokeStyle = COLORS.c4;
            ctx.strokeRect(x, y, w, h);

            ctx.globalAlpha = alpha1;
            ctx.fillStyle = COLORS.c3;
            ctx.font = df;
            ctx.fillText(title, cx, cy - dh);
            ctx.font = textFont;
            ctx.fillText(text1, cx, cy);
            ctx.fillText(text2, cx, cy + dh);
            ctx.restore();
        }
    }

    function setContext(c) {
        ctx = c;
    }

    function show(result) {
        [title, text1, text2] = result.split('.');
        const start = {alpha: 0};
        const end = {alpha: 1};
        const start1 = {alpha1: 0};
        const end1 = {alpha1: 1};
        tween(start, end, inTweenDuration, EASINGS.IN_CUBIC, onProgress, () => {});
        tween(start1, end1, inTweenDuration1, EASINGS.OUT_CUBIC, onProgress1, onComplete);

        function onProgress() {
            alpha = start.alpha;
        }

        function onProgress1() {
            alpha1 = start.alpha1;
        }

        function onComplete() {
            setTimeout(hide, hideTimeout);
        }
    }

    function hide() {
        const start = {alpha: 1, alpha1: 1};
        const end = {alpha: 0, alpha1: 0};
        tween(start, end, outTweenDuration, EASINGS.IN_CUBIC, onProgress, reset);

        function onProgress() {
            alpha = start.alpha;
            alpha1 = start.alpha1;
        }
    }
}