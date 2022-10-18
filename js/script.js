const yourGuessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const numGuessesLeft = document.querySelector(".remaining span");
const youGuessed = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "Magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //console.log(words);
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random()*wordArray.length);
    word = wordArray[randomIndex].trim();
    wordInPlay(word);
};
getWord();

const wordInPlay = function (word) {
    const wordInPlayLetters = [];
    for (const letter of word) {
        //console.log(letter);
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
        countGuesses(show);
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

const countGuesses = function (show) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(show)) {
        youGuessed.innerText = `Sorry, the word does not contain the letter ${show}.`;
        remainingGuesses -= 1;
    } else {
        youGuessed.innerText = `Awesome job! The word does contain the letter ${show}.`;
    }
    if (remainingGuesses === 0) {
        youGuessed.innerHTML = `Bummer dude! GAME OVER The word was ${word}.`;
        numGuessesLeft.innerText = `You have ${remainingGuesses} guesses`;
        startOver();
    } else if (remainingGuesses === 1) {
        numGuessesLeft.innerText = `${remainingGuesses} guess`;
    } else {
        numGuessesLeft.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        youGuessed.classList.add("win");
        youGuessed.innerHTML = `<p class="highlight">You guessed the correct word!  CONGRATS!!`;
        startOver();
    }
    
};

const startOver = function () {
    button.classList.add("hide");
    remaining.classList.add("hide");
    yourGuessedLetters.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click" , function () {
    youGuessed.classList.remove("win");
    remainingGuesses = 8;
    guessedLetters = [];
    numGuessesLeft.innerText = `${remainingGuesses} guesses`
    youGuessed.innerText = "";
    yourGuessedLetters.innerText = "";
    button.classList.remove("hide");
    remaining.classList.remove("hide");
    yourGuessedLetters.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
});