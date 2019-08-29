function Game(world, keyboard, configs) {

    const {
        centerX,
        centerY,
        initBlockY,
        rightBlockX,
        leftBlockX,
        rightBlockX1,
        leftBlockX1,
        stepHeight,
        digitBlockConfig
    } = configs;
    const bg = new Background(configs);
    const robot = new Robot();
    const resultDisplay = new ResultDisplay(centerX, centerY, digitBlockConfig);
    const userTexture = createTexture(digitBlockConfig, COLORS.c4, COLORS.c1);
    const robotTexture = createTexture(digitBlockConfig, COLORS.c3, COLORS.c1);
    let step;
    let userGuesses;
    let unsubscribe;
    let currentUserInput;
    let currentUserScore;
    let isBgAnim = true;

    return {start, toggleAnimation};

    function toggleAnimation() {
        isBgAnim = !isBgAnim;
        if (isBgAnim) {
            bg.show();
        } else {
            bg.hide();
        }
    }

    function start() {
        step = 0;
        userGuesses = [];
        robot.start();
        resultDisplay.reset();
        const guess = robot.getGuess();
        if (isBgAnim) {
            world.add(bg);
        }
        addGuessInput(guess);
    }

    function onUserGuess(guess) {
        const strGuess = guess.join('');
        unsubscribe();
        if (userGuesses.includes(strGuess)) {
            showResult(RESULTS.DUPLICATE_GUESS);
            currentUserInput.reset();
            initUserInput(currentUserInput, onUserGuess);
        } else {

            userGuesses.push(strGuess);
            const score = robot.getScore(guess);
            addScoreInput(score);
        }
    }

    function onUserScore(score) {
        unsubscribe();
        currentUserScore = score;
        const isUserScoreError = robot.handleScore(score);
        if (isUserScoreError) {
            showResult(RESULTS.SCORE_ERROR);
        } else {
            addGuessInput();
        }
    }

    function addScoreInput(score) {
        const y = initBlockY + step * stepHeight;
        const x = score ? rightBlockX1 : leftBlockX1;
        const bgColor = score ? COLORS.c3 : COLORS.c4;
        const texture = score ? robotTexture : userTexture;
        const scoreInput = new InputSet(INPUT_TYPES.SCORE, x, y, digitBlockConfig, bgColor, texture);
        world.add(scoreInput);
        if (score) {
            scoreInput.setDigits(score);
            nextStep();
            const winner = getWinner(score);
            if (winner) {
                showResult(winner);
            } else {
                const guess = robot.getGuess();
                addGuessInput(guess);
            }

        } else {
            initUserInput(scoreInput, onUserScore);
        }
    }

    function addGuessInput(guess) {
        const y = initBlockY + step * stepHeight;
        const x = guess ? leftBlockX : rightBlockX;
        const bgColor = guess ? COLORS.c3 : COLORS.c4;
        const texture = guess ? robotTexture : userTexture;
        const guessInput = new InputSet(INPUT_TYPES.GUESS, x, y, digitBlockConfig, bgColor, texture);
        world.add(guessInput);
        if (guess) {
            guessInput.setDigits(guess);
            addScoreInput();
        } else {
            initUserInput(guessInput, onUserGuess);
        }
    }

    function initUserInput(input, callback) {
        input.activate(callback);
        unsubscribe = keyboard.subscribe(input.onKey);
        currentUserInput = input;
        bg.reset();
    }

    function showResult(result) {
        world.moveToTop(resultDisplay);
        resultDisplay.show(result);
    }

    function getWinner(robotScore) {
        let result = null;
        let isUser = isWinScore(robotScore);
        let isRobot = isWinScore(currentUserScore);
        if (isRobot && isUser) {
            result = RESULTS.DRAW;
        } else if (isRobot) {
            result = RESULTS.ROBOT;
        } else if (isUser) {
            result = RESULTS.USER;
        }
        return result;

    }

    function isWinScore(score) {
        return score[0] === 4 && score[1] === 4;
    }

    function nextStep() {
        step++;
        if (step === 1) {
            world.add(resultDisplay);
        }
    }
}
