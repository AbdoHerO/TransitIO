import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google:any;
@IonicPage()
@Component({
  selector: 'page-mapview',
  templateUrl: 'mapview.html',
})
export class MapviewPage {

  @ViewChild('map') mapRef: ElementRef;

  private location:{lat: number, lon: number} = { lat:33.589886 , lon: -7.603869 };

  private selectedPosition:{lat: number, lon: number} = { lat: 0 , lon: 0};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.showMap();
  }

  private showMap(){
    const location = new google.maps.LatLng(this.location.lat, this.location.lon);
    console.log(location);
    //map options

    const options = {
      center: location,
      zoom: 10,
      streetViewControl: false
    }

    const map = new google.maps.Map(this.mapRef.nativeElement, options);

    let marker;
    map.addListener('click', function(e) {

      this.selectedPosition = {lat: e.latLng.lat(), lon: e.latLng.lng()};

      console.log(this.selectedPosition);
      //if there's no marker on the map add marker
      if(marker == null){
        marker = new google.maps.Marker({
          title: 'From Location',
          animation: 'DROP',
          position: e.latLng,
          map: map
        });
      }

      //set new position to the marker
      else{
        marker.setPosition(e.latLng);
      }
      
      map.panTo(e.latLng);
    });
  }

}
