import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  template: `
    <div *ngIf="!gameStarted">
      <button (click)="startGame()">Start Game</button>
    </div>
    <div *ngIf="gameStarted && !gameOver">
      <p>{{ currentWord.wordfr }}</p>
      <input [(ngModel)]="userAnswer" placeholder="Enter your answer">
      <button (click)="checkAnswer()">Submit</button>
    </div>
    <div *ngIf="gameOver">
      <p>Game Over! You scored {{ score }} points.</p>
    </div>
  `
})
export class GameComponent {
  gameStarted = false;
  gameOver = false;
  score = 0;
  currentWord = { wordfr: '', wordnl: '', id: ''};
  userAnswer = '';
  words = [];
  
  startGame() {
    fetch('http://localhost:3000/words')
      .then(response => response.json())
      .then(words => {
        this.words = words;
        this.gameStarted = true;
        this.getNextWord();
      });
  }
  
  getNextWord() {
    if (this.words.length === 0) {
      this.gameOver = true;
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[randomIndex];
    this.words.splice(randomIndex, 1);
    this.userAnswer = '';
  }
  
  checkAnswer() {
    if (this.userAnswer === this.currentWord.wordnl) {
      this.score++;
    } else {
      this.score--;
    }
    this.getNextWord();
  }
}
