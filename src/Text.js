function Text({
                  text = '',
                  fontFamily = 'fantasy',
                  fontSize = 14,
                  align = 'center',
                  color, x, y, fontWeight
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
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.textAlign = align;
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