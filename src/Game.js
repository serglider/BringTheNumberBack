function Game(world, configs) {

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

        if (userGuesses.includes(strGuess)) {
            alert('You already have this guess');
            currentUserInput.reset();
            currentUserInput.activate();
        } else {
            userGuesses.push(strGuess);
            const score = robot.getScore(guess);
            addScoreInput(score);
        }
    }

    function onUserScore(score) {
        currentUserScore = score;
        robot.handleScore(score);
        addGuessInput();

    }

    function addScoreInput(score) {
        const y = initBlockY + step * stepHeight;
        const x = score ? rightBlockX1 : leftBlockX1;
        const bgColor = score ? COLORS.c3 : COLORS.c4;
        const scoreInput = new InputSet('score', x, y, digitBlockConfig, bgColor);
        world.add(scoreInput);
        if (score) {
            scoreInput.setDigits(score);
            step++;
            const winner = getWinner(score);
            if (winner) {
                showResult(winner);
            } else {
                const guess = robot.getGuess();
                addGuessInput(guess);
            }

        } else {
            scoreInput.setOnSubmit(onUserScore);
            scoreInput.activate();
        }
    }

    function addGuessInput(guess) {
        const y = initBlockY + step * stepHeight;
        const x = guess ? leftBlockX : rightBlockX;
        const bgColor = guess ? COLORS.c3 : COLORS.c4;
        const guessInput = new InputSet('guess', x, y, digitBlockConfig, bgColor);
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

    function showResult(result) {
        world.add(resultDisplay);
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
