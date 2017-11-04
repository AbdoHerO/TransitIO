import { MapviewPage } from './../mapview/mapview';
import { DetailsPage } from './../details/details';
import { Geolocation } from '@ionic-native/geolocation';
import { Place } from './../../models/place.model';

import { REGIONS } from './../../app/regions.array';
import { TransportServiceProvider } from './../../providers/transport-service/transport-service';
import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private transitData: any;
  private steps: any[] = [];
  //private regions: string[] = REGIONS;
  private destination: {from: string, to:string} = { from: "", to: ""};

  private location: {lat: number, lon: number} = { lon:33.5731,lat:7.5898 };

  private place: Place = {title:"title", location: this.location};

  constructor(public navCtrl: NavController,private navParams: NavParams, private transportService: TransportServiceProvider,
  private geolocation: Geolocation,
  private loadingCtrl: LoadingController,
  private modalCtrl: ModalController,
  private alertCtrl: AlertController) {

  }

  ionViewWillEnter(){
    
  }

  private getPosition(){
    this.geolocation.getCurrentPosition().then(
      location => {
        this.location.lat = location.coords.latitude;
        this.location.lon = location.coords.longitude;
        console.log(this.place);
      }
    ).catch(
      error =>{
       console.error("Error getting location");
      }
    );

  }

  private getData(fromDestination, toDestination){
    //get current position
    this.getPosition();

    const loading = this.loadingCtrl.create({
      content: "Loading transit information"
    });

    loading.present();

    this.transportService.getBusData(fromDestination, toDestination).subscribe(
      result => {
        console.info(result);
        if(result.status == "OK"){
          this.transitData = result;
          this.steps = this.transitData.routes[0].legs[0].steps
          console.log(this.steps);
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

  private toViewDetails(step: any){
    this.modalCtrl.create(DetailsPage, {
      details: step
    }).present();
  }

  private search(){

    if(this.destination.from == "" || this.destination.to == ""){
      this.alertCtrl.create({
        title: "Missing information",
        message: "Please select a destination",
        buttons:[
          {
            text:"Back",
            role:"cancel"
          }
        ]
      }).present();
    }
    else{
      console.log(this.destination);
      this.getData(this.destination.from, this.destination.to);
    }
  }

  private selectOnMap(){

    let selectOnMapModal = this.modalCtrl.create(MapviewPage);
    selectOnMapModal.onDidDismiss(selectedPosition => {
      console.log(selectedPosition);
    });
    selectOnMapModal.present();
  }

}
