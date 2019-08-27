class Hangman {
  constructor() {
    this.words = [
      "perro",
      "gato",
      "jirafa",
      "mono",
      "leon",
      "cocodrilo",
      "aguila",
      "quetzal",
      "venado",
      "pajaro",
      "perico",
      "tigre",
      "elefante",
      "tiburon",
      "serpiente",
      "pez",
      "zorro",
      "vaca",
      "burro",
      "lobo"
    ];
    this.secretWord = "";
    this.letters = [];
    this.guessedLetter = "";
    this.errorsLeft = 10;
  }
  getWord() {
    return this.words[
      Math.floor(Math.random() * this.words.length)
    ].toUpperCase();
  }
  checkIfLetter(keyCode) {
    if (64 < keyCode && keyCode < 91) return true;
    else return false;
  }
  checkClickedLetters(key) {
    if (this.letters.indexOf(key) != -1) return false;
    else return true;
  }
  addCorrectLetter(i) {
    this.guessedLetter += this.secretWord[i].toUpperCase();
    this.checkWinner();
  }
  addWrongLetter() {
    this.errorsLeft--;
    this.checkGameOver();
  }
  checkGameOver() {
    if (this.errorsLeft === 0) return true;
    else return false;
  }
  checkWinner() {
    if (this.errorsLeft > 0) {
      for (let i = 0; i < this.secretWord.length; i++) {
        let guess = false;
        for (let j = 0; j < this.guessedLetter.length; j++) {
          if (this.secretWord.charAt(i) === this.guessedLetter.charAt(j)) {
            guess = true;
          }
        }
        if (guess === false) return false;
      }
      return true;
    }
  }
}

const hangman = new Hangman();
let canvas;

document.getElementById("start-game-button").onclick = function() {
  hangman.secretWord = hangman.getWord();
  canvas = new HangmanCanvas(hangman.secretWord);
};

document.onkeydown = function(e) {
  if (!hangman.checkIfLetter(e.keyCode)) return;
  if (!hangman.checkClickedLetters(e.key)) return;
  let index = hangman.secretWord.indexOf(e.key.toUpperCase());
  if (index === -1) {
    hangman.addWrongLetter(e.keyCode);
    canvas.writeWrongLetter(e.key, hangman.errorsLeft);
    canvas.drawHangman(hangman.errorsLeft);
    if (hangman.checkGameOver()) {
      canvas.gameOver();
      return;
    }
  } else {
    hangman.addCorrectLetter(index);
    canvas.writeCorrectLetter(index);
    while (true) {
      index = hangman.secretWord.indexOf(e.key.toUpperCase(), index + 1);
      if (index == -1) break;
      canvas.writeCorrectLetter(index);
    }
    if (hangman.checkWinner()) {
      canvas.winner();
      return;
    }
  }
};
