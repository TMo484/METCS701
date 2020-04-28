import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-countdown-clock',
  templateUrl: './countdown-clock.component.html',
  styleUrls: ['./countdown-clock.component.css']
})
export class CountdownClockComponent implements OnInit {

  @Input() countdownTimer: number;
  @Input() timerMax: number;
  canvas: any;
  context: any;
  centerX: number;
  centerY: number;


  constructor() { }

  ngOnInit(): void {
  }

  updateCanvas(): void {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
  
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    
    this.context.fillStyle = '#ff0000'
    this.context.lineWidth = 5
    this.context.beginPath()
    this.context.arc(this.centerX, this.centerY, (this.centerX * .95), 0, ((1-(this.countdownTimer/this.timerMax)) * 2 * Math.PI), true)
    this.context.stroke()
    this.context.closePath()
  }

}
