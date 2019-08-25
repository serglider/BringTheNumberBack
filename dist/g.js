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
const COLORS = {
    c1: '#26717F',
    c2: '#0A4B59',
    c3: '#B19F3C',
    c4: '#F2AC29',
    c5: '#DB5C43'
};

const KEYS = {
    DIGIT: 'digit',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ENTER: 'Enter'
};

function Game(world, configs) {

    const {
        initBlockY,
        rightBlockX,
        leftBlockX,
        rightBlockX1,
        leftBlockX1,
        stepHeight,
        digitBlockConfig
    } = configs;
    const robot = new Robot();
    let step = 0;
    let userGuesses = [];
    let currentUserInput;
    let currentRobotScore;

    return {start};

    function start() {
        robot.start();
        addGuessInput();
    }

    function onUserGuess(guess) {
        const strGuess = guess.join('');

        if (userGuesses.includes(strGuess)) {
            alert('You already have this guess');
            currentUserInput.reset();
            currentUserInput.activate();
        } else {
            userGuesses.push(strGuess);
            currentRobotScore = robot.getScore(guess);
            addScoreInput(currentRobotScore);
        }
    }

    function onUserScore(score) {
        step += 1;
        const winner = getWinner(score);
        if (winner) {
            console.log(winner);
        } else {
            robot.handleScore(score);
            addGuessInput();
        }
    }

    function addScoreInput(score) {
        const y = initBlockY + step * stepHeight;
        const x = score ? rightBlockX1 : leftBlockX1;
        const scoreInput = new ScoreInput(x, y, digitBlockConfig);
        world.add(scoreInput);
        if (score) {
            scoreInput.setDigits(score);
            const guess = robot.getGuess();
            addGuessInput(guess);
        } else {
            scoreInput.setOnSubmit(onUserScore);
            scoreInput.activate();
        }
    }

    function addGuessInput(guess) {
        const y = initBlockY + step * stepHeight;
        const x = guess ? leftBlockX : rightBlockX;
        const guessInput = new GuessInput(x, y, digitBlockConfig);
        world.add(guessInput);
        if (guess) {
            guessInput.setDigits(guess);
            addScoreInput();
        } else {
            guessInput.setOnSubmit(onUserGuess);
            guessInput.activate();
            currentUserInput = guessInput;
        }
    }

    function getWinner(userScore) {
        let winner = null;
        let isRobot = isWinScore(userScore);
        let isUser = isWinScore(currentRobotScore);
        if (isRobot && isUser) {
            winner = 'draw';
        } else if (isRobot) {
            winner = 'robot';
        } else if (isUser) {
            winner = 'user';
        }
        return winner;

    }

    function isWinScore(score) {
        return score[0] === 4 && score[1] === 4;
    }
}

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

function InputItem(i, ix, y, {dw, dh, dg}, c, tc) {

    let ctx;
    let text = '';
    const x = ix + i * (dw + dg);
    const tx = x + dw / 2;
    const ty = y + dh / 2;
    const font = `bold ${dh * 0.618}px monospace`;
    let isActive = false;

    return {
        render,
        setContext,
        setDigit,
        activate,
        deactivate
    };

    function render() {
        ctx.fillStyle = isActive ? COLORS.c5 : COLORS.c4;
        ctx.fillRect(x, y, dw, dh);
        ctx.fillStyle = tc;
        ctx.font = font;
        ctx.fillText(text, tx, ty);
    }

    function setContext(c) {
        ctx = c;
    }

    function activate() {
        isActive = true;
    }

    function deactivate() {
        isActive = false;
    }

    function setDigit(d) {
        text = d;
    }
}
function Line({p1, p2, width, color}) {

    let ctx;
    this.isStatic = true;

    this.render = () => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
    };

    this.setContext = (c) => {
        ctx = c;
    };
}
const world = new World();
const configs = getConfigs(world.getBounds());
const game = new Game(world, configs);

init();

function init() {
    world.reset();
    configs.staticItems.forEach(createStaticItem);
    game.start();
}

function createStaticItem({Class, config}) {
    const el = new Class(config);
    world.add(el);
}

function Robot() {

    const digits = Array.from(Array(10), (_, i) => i);
    const allPermutations = permutations(digits, 4);
    let secret, restPermutations, currentGuess;

    return {
        start,
        handleScore,
        getScore,
        getGuess
    };

    function start() {
        secret = getRandomItems(4, digits);
        console.log('robot secret is ', secret);
        restPermutations = [...allPermutations];
        const yoursecret = getRandomItems(4, digits).join('');
        console.log('your secret is ', yoursecret);
    }

    function handleScore(score) {
        restPermutations = reducePermutations(restPermutations, currentGuess, score[0], score[1]);
    }

    function getScore(guess) {
        return scoreGuess(secret, guess);
    }

    function getGuess() {
        currentGuess = pick(restPermutations);
        return currentGuess;
    }
}

function reducePermutations(arr, guess, correct, inPlace) {

    const perms = [...arr];
    if (correct === 0) {
        return perms.filter(hasOthers);
    }
    return perms.filter(hasOptions);

    function hasOptions(item) {
        const [numCorrect, numInPlace] = item.reduce(collectSuitable, [0, 0]);
        return numCorrect === correct && numInPlace === inPlace;
    }

    function hasOthers(item) {
        return item.reduce(collectCorrect, 0) === 0;
    }

    function collectCorrect(result, value) {
        const index = guess.indexOf(value);
        if (index !== -1) result++;
        return result;
    }

    function collectSuitable(result, value, i) {
        const index = guess.indexOf(value);
        if (index !== -1) {
            result[0]++;
            if (index === i) {
                result[1]++;
            }
        }
        return result;
    }
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomItems(n, arr) {
    const shuffled = shuffle(arr);
    return shuffled.slice(0, n);
}

function scoreGuess(secret, guess) {

    return secret.reduce(scoreItem, [0, 0]);

    function scoreItem(result, digit, i) {
        const index = guess.indexOf(digit);
        if (index !== -1) {
            result[0] += 1;
            if (index === i) {
                result[1] += 1;
            }
        }
        return result;
    }
}

function permutations(arr, len) {

    const results = [];
    perms(arr, len);
    return results;

    function removeElement(el, arr) {
        return arr.filter(item => item !== el);
    }

    function perms(arr, len, prefix = []) {
        if (prefix.length === len) {
            results.push(prefix);
        } else {
            for (let elem of arr) {
                const newPrefix = [...prefix];
                newPrefix.push(elem);
                const newRest = removeElement(elem, arr);
                perms(newRest, len, newPrefix);
            }
        }
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
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
function World() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const FPS_INTERVAL = 0.3;
    let objects = [];
    let isStopped = true;
    let tickTime = performance.now();
    let lastTicks = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    this.getBounds = () => {
        return [canvas.width, canvas.height];
    };

    this.getContext = () => {
        return ctx;
    };

    this.add = obj => {
        obj.setContext(ctx);
        objects.push(obj);
    };

    this.reset = () => {
        isStopped = false;
        objects = [];
        tickTime = performance.now();
        lastTicks = 0;
        loop(tickTime);
    };

    function loop(t) {
        if (lastTicks > 3) return;
        const elapsed = t - tickTime;
        // update(t);
        if (elapsed > FPS_INTERVAL) {
            tickTime = t;
            clear();
            render();
        }
        if (isStopped) lastTicks++;
        requestAnimationFrame(loop);
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width - 10, canvas.height - 10);
    }

    // function update(t) {
    //     for (let i = objects.length - 1; i >= 0; i--) {
    //         objects[i].update(t);
    //     }
    // }

    function render() {
        objects.forEach(obj => obj.render());
    }
}
