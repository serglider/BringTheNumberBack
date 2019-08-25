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

        const subTitleFS = Math.round(digitBlockWidth * 0.618);
        const subTitleY = digitBlockWidth * 3;
        const initBlockY = subTitleY + digitBlockHeight;
        const rightBlockX = centerX + digitBlockWidth;
        const rightBlockX1 = rightBlockX + 5 * digitBlockWidth + 3 * digitBlockGap;
        const leftBlockX = centerX - 5 * digitBlockWidth - 3 * digitBlockGap;
        const leftBlockX1 = leftBlockX - 3 * digitBlockWidth - digitBlockGap;
        const stepHeight = Math.round(digitBlockHeight  * 1.618);
        const staticItems = [
            {
                Class: Text,
                config: {
                    text: 'GAME TITLE',
                    x: centerX,
                    y: digitBlockWidth,
                    color: COLORS.c5,
                    fontSize: digitBlockWidth,
                    fontFamily: 'fantasy'
                }
            },

            {
                Class: Text,
                config: {
                    text: 'YOUR GUESS',
                    x: rightBlockX,
                    y: subTitleY,
                    color: COLORS.c5,
                    fontSize: subTitleFS,
                    fontWeight: 'bold',
                    align: 'left',
                    fontFamily: 'system-ui'
                }
            },
            {
                Class: Text,
                config: {
                    text: 'ROBOT GUESS',
                    x: centerX - digitBlockWidth,
                    y: subTitleY,
                    color: COLORS.c5,
                    fontSize: subTitleFS,
                    fontWeight: 'bold',
                    align: 'right',
                    fontFamily: 'system-ui'
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
                dg: digitBlockGap
            },
            staticItems
        };
    }

}