import { Step, Location, TransitData } from './../../models/transitdata.interface';
import { MapviewPage } from './../mapview/mapview';
import { DetailsPage } from './../details/details';

import { REGIONS } from './../../app/regions.array';
import { TransportServiceProvider } from './../../providers/transport-service/transport-service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams } from 'ionic-angular';

import polyline  from '@mapbox/polyline';

declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('resultMap') mapRef: ElementRef;

  private transitData: TransitData;
  private steps: Step[] = [];
  private destination: {from: string, to:string} = { from: "", to: ""};
  private polylinePoints: Location[] = [];
  private map;

  constructor(public navCtrl: NavController,private navParams: NavParams, private transportService: TransportServiceProvider,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) 
  {

  }

  ionViewWillEnter(){
    
  }

  private showMap(){
    
    var startLocation = new google.maps.LatLng(
      this.transitData.routes[0].legs[0].start_location.lat,
      this.transitData.routes[0].legs[0].start_location.lng
    );
    var endLocation = new google.maps.LatLng(
      this.transitData.routes[0].legs[0].end_location.lat,
      this.transitData.routes[0].legs[0].end_location.lng
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

    let polylineArray = polyline.decode(this.transitData.routes[0].overview_polyline.points);
  
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


  private getData(fromDestination, toDestination){
    const loading = this.loadingCtrl.create({
      content: "Loading results! Please wait..."
    });
    loading.present();
    this.transportService.getBusData(fromDestination, toDestination).subscribe(
      result => {
        if(result.status == "OK"){
          this.transitData = result;
          this.steps = this.transitData.routes[0].legs[0].steps;
          //wait 100ms then load the showMap function because the map isn't available before and thus can't be loaded
          setTimeout(() =>{
            this.showMap();
          },100);

        }
        else{
          this.alertCtrl.create(
            {
              title:"No information found",
              message:"We couldn't find any information about your destination... :/",
              buttons:[{
                text:"Try again",
                role:"cancel"
              }]
            }
          ).present();
        }
        loading.dismiss();
        
      }
    );
  }

  private toViewDetails(step: Step){
    this.modalCtrl.create(DetailsPage, {
      details: step
    }).present();
  }

  private search(){
    if(this.destination.from == "" || this.destination.to == ""){
      this.alertCtrl.create({
        title: "Missing information",
        message: "Please select a destination!",
        buttons:[
          {
            text:"Back",
            role:"cancel"
          }
        ]
      }).present();
    }
    else{
      this.getData(this.destination.from, this.destination.to);
    }
  }

  private fromSelectOnMap(){
    let selectOnMapModal = this.modalCtrl.create(MapviewPage);
    selectOnMapModal.onDidDismiss(data => {
      if(data != undefined){
        this.destination.from = data.selectedPosition.lat + ", " + data.selectedPosition.lng;
      }
    });
    selectOnMapModal.present();
  }

  private toSelectOnMap(){
    let selectOnMapModal = this.modalCtrl.create(MapviewPage);
    selectOnMapModal.onDidDismiss(data => {
      if(data != undefined){
        this.destination.to = data.selectedPosition.lat + ", " + data.selectedPosition.lng;
      }
    });
    selectOnMapModal.present();
  }

}
