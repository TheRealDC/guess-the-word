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
        playerGuesses();
        updateWord(guessedLetters);
    }
    
};
//console.log(guessedLetters);

const playerGuesses = function () {
    yourGuessedLetters.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        yourGuessedLetters.append(li);
    }  
};

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    //console.log(showWord);
    wordInProgress.innerText = showWord.join("");
    checkIfWon();
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        youGuessed.classList.add("win");
        youGuessed.innerHTML = `<p class="highlight">You guessed the correct word!  CONGRATS!!`;
    }
};