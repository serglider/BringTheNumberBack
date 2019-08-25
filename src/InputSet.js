function InputSet(type, x, y, {dw, dh, dg}, bgColor) {

    let onSubmit, digitNumber, isValid;
    let activeIndex = null;
    let digits = [];
    const isScore = type === 'score';
    if (isScore) {
        digitNumber = 2;
        isValid = isValidScore;
    } else {
        digitNumber = 4;
        isValid = isValidGuess;
    }

    const digitInputs = Array.from({length: digitNumber}, (_, i) => {
        return new InputItem(i, x, y, {dw, dh, dg}, bgColor, COLORS.c1);
    });

    return {
        render,
        setContext,
        setOnSubmit,
        setDigits,
        activate,
        reset
    };

    function onKey(e) {
        if (isActive()) {
            const dig = Number(e.key);
            if (isDigit(dig)) {
                setDigit(dig);
            } else if (e.key === 'ArrowRight') {
                moveActiveRight();
            } else if (e.key === 'ArrowLeft') {
                moveActiveLeft();
            } else if (e.key === 'Enter') {
                submit();
            }
        }
    }

    function reset() {
        digits = [];
        digitInputs.forEach((d, i) => d.setDigit(''));
    }

    function submit() {
        if (digits.length === digitNumber) {
            digitInputs[activeIndex].deactivate();
            activeIndex = null;
            window.removeEventListener('keyup', onKey);
            onSubmit(digits);
        }
    }

    function setDigit(value) {
        if (!isValid(value)) {
            return;
        }
        const oldValue = digits[activeIndex];
        digits[activeIndex] = value;
        if (isScore && digits[0] < digits[1]) {
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

    function isActive() {
        return activeIndex !== null;
    }

    function isValidScore(value) {
        return (value >= 0) && (value <= 4);
    }

    function isValidGuess(value) {
        return !(digits.includes(value));
    }

    function isDigit(value) {
        return Number.isInteger(value);
    }

    function activate() {
        window.addEventListener('keyup', onKey);
        activeIndex = 0;
        digitInputs[activeIndex].activate();
    }

    function setOnSubmit(callback) {
        onSubmit = callback;
    }

    function setDigits(digits) {
        digitInputs.forEach((d, i) => d.setDigit(digits[i]));
    }

    function render() {
        digitInputs.forEach(d => d.render());
    }

    function setContext(c) {
        digitInputs.forEach(d => d.setContext(c));
    }
}