import { Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-potential-answers',
  templateUrl: './potential-answers.component.html',
  styleUrls: ['./potential-answers.component.css']
})
export class PotentialAnswersComponent {

  @Input() incorrectAnswers: Array<any>;
  @Input() correctAnswer: any;
  potentialAnswers: Array<any>;

  constructor() {

  }

  jumbleAnswers() {
    let jumbledAnswers = this.incorrectAnswers
    jumbledAnswers.push(this.correctAnswer)
    for(let i=jumbledAnswers.length - 1; i>0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [jumbledAnswers[i], jumbledAnswers[j]] = [jumbledAnswers[j], jumbledAnswers[i]]
    }
    return jumbledAnswers
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.potentialAnswers = this.jumbleAnswers()
  }
}
