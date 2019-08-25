function Text({
                  text = '',
                  fontFamily = 'fantasy',
                  fontSize = 14,
                  align = 'center',
                  strokeWidth = 5,
                  color, stroke, x, y, fontWeight
              }) {

    let ctx;
    const font = setFont();

    return {
        render,
        setContext,
        setText
    };

    function render() {
        ctx.save();
        ctx.font = font;
        ctx.textAlign = align;
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.lineWidth = strokeWidth;
            ctx.strokeText(text, x, y);
        }
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);

        ctx.restore();
    }

    function setContext(c) {
        ctx = c;
    }

    function setText(t) {
        text = t;
    }

    function setFont() {
        const fw = fontWeight ? `${fontWeight} ` : '';
        return `${fw}${fontSize}px ${fontFamily}`;
    }
}