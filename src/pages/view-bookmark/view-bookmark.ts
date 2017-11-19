import { Bookmark } from './../../models/bookmark.interface';
import { DetailsPage } from './../details/details';
import { TransitData, Location } from './../../models/transitdata.interface';
import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import polyline  from '@mapbox/polyline';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-view-bookmark',
  templateUrl: 'view-bookmark.html',
})
export class ViewBookmarkPage {

  @ViewChild('bookmarkMap') mapRef: ElementRef;

  private bookmark: Bookmark;
  private polylinePoints: Location[] = [];
  private map;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.bookmark = this.navParams.get('bookmark');
  }

  private toViewDetails(step){
    this.modalCtrl.create(DetailsPage, {
      details: step
    }).present();
  }

  ionViewDidEnter(){
    this.showMap();
  }

  private showMap(){
    
    var startLocation = new google.maps.LatLng(
      this.bookmark.data.routes[0].legs[0].start_location.lat,
      this.bookmark.data.routes[0].legs[0].start_location.lng
    );
    var endLocation = new google.maps.LatLng(
      this.bookmark.data.routes[0].legs[0].end_location.lat,
      this.bookmark.data.routes[0].legs[0].end_location.lng
    );

    const options = {
      center: endLocation,
      zoom: 12,
      streetViewControl: false,
      disableDefaultUI: true,
      zoomControl: false,
      draggable: false
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    var startMarker = new google.maps.Marker({
      position: startLocation,
      map: this.map,
      draggable: false,
      label: "A"
    });

    var endMarker = new google.maps.Marker({
      position: endLocation,
      map: this.map,
      draggable: false,
      label:"B"
    });

    let polylineArray = polyline.decode(this.bookmark.data.routes[0].overview_polyline.points);
  
    for(let i = 0; i < polylineArray.length; i++){
      this.polylinePoints.push({lat: polylineArray[i][0], lng: polylineArray[i][1]});
    }

    var path = new google.maps.Polyline({
      path: this.polylinePoints,
      strokeColor: '#3f51b5',
      strokeOpacity: 0.8,
      strokeWeight: 5,
      map: this.map
    });
  }

}
