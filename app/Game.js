import { Quote } from './Quote.js';

class Game {
   currentStep = 0;
   lastStep = 7;

   quotes = [{
      text: 'harry potter',
      category: 'Book'
   }, {
      text: 'lord of the ring',
      category: 'Book'
   }, {
      text: 'game of throne',
      category: 'TV Series'
   }, {
      text: 'fast and furious',
      category: 'Movie'
   }];

   constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
      this.lettersWrapper = lettersWrapper;
      this.categoryWrapper = categoryWrapper;
      this.wordWrapper = wordWrapper;
      this.outputWrapper = outputWrapper;

      const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
      this.categoryWrapper.innerHTML = `Category: ${category}`;
      this.quote = new Quote(text);
   }

   playerAttempt(letter, event) {
      event.target.disabled = true;
      if (this.quote.guess(letter)) {
         this.drawSlogan();
      } else {
         this.currentStep++;
         document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
         if (this.currentStep == this.lastStep) {
            this.loosing();
         }
      }
   }

   drawLettersKeyboard() {
      for (let i = 0; i < 26; i++) {
         const label = (i + 10).toString(36);
         const button = document.createElement('button');
         button.innerHTML = label;
         button.addEventListener('click', (event) => this.playerAttempt(label, event));
         this.lettersWrapper.appendChild(button);
      }
   }

   drawSlogan() {
      const content = this.quote.getSloganContent();
      this.wordWrapper.innerHTML = content;
      if (!content.includes('_')) {
         this.winning();
      }
   }

   endGame() {
      this.outputWrapper.remove();
      this.categoryWrapper.remove();
      this.lettersWrapper.remove();

      const section = document.getElementById('hangman')
      const button = document.createElement('button');
      button.classList.add('new-game');
      button.innerHTML = 'New Game';
      section.appendChild(button);
      button.addEventListener('click', () => location.reload());
   }

   winning() {
      this.wordWrapper.innerHTML = "Congratulation, You Won !!!";
      this.endGame();
   }

   loosing() {
      this.wordWrapper.innerHTML = "Game Over !!!";
      this.endGame();
   }

   start() {
      document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
      this.drawLettersKeyboard();
      this.drawSlogan();
   }
};

const game = new Game({
   lettersWrapper: document.getElementById('letters'),
   categoryWrapper: document.getElementById('category'),
   wordWrapper: document.getElementById('word'),
   outputWrapper: document.getElementById('output'),
});

game.start();