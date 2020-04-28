import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guess-block',
  templateUrl: './guess-block.component.html',
  styleUrls: ['./guess-block.component.css']
})
export class GuessBlockComponent implements OnInit {

  currentGuess: String;
  hasGuess: boolean;

  constructor() {
    this.hasGuess = false;
    this.resetDropTarget = this.resetDropTarget.bind(this)
  }

  handleDropEnter() {
    document.getElementById("guessDrop").setAttribute("class", "drop-hover")
  }

  handleDragOver() {
    event.preventDefault()
  }

  handleDrop() {
    event.preventDefault()
    document.getElementById("guess").innerText = window.sessionStorage.getItem("guess_data")
    this.hasGuess = true;
    document.getElementById("guessDrop").setAttribute("class", "has-guess")
  }

  handleDragLeave() {
    if(this.hasGuess) {
      document.getElementById("guessDrop").setAttribute("class", "has-guess")
    } else {
      document.getElementById("guessDrop").setAttribute("class", "no-guess")
    }
  }

  resetDropTarget() {
    this.currentGuess = "Drag Guess Here"
  }

  ngOnInit(): void {
  }

}
