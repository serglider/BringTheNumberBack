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
    const robot = new Robot();
    const resultDisplay = new ResultDisplay(centerX, centerY, digitBlockConfig);
    let step;
    let userGuesses;
    let unsubscribe;
    let currentUserInput;
    let currentUserScore;

    return {start};

    function start() {
        step = 0;
        userGuesses = [];
        robot.start();
        const guess = robot.getGuess();
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
        const scoreInput = new InputSet(INPUT_TYPES.SCORE, x, y, digitBlockConfig, bgColor);
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

    function nextStep() {
        step++;
        if (step === 1) {
            world.add(resultDisplay);
        }
    }

    function addGuessInput(guess) {
        const y = initBlockY + step * stepHeight;
        const x = guess ? leftBlockX : rightBlockX;
        const bgColor = guess ? COLORS.c3 : COLORS.c4;
        const guessInput = new InputSet(INPUT_TYPES.GUESS, x, y, digitBlockConfig, bgColor);
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
}
