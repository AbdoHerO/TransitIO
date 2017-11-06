import { Step, Location } from './../../models/transitdata.interface';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import polyline  from '@mapbox/polyline';

//the google variable
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  @ViewChild('detailsMap') mapRef: ElementRef;

  private detail: Step;
  private map;
  private polylinePoints: Location[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController) {
    this.detail = this.navParams.get('details');
    
  }

  showMap(){

    var startLocation = new google.maps.LatLng(this.detail.start_location.lat, this.detail.start_location.lng);
    var endLocation = new google.maps.LatLng(this.detail.end_location.lat, this.detail.end_location.lng);

    const options = {
      center: startLocation,
      zoom: 16,
      streetViewControl: false,
      disableDefaultUI: true,
      zoomControl: false
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    var startMarker = new google.maps.Marker({
      position: startLocation,
      map: this.map,
      dragable: false,
      label: "A"
    });

    var endMarker = new google.maps.Marker({
      position: endLocation,
      map: this.map,
      dragable: false,
      label:"B"
    });

    let polylineArray = polyline.decode(this.detail.polyline.points);
  
    for(let i = 0; i < polylineArray.length; i++){
      this.polylinePoints.push({lat: polylineArray[i][0], lng: polylineArray[i][1]});
    }
    
    console.log(this.polylinePoints);

    var path = new google.maps.Polyline({
      path: this.polylinePoints,
      strokeColor: '#3f51b5',
      strokeOpacity: 0.8,
      strokeWeight: 5,
      map: this.map
    });
 
  }
 
  ionViewDidLoad() {
    console.log(this.detail);
    this.showMap();
  }

  private onBackPressed(){
    this.navCtrl.pop();
  }

}
