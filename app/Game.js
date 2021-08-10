class Game {
   constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
      this.lettersWrapper = lettersWrapper;
      this.categoryWrapper = categoryWrapper;
      this.wordWrapper = wordWrapper;
      this.outputWrapper = outputWrapper;
   }

   guessLetter(letter) {
      console.log(letter);
   }

   startGame() {
      for (let i = 0; i < 26; i++) {
         const label = (i + 10).toString(36);
         const button = document.createElement('button');
         button.innerHTML = label;
         button.addEventListener('click', (e) => this.guessLetter(label));
         this.lettersWrapper.appendChild(button);
      }
   }
};