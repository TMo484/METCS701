import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.css']
})
export class Part2Component implements OnInit {

  // declare some variables as inputs and give them a type
  @Input('phrase')
  phrase: String;

  @Input('delimiter')
  delimiter: String;

  // set some defaults for the inputs
  constructor() {
    this.phrase = "Angular is Awesome"
    this.delimiter = "#"
  }

  ngOnInit(): void {
  }

}
