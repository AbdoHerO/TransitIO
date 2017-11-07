import { ViewBookmarkPage } from './../pages/view-bookmark/view-bookmark';
import { AboutPage } from './../pages/about/about';
import { HistoryPage } from './../pages/history/history';
import { BookmarksPage } from './../pages/bookmarks/bookmarks';
import { MapviewPage } from './../pages/mapview/mapview';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from './../pages/details/details';
import { TransportServiceProvider } from '../providers/transport-service/transport-service';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder'
import { BookmarksProvider } from '../providers/bookmarks/bookmarks';
import { HistoryProvider } from '../providers/history/history';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    MapviewPage,
    BookmarksPage,
    HistoryPage,
    AboutPage,
    ViewBookmarkPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      pageTransition: 'ios-transition'
    }),
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    MapviewPage,
    BookmarksPage,
    HistoryPage,
    AboutPage,
    ViewBookmarkPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TransportServiceProvider, 
    Geolocation,
    NativeGeocoder,
    BookmarksProvider,
    HistoryProvider
  ]
})

export class AppModule {}
