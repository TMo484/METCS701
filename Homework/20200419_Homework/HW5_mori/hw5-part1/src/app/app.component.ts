import { Component, Input, OnInit } from '@angular/core';
import { MapquestServiceService } from './mapquest-service.service';
import { debounceTime, distinctUntilChanged, switchMap, distinct} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Input()
  from: String;
  @Input()
  to: String;

  route: any;
  distance: any;
  time: any;
  maneuvers: Array<any>;

  private searchTerms: Subject<Array<String>>;

  constructor(private mapquestService: MapquestServiceService) {
  }

  ngOnInit() {
    this.searchTerms = new Subject<Array<String>>();

    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: Array<String>) => {
        return this.mapquestService.getRoute(term)
      }))
    .subscribe((result:any) => {
      this.route = result
      this.distance = result.route.distance
      this.time = result.route.formattedTime
      this.maneuvers = result.route.legs[0].maneuvers
    })

    this.searchTerms.next(["Boston, MA", "Cambridge, MA"])
  }

  getDirections(from:String, to:String) {
    this.searchTerms.next([from, to])
  }

  ngOnDestroy() {
    this.searchTerms.unsubscribe()
  }
}
