import { Bookmark } from './../../models/bookmark.interface';
import { ViewBookmarkPage } from './../view-bookmark/view-bookmark';
import { TransitData } from './../../models/transitdata.interface';
import { BookmarksProvider } from './../../providers/bookmarks/bookmarks';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookmarksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookmarks',
  templateUrl: 'bookmarks.html',
})
export class BookmarksPage {

  private bookmarks: Bookmark[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bookmarksProvier: BookmarksProvider) {
  }

  ionViewWillEnter(){
    this.getBookmarks();
  }

  private getBookmarks(){
    this.bookmarksProvier.getBookmarks().then(
      result => {
        this.bookmarks = result;
        console.log(this.bookmarks);
      }
    );
  }

  private viewBookmark(bookmark: Bookmark){
    this.navCtrl.push(ViewBookmarkPage, {
      bookmark: bookmark
    });
  }

}
