function GuessInput(x, y, {dw, dh, dg}) {

    let digits = [];
    const digitNumber = 4;
    const digitInputs = Array.from({length: digitNumber}, (_, i) => {
        return new InputItem(i, x, y, {dw, dh, dg}, COLORS.c4, COLORS.c1);
    });
    let activeIndex = null;
    let onSubmit;

    return {
        render,
        setDigits,
        setContext,
        setOnSubmit,
        activate,
        reset
    };

    function reset() {
        digits = [];
        digitInputs.forEach((d, i) => d.setDigit(''));
    }

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

    function submit() {
        if (digits.length === digitNumber) {
            digitInputs[activeIndex].deactivate();
            activeIndex = null;
            window.removeEventListener('keyup', onKey);
            onSubmit(digits);
        }
    }

    function setDigit(dig) {
        if (digits.includes(dig)) {
            return;
        }
        digits[activeIndex] = dig;
        digitInputs[activeIndex].setDigit(dig);
        moveActiveRight();
    }

    function moveActiveRight() {
        digitInputs[activeIndex].deactivate();
        activeIndex = (activeIndex + 1) % 4;
        digitInputs[activeIndex].activate();
    }

    function moveActiveLeft() {
        digitInputs[activeIndex].deactivate();
        activeIndex -= 1;
        if (activeIndex < 0) {
            activeIndex = 3;
        }
        digitInputs[activeIndex].activate();
    }

    function isActive() {
        return activeIndex !== null;
    }

    function isDigit(value) {
        return Number.isInteger(value);
    }

    function activate() {
        window.addEventListener('keyup', onKey);
        activeIndex = 0;
        digitInputs[activeIndex].activate();
    }

    function setDigits(digits) {
        digitInputs.forEach((d, i) => d.setDigit(digits[i]));
    }

    function setOnSubmit(callback) {
        onSubmit = callback;
    }

    function render() {
        digitInputs.forEach(d => d.render());
    }

    function setContext(c) {
        digitInputs.forEach(d => d.setContext(c));
    }
}
