const yourGuessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numGuessesLeft = document.querySelector(".remaining span");
const youGuessed = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "Magnolia";
const guessedLetters = [];

const wordInPlay = function (word) {
    const wordInPlayLetters = [];
    for (const letter of word) {
        console.log(letter);
        wordInPlayLetters.push("●");
    }
    wordInProgress.innerText = wordInPlayLetters.join("");
};

wordInPlay(word);

button.addEventListener("click", function (e) {
    e.preventDefault();
    const show = letterInput.value;
    //console.log(show);
    youGuessed.innerText = "";
    const goodGuess = validate(show);
    if (goodGuess) {
        makeGuess(show);
    }
    letterInput.value = "";
    //console.log(makeGuess);
});

const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        youGuessed.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        youGuessed.innerText = "Please enter only one letter.";
    } else if (!input.match(acceptedLetter)) {
        youGuessed.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (show) {
    show = show.toUpperCase();
    if (guessedLetters.includes(show)) {
        youGuessed.innerText = "You already guessed that letter!";
    } else {
        guessedLetters.push(show);
    }
};
console.log(guessedLetters);