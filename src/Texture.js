function createTexture({dw, dh, df}, bgColor, textColor) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const tx = dw / 2;
    canvas.width = dw;
    canvas.height = dh * 11;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.font = df;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, dw, canvas.height);
    ctx.fillStyle = textColor;

   Array.from({length: 11}, setData).forEach(drawText);

    function drawText({x, y, t}) {
        ctx.fillText(t, x, y);
    }

    function setData(_, i) {
        return {
            x: tx,
            y: dh / 2 + i * dh,
            t: i === 10 ? '' : i
        };
    }

    return canvas;
}