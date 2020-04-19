import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-block',
  templateUrl: './question-block.component.html',
  styleUrls: ['./question-block.component.css']
})
export class QuestionBlockComponent {

  @Input() question: String;
  @Input() questionNum: Number;
  @Input() numQuestions: Number;

  constructor() { }

  ngOnInit(): void {
  }
}
