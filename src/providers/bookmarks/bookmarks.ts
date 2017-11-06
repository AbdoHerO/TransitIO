import { TransitData } from './../../models/transitdata.interface';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class BookmarksProvider {

  bookmarks: TransitData[] = [];

  constructor(private storage: Storage) {
    
  }

  public getBookmarks():any{
    return this.storage.get('Bookmarks').then(
      result => {
        this.bookmarks = result == null || result.length == 0 ? []: result;
        return this.bookmarks;
      }
    );
  }

  public addBookmark(bookmark:TransitData):void{
    this.bookmarks.push(bookmark);
    this.storage.set('Bookmarks', this.bookmarks);
  }

  public removeBookmark(bookmark: any):void{
    let index: number = this.bookmarks.indexOf(bookmark);
    if (index !== -1) {
      this.bookmarks.splice(index, 1);
    }
    this.storage.set('Bookmarks', this.bookmarks).then(
      log => console.log("Bookmark removed")
    );
  }


}
