import { Location } from './../../models/location.interface';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';

declare var google:any;
@IonicPage()
@Component({
  selector: 'page-mapview',
  templateUrl: 'mapview.html',
})
export class MapviewPage {

  @ViewChild('map') mapRef: ElementRef;

  private defaultLocation:Location = { lat:33.589886 , lon: -7.603869 };
  private userLocation:Location = { lat: 0 , lon: 0 };
  private selectedPosition:Location = { lat: 0, lon:0 };
  private static marker;
  private map;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.showMap();
    this.getUserPosition();
    MapviewPage.marker = undefined;
  }

  private getUserPosition(){
    const loadingLocation = this.loadingCtrl.create({
      content:"Getting your position..."
    });
    loadingLocation.present();

    this.geolocation.getCurrentPosition().then(
      userPosition => {
        this.userLocation.lat = userPosition.coords.latitude;
        this.userLocation.lon = userPosition.coords.longitude;
        loadingLocation.dismiss();
      }
    ).catch(
      error => {
        this.alertCtrl.create(
          {
            title:"An error accured",
            message:"Error while getting your location, please try again later...",
            buttons: [
              {
                text:"Cancel",
                role:"cancel",
                handler: () =>{
                  console.log("error dismissed");
                }
              },
              {
                text:"Retry",
                handler: () => {
                  this.getUserPosition();
                }
              }
            ]
          }
        ).present;
      }
    );
  }

  private locateMe(){
    const userPosition = new google.maps.LatLng(this.userLocation.lat, this.userLocation.lon);
    this.map.setCenter(userPosition);
    this.map.setZoom(15);
    if(MapviewPage.marker == null){
      MapviewPage.marker = new google.maps.Marker({
        position: userPosition,
        map: this.map,
        draggable:true
      });
    }
    
    else
    MapviewPage.marker.setPosition(userPosition);

    this.selectedPosition = this.userLocation;
  }

  private showMap(){
    const location = new google.maps.LatLng(this.defaultLocation.lat, this.defaultLocation.lon);
    console.log(location);
    //map options

    const options = {
      center: location,
      zoom: 10,
      streetViewControl: false
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.map.addListener('click', function(e) {
      //if there's no marker on the map add marker
      if(MapviewPage.marker == null){
        MapviewPage.marker = new google.maps.Marker({
          position: e.latLng,
          map: this,
          draggable:true
        });
      }
      //set new position to the marker
      else{
        MapviewPage.marker.setPosition(e.latLng);
      }
      //center map to selected marker
      this.panTo(e.latLng);
    });

    console.log(MapviewPage.marker);
  
  }

  private onConfirm(){ 
    if(MapviewPage.marker == undefined){
      console.error("No selected postion");
    }
    else{
      this.selectedPosition = {lat: MapviewPage.marker.getPosition().lat(), lon: MapviewPage.marker.getPosition().lng()};
      console.log(this.selectedPosition);
      this.viewCtrl.dismiss({
        selectedPosition: this.selectedPosition
      });
    }
  }

  private onBackPressed(){
    this.viewCtrl.dismiss();
  }
}
