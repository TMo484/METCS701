import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchQuestionService } from './fetch-question.service';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css']
})
export class GameComponentComponent implements OnInit {

  gameInProgress: Boolean;
  player: Object;
  opponents: Array<Object>;
  countdownTimer: number;
  countdownTimerLimit: number;
  question: Object;
  currentAnswer: String;
  numQuestions: number;
  currQuestionNum: number;
  guessedCorrect: Boolean;
  pointValue: number;

  constructor(
    private fetchQuestionService: FetchQuestionService,
    private router: Router
    ) {
    this.gameInProgress = true;
    this.numQuestions = 2;
    this.currQuestionNum = 1;
    this.player = {
      name: "You",
      score: 0
    }
    this.opponents = [
      {name: "Steve", level: 2, score: 0},
      {name: "Patricia", level: 4, score: 0},
      {name: "Bob", level: 1, score: 0},
    ]
    this.countdownTimerLimit = 30;
    this.countdownTimer = this.countdownTimerLimit;
  }

  ngOnInit() {
    this.loadGame()
    this.grabQuestion()
    setInterval(this.decrementTimer.bind(this), 1000)
  }

  decrementTimer() {
    if(this.gameInProgress) {
      if(this.countdownTimer > 0 && this.getButtonStatus() === "Submit Guess") {
        this.countdownTimer -= 1;
      } else {
        if (this.getButtonStatus() === "Submit Guess") {
          this.handleSubmit()
        }
      }
    }
  }

  grabQuestion() {
    this.fetchQuestionService
      .getQuestion(this.numQuestions)
      .subscribe(result => {
        this.question = result
      })
  }

  getButtonStatus() {
    return document.getElementById("submitGuess").innerHTML;
  }

  toggleButton() {
    let submitButton = document.getElementById("submitGuess")
    if(submitButton.getAttribute("disabled")) {
      submitButton.removeAttribute("disabled")
    } else {
      submitButton.setAttribute("disabled", "true")
    }
  }

  handleSubmit() {
    this.toggleButton()
    let buttonStatus: String = this.getButtonStatus()
    if (buttonStatus === "Submit Guess") {
      this.submitGuess()
    } else if (buttonStatus === "Next Question") {
      this.advanceGame()
    } else if (buttonStatus === "View Results") {
      this.completeGame()
    }
    setTimeout(() => {this.toggleButton()}, 500)
  }

  submitGuess() {
    if(this.checkEndGame()) {
      document.getElementById("submitGuess").innerHTML = "View Results"
    } else {
      document.getElementById("submitGuess").innerHTML = "Next Question"
    }
    let guessedCorrect = this.checkGuess()
    this.highlightGuess(guessedCorrect)
    this.assignPoints(guessedCorrect)
  }

  checkGuess() {
    return document.getElementById("guess").innerHTML === this.question["results"][this.currQuestionNum - 1]["correct_answer"]
  }

  highlightGuess(guessedCorrect) {
    if(guessedCorrect) {
      document.getElementById("guessDrop").setAttribute("class", "correct-guess")
    } else {
      document.getElementById("guessDrop").setAttribute("class", "wrong-guess")
    }
  }

  assignPoints(guessedCorrect) {
    let pointValue = this.getPointValue()
    if(guessedCorrect) {
      this.player["score"] += pointValue
    }
    
    this.opponents.forEach(opponent => {
      if((opponent["level"]/10) >= Math.random()) {
        opponent["score"] += pointValue
      }
    })
  }

  getPointValue() {
      switch(this.question["results"][0]["difficulty"]) {
        case "easy":
          return 100;
        case "medium":
          return 200;
        case "hard":
          return 300;
        default:
          return 999;
      }
  }

  checkEndGame() {
    return this.currQuestionNum >= this.numQuestions
  }

  advanceGame() {
    if(this.currQuestionNum < this.numQuestions) {  
      this.nextQuestion()
    } else {
      this.completeGame()
    }
    this.saveGame()
  }

  nextQuestion() {
    // advance the counter
    this.currQuestionNum += 1
    // reset the countdown clock
    this.countdownTimer = this.countdownTimerLimit;
    // reset the guess block
    document.getElementById("guessDrop").setAttribute("class", "no-guess")
    document.getElementById("guess").innerText = "Drag Guess Here"
    // change button back to submit
    document.getElementById("submitGuess").innerHTML = "Submit Guess"
  }

  completeGame() {
    this.gameInProgress = false;
    this.saveGame()
    this.router.navigate(['results'])
  }

  saveGame() {
    let saveObject: object = {}
    saveObject["gameInProgress"] = this.gameInProgress
    saveObject["numQuestions"] = this.numQuestions
    saveObject["currQuestionNum"] = this.currQuestionNum
    saveObject["player"] = this.player
    saveObject["opponents"] = this.opponents
    saveObject["countdownTimerLimit"] = this.countdownTimerLimit
    window.localStorage.setItem("triviopardy_savestate", JSON.stringify(saveObject))
  }

  loadGame() {
    let loadObject: object = JSON.parse(window.localStorage.getItem("triviopardy_savestate"))
    this.numQuestions = loadObject["numQuestions"]
    this.currQuestionNum = loadObject["currQuestionNum"]
    this.player = loadObject["player"]
    this.opponents = loadObject["opponents"]
    this.countdownTimerLimit = loadObject["countdownTimerLimit"]
    this.countdownTimer = loadObject["countdownTimerLimit"]
  }
}
