function getConfigs(bounds) {

    const [width, height] = bounds;
    const centerX = width / 2;
    const centerY = height / 2;
    let digitBlockHeight = Math.round(height / 16);

    return getRest(digitBlockHeight);

    function getRest(digitBlockHeight) {

        const digitBlockWidth = Math.round(digitBlockHeight * 0.618);
        const digitBlockGap = Math.round(digitBlockWidth * 0.1);
        const required = 16 * digitBlockWidth + 8 * digitBlockGap;

        if (required > width) {
            digitBlockHeight = Math.round(digitBlockHeight * 0.98);
            return getRest(digitBlockHeight);
        }

        const stepHeight = Math.round(digitBlockHeight * 1.618);
        const digitBlockFS = Math.round(digitBlockHeight * 0.618);
        const subTitleFS = Math.round(digitBlockFS * 0.618);
        const digitBlockFont = `bold ${digitBlockFS}px monospace`;
        const subTitleY = digitBlockHeight * 2;
        const initBlockY = subTitleY + subTitleFS;
        const rightBlockX = centerX + digitBlockWidth;
        const rightBlockX1 = rightBlockX + 5 * digitBlockWidth + 3 * digitBlockGap;
        const leftBlockX = centerX - 5 * digitBlockWidth - 3 * digitBlockGap;
        const leftBlockX1 = leftBlockX - 3 * digitBlockWidth - digitBlockGap;

        const staticItems = [
            {
                Class: Text,
                config: {
                    text: 'BRING THE NUMBER BACK!',
                    x: centerX,
                    y: digitBlockHeight,
                    color: COLORS.c5,
                    stroke: COLORS.c2,
                    fontSize: digitBlockWidth,
                    fontFamily: 'Fascinate Inline'
                }
            },

            {
                Class: Text,
                config: {
                    text: 'YOUR GUESS',
                    x: rightBlockX,
                    y: subTitleY,
                    color: COLORS.c4,
                    stroke: COLORS.c2,
                    fontSize: subTitleFS,
                    fontWeight: 'bold',
                    align: 'left',
                    fontFamily: 'Fascinate Inline'
                }
            },
            {
                Class: Text,
                config: {
                    text: 'ROBOT GUESS',
                    x: centerX - digitBlockWidth,
                    y: subTitleY,
                    color: COLORS.c3,
                    stroke: COLORS.c2,
                    fontSize: subTitleFS,
                    fontWeight: 'bold',
                    align: 'right',
                    fontFamily: 'Fascinate Inline'
                }
            },
            {
                Class: Text,
                config: {
                    text: 'SCORE',
                    x: rightBlockX1,
                    y: subTitleY,
                    color: COLORS.c3,
                    stroke: COLORS.c2,
                    fontSize: subTitleFS,
                    fontWeight: 'bold',
                    align: 'left',
                    fontFamily: 'Fascinate Inline'
                }
            },

            {
                Class: Text,
                config: {
                    text: 'SCORE',
                    x: leftBlockX1 + 2 * digitBlockWidth + digitBlockGap,
                    y: subTitleY,
                    color: COLORS.c4,
                    stroke: COLORS.c2,
                    fontSize: subTitleFS,
                    fontWeight: 'bold',
                    align: 'right',
                    fontFamily: 'Fascinate Inline'
                }
            },
        ];

        return {
            width,
            height,
            centerX,
            centerY,
            initBlockY,
            rightBlockX,
            leftBlockX,
            rightBlockX1,
            leftBlockX1,
            stepHeight,
            digitBlockConfig: {
                dw: digitBlockWidth,
                dh: digitBlockHeight,
                dg: digitBlockGap,
                df: digitBlockFont
            },
            staticItems
        };
    }

}