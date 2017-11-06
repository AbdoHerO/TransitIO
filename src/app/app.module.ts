import { MapviewPage } from './../pages/mapview/mapview';

import { GOOGLE_MAP_API_KEY } from './google_api_key.const';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from './../pages/details/details';
import { TransportServiceProvider } from '../providers/transport-service/transport-service';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    MapviewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    MapviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TransportServiceProvider, 
    Geolocation,
    NativeGeocoder
  ]
})
export class AppModule {}
