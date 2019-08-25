function ScoreInput(x, y, {dw, dh, dg}) {
    let digits = [];
    const digitNumber = 2;
    const digitInputs = Array.from({length: digitNumber}, (_, i) => {
        return new InputItem(i, x, y, {dw, dh, dg}, COLORS.c4, COLORS.c1);
    });
    let activeIndex = null;
    let onSubmit;

    window.addEventListener('keyup', onKey);

    return {
        render,
        setContext,
        setOnSubmit,
        setDigits,
        activate
    };

    function onKey(e) {
        if (isActive()) {
            const dig = Number(e.key);
            if (isDigit(dig)) {
                setDigit(dig);
            } else if (e.key === 'Enter') {
                submit();
            }
        }
    }

    function submit() {
        if (digits.length === digitNumber) {
            onSubmit(digits);
            digitInputs[activeIndex].deactivate();
            activeIndex = null;
            window.removeEventListener('keyup', onKey);
        }
    }

    function setDigit(dig) {
        if (!isValid(dig)) {
            return;
        }
        digits[activeIndex] = dig;
        digitInputs[activeIndex].setDigit(dig);
        moveActive();
    }

    function moveActive() {
        digitInputs[activeIndex].deactivate();
        activeIndex = activeIndex === 0 ? 1 : 0;
        digitInputs[activeIndex].activate();
    }

    function isActive() {
        return activeIndex !== null;
    }

    function isValid(num) {
        const isInRange = (num >= 0) && (num <= 4);
        return activeIndex === 1 ? num <= digits[0] : isInRange;
    }

    function isDigit(value) {
        return Number.isInteger(value);
    }

    function activate() {
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