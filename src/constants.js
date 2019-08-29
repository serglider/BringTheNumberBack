const COLORS = {
    c1: '#26717F', //189°, 54%, 32%
    c2: '#0A4B59', // 191°, 80%, 19%
    c3: '#B19F3C', // 51°, 49%, 46%
    c4: '#F2AC29', // 39°, 89%, 55%
    c5: '#DB5C43' // 10°, 68%, 56%
};

const RESULTS = {
    USER: 'You won!.A genuine triumph of the human mind!.Hit Space to beat that piece of metal again',
    ROBOT: 'You lose.Don\'t sweat.Hit Space to try again.',
    DRAW: 'It\'s a draw.You almost there.Hit Space to try again.',
    DUPLICATE_GUESS: 'Oops!.You already have this variant.Think harder))',
    SCORE_ERROR: 'Oops!.There is an error in your scores.Hit Space to restart the game.'
};

const INPUT_TYPES = {
    GUESS: 'guess',
    SCORE: 'score'
};

const EASINGS = {
    IN_CUBIC: 'inCubic',
    OUT_CUBIC: 'outCubic',
    OUT_ELASTIC: 'outElastic'
};
