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

    // Create Fireworks Container
    const fireworksContainer = document.createElement("div");
    fireworksContainer.classList.add("fireworks-container");
    document.body.appendChild(fireworksContainer);

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
        clearFireworks();
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
                setTimeout(() => {
                    showModal("🎉 You Won!", selectedWord, true);
                    launchFireworks();
                }, 500);
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

    function createFirework(x, y) {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const firework = document.createElement("div");
                firework.classList.add("firework");
                const colors = ["red", "yellow", "blue", "green", "purple", "orange"];
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                const randomX = x + (Math.random() - 0.5) * 200;
                const randomY = y + (Math.random() - 0.5) * 200;

                firework.style.left = `${randomX}px`;
                firework.style.top = `${randomY}px`;

                fireworksContainer.appendChild(firework);
                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }, i * 50);
        }
    }

    function launchFireworks() {
        for (let i = 0; i < 5; i++) { 
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight / 2; 
                createFirework(x, y);
            }, i * 600);
        }
    }

    function clearFireworks() {
        fireworksContainer.innerHTML = ""; 
    }
    document.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    if (key.length === 1 && key >= "A" && key <= "Z") {
        const button = [...keyboardDiv.querySelectorAll("button")].find(btn => btn.innerText === key);
        
        if (button && !button.disabled) {
        button.click();
        }
    }
    });

});
