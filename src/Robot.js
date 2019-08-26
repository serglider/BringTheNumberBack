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
        return restPermutations.length === 0;
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