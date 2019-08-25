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
