document.addEventListener("DOMContentLoaded", () => {
    const wordDisplay = document.querySelector(".words");
    const hintText = document.querySelector(".hints");
    const keyboardDiv = document.querySelector(".keyboard");
    const guessesDisplay = document.querySelector(".guesses b");
    const hangmanImage = document.querySelector(".box img");
    const gameModal = document.querySelector(".game-modal");
    const modalMessage = document.querySelector(".game-modal p b");
    const playAgainButton = document.querySelector(".play-again");
    const modalGif = gameModal.querySelector("img"); 

    let selectedWord = "";
    let incorrectGuesses = 0;
    const maxGuesses = 6;

    const getRandomWord = () => {
        const { word, hint } = HangmanWords[Math.floor(Math.random() * HangmanWords.length)];
        selectedWord = word.toUpperCase();
        hintText.innerText = `[ Hint: ${hint} ]`;
        wordDisplay.innerHTML = "";
        
        selectedWord.split("").forEach(() => {
            const letterItem = document.createElement("li");
            letterItem.classList.add("letters");
            wordDisplay.appendChild(letterItem);
        });

        incorrectGuesses = 0;
        guessesDisplay.innerText = `0 / ${maxGuesses}`;
        hangmanImage.src = `hangman-0.svg`;
        modalGif.src = "";

        keyboardDiv.querySelectorAll("button").forEach(button => {
            button.disabled = false;
        });

        gameModal.style.display = "none";
    };

    const handleLetterClick = (event) => {
        if (event.target.tagName !== "BUTTON") return;

        const letter = event.target.innerText;
        event.target.disabled = true;

        if (selectedWord.includes(letter)) {
            [...selectedWord].forEach((char, index) => {
                if (char === letter) {
                    wordDisplay.children[index].innerText = letter;
                }
            });

            if ([...wordDisplay.children].every(li => li.innerText !== "")) {
                showModal("🎉 You Won!", selectedWord, true);
            }
        } else {
            incorrectGuesses++;
            guessesDisplay.innerText = `${incorrectGuesses} / ${maxGuesses}`;
            hangmanImage.src = `hangman-${incorrectGuesses}.svg`;

            if (incorrectGuesses === maxGuesses) {
                showModal("Game Over!", selectedWord, false);
            }
        }
    };

    const showModal = (message, word, isWin) => {
        modalMessage.innerText = word;
        gameModal.querySelector("h4").innerText = message;
        modalGif.src = isWin ? "victory.gif" : "lost.gif"; 
        gameModal.style.display = "flex";
    };

    playAgainButton.addEventListener("click", getRandomWord);
    keyboardDiv.addEventListener("click", handleLetterClick);

    getRandomWord();
});
