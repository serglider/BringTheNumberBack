function InputSet(type, x, y, blockConfig, bgColor, texture) {

    let onSubmit, digitNumber, isValid;
    let activeIndex = null;
    let digits = [];
    let ctx;

    const isScoreInput = type === INPUT_TYPES.SCORE;
    if (isScoreInput) {
        digitNumber = 2;
        isValid = isValidScoreItem;
    } else {
        digitNumber = 4;
        isValid = isValidGuessItem;
    }
    const {bgX, bgY, bgW, bgH} = getBgBounds(digitNumber, x, y, blockConfig);
    const digitInputs = Array.from({length: digitNumber}, (_, i) => {
        return new InputItem(i, x, y, blockConfig, bgColor, COLORS.c1, texture);
    });

    return {
        render,
        setContext,
        setDigits,
        activate,
        onKey,
        reset
    };

    function activate(callback) {
        onSubmit = callback;
        activeIndex = 0;
        digitInputs[activeIndex].activate();
    }

    function setDigits(digits) {
        digitInputs.forEach((d, i) => d.setDigit(digits[i]));
    }

    function render() {
        ctx.save();
        ctx.fillStyle = COLORS.c1;
        ctx.globalAlpha = 0.618;
        ctx.fillRect(bgX, bgY, bgW, bgH);
        ctx.restore();
        digitInputs.forEach(d => d.render());
    }

    function setContext(c) {
        ctx = c;
        digitInputs.forEach(d => d.setContext(c));
    }

    function onKey(e) {
        if (e.isDigit) {
            setDigit(e.digit);
        } else if (e.isArrowRight) {
            moveActiveRight();
        } else if (e.isArrowLeft) {
            moveActiveLeft();
        } else if (e.isEnter) {
            submit();
        }
    }

    function reset() {
        digits = [];
        digitInputs.forEach(d => d.setDigit(''));
    }

    function submit() {
        if (digits.length === digitNumber) {
            digitInputs[activeIndex].deactivate();
            activeIndex = null;
            onSubmit(digits);
        }
    }

    function setDigit(value) {
        if (!isValid(value)) {
            return;
        }
        const oldValue = digits[activeIndex];
        digits[activeIndex] = value;
        if (isScoreInput && !isValidScore()) {
            digits[activeIndex] = oldValue;
            return;
        }
        digitInputs[activeIndex].setDigit(value);
        moveActiveRight();
    }

    function moveActiveRight() {
        digitInputs[activeIndex].deactivate();
        activeIndex = (activeIndex + 1) % digitNumber;
        digitInputs[activeIndex].activate();
    }

    function moveActiveLeft() {
        digitInputs[activeIndex].deactivate();
        activeIndex -= 1;
        if (activeIndex < 0) {
            activeIndex = digitNumber - 1;
        }
        digitInputs[activeIndex].activate();
    }

    function isValidScore() {
        if (isNum(digits[0]) && isNum(digits[1])) {
            if (digits[0] === 4 && digits[1] === 3) {
                return false;
            }
            return digits[0] >= digits[1];
        }
        return true;
    }

    function isNum(value) {
        return Number.isInteger(value);
    }

    function isValidScoreItem(value) {
        return value <= 4;
    }

    function isValidGuessItem(value) {
        return !(digits.includes(value));
    }

    function getBgBounds(n, x, y, {dw, dh, dg}) {
        const padding = 6;
        return {
            bgX: x - padding,
            bgY: y - padding,
            bgW: n * dw + (n - 1) * dg + padding * 2,
            bgH: dh + padding * 2
        };
    }
}