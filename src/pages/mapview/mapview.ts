import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

declare var google:any;
@IonicPage()
@Component({
  selector: 'page-mapview',
  templateUrl: 'mapview.html',
})
export class MapviewPage {

  @ViewChild('map') mapRef: ElementRef;

  private location:{lat: number, lon: number} = { lat:33.589886 , lon: -7.603869 };
  selectedPosition:{lat: number, lon: number} = { lat: 0, lon:0 };
  private marker;
  private map;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController) {
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

    var map = new google.maps.Map(this.mapRef.nativeElement, options);

    map.addListener('click', function(e) {
      //if there's no marker on the map add marker
      if(this.marker == null){
        this.marker = new google.maps.Marker({
          position: e.latLng,
          map: map,
          draggable:true
        });
      }
      //set new position to the marker
      else{
        this.marker.setPosition(e.latLng);
      }
      //center map to selected marker
      map.panTo(e.latLng);
      this.selectedPosition = {lon: this.marker.getPosition().lng(), lat: this.marker.getPosition().lat() };
    });

  }

  

  private onConfirm(){
    console.log(this.selectedPosition);
    if(this.selectedPosition.lat == 0 && this.selectedPosition.lon == 0){
      console.error("No selected postion");
    }
    else{
      
    }
  }

  private onBackPressed(){
    
    this.viewCtrl.dismiss({
      selectedPosition: this.selectedPosition
    });

  }
}
