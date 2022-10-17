const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numGuessesLeft = document.querySelector(".remaining span");
const youGuessed = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "Magnolia";

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
    console.log(show);
    letterInput.value = "";
});