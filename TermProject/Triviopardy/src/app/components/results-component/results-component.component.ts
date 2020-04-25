import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-component',
  templateUrl: './results-component.component.html',
  styleUrls: ['./results-component.component.css']
})
export class ResultsComponentComponent implements OnInit {

  gameInProgress: boolean;
  player: object;
  opponents: Array<object>;
  playersScores: Array<Number>;

  constructor(
    private router: Router
    ) {
    this.gameInProgress = false;
    this.player = {};
    this.opponents = [];
  }

  ngOnInit(): void {
    let gameData: object = JSON.parse(window.localStorage.getItem("triviopardy_savestate"))
    this.gameInProgress = gameData["gameInProgress"]
    this.player = gameData["player"]
    this.opponents = gameData["opponents"]
  }

  getPlace(): string {
    let playersScores = []
    this.opponents.forEach(opponent => { playersScores.push(opponent["score"]) })
    playersScores.push(this.player["score"])
    playersScores.sort((a,b) => b - a)
    switch(playersScores.indexOf(this.player["score"])) {
      case 0:
        return "1st";
      case 1:
        return "2nd";
      case 2:
        return "3rd";
      default:
        return `${(playersScores.indexOf(this.player["score"]) + 1).toString()}th`
    }
  }

  finishGame(): void {
    this.router.navigate([""])
  }

  checkGameProgress() {
    let saveObject = JSON.parse(window.localStorage.getItem("triviopardy_savestate"))
    if(saveObject) {
      return JSON.parse(window.localStorage.getItem("triviopardy_savestate"))["gameInProgress"]
    } else {
      return false
    }
  }

  resumeGame() {
    this.router.navigate(["play"])
  }

}
