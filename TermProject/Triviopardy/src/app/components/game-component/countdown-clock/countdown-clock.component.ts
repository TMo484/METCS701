import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css']
})
export class CountdownClockComponent implements OnInit {

  @Input() countdownTimer: Number;

  constructor() { }

  ngOnInit(): void {
  }

}
