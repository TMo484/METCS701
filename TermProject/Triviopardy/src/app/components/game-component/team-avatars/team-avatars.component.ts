import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-avatars',
  templateUrl: './team-avatars.component.html',
  styleUrls: ['./team-avatars.component.css']
})
export class TeamAvatarsComponent implements OnInit {

  @Input() player: Object;
  @Input() opponents: Array<Object>;

  players: Array<Object>;

  constructor() {
  }

  getPlayers() {
    let players = [...this.opponents]
    players.push(this.player)
    return players
  }

  ngOnInit(): void {
  }

}
