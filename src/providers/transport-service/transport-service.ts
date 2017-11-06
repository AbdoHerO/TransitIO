import { GOOGLE_API_KEY } from './../../app/google_api.key';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TransportServiceProvider {
  private BASE_URL: string = "https://maps.googleapis.com/maps/api/directions/json?mode=transit&transit_mode=bus&key=" + GOOGLE_API_KEY;
  constructor(public http: Http) {}
  public getBusData(fromDestination: string, toDestination: string):any{
    return this.http.get(this.BASE_URL + "&origin=" + fromDestination + "&destination=" + toDestination).map(
      response => {
        return response.json();
      }
    );
  }
}
