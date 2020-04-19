import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-answer-block',
  templateUrl: './answer-block.component.html',
  styleUrls: ['./answer-block.component.css']
})
export class AnswerBlockComponent implements OnInit {

  @Input() answer: any;

  constructor() {
  }

  handleDragStart() {
    window.sessionStorage.setItem("guess_data", this.answer)
  }

  handleDragEnd() {
    window.sessionStorage.removeItem("guess_data")
  }

  ngOnInit(): void {
  }

}
