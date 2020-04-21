import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-component',
  templateUrl: './start-component.component.html',
  styleUrls: ['./start-component.component.css']
})
export class StartComponentComponent implements OnInit {

  @Input()
  playerName: String;

  @Input()
  numQuestions: Number;

  @Input()
  questionTimer: Number;

  opponents: Array<object>;
  saveObject: Object;
  gameInProgress: Boolean;
  player: Object;

  constructor(
    private router: Router
    ) {
    this.playerName = "";
    this.opponents = [{name: "", level: 1, score: 0}]
    this.numQuestions = 10
    this.questionTimer = 30
    this.gameInProgress = false
  }

  ngOnInit(): void {
  }

  enoughOpponents() {
    return this.opponents.length < 6;
  }

  removeOpponent(i:Number) {
    this.opponents = this.opponents.filter((opponent, index) => index !== i)
  }

  addOpponent() {
    this.opponents.push({name: "", level: 1, score: 0})
  }

  startGame() {
    let saveObject = {}
    let player = {}
    player["name"] = this.playerName;
    player["score"] = 0;
    saveObject["gameInProgress"] = true;
    saveObject["numQuestions"] = this.numQuestions;
    saveObject["currQuestionNum"] = 1;
    saveObject["player"] = player;
    saveObject["opponents"] = this.opponents;
    saveObject["countdownTimerLimit"] = this.questionTimer;
    window.localStorage.setItem("triviopardy_savestate", JSON.stringify(saveObject))

    this.router.navigate(["play"])
  }

}
