import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MapquestServiceService {

  constructor(private http: HttpClient) { }

  getRoute(route) {
    let apiKey: String = "f75GswhuwuEAvrgXSuGiAwpyEX13Alnv"  //API Keys shouldn't be stored in code, but for ease of use...
    let to: String = route["1"]
    let from: String = route["0"]

    return this.http.get(`http://open.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${from}&to=${to}`)
  }

}
