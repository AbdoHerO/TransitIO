import { Bookmark } from './../../models/bookmark.interface';
import { TransitData } from './../../models/transitdata.interface';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class BookmarksProvider {

  bookmarks: Bookmark[] = [];

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

  public addBookmark(bookmark:Bookmark):void{
    this.bookmarks.unshift(bookmark);
    this.storage.set('Bookmarks', this.bookmarks);
  }

  public removeBookmark(bookmark: Bookmark):void{
    let index: number = this.bookmarks.indexOf(bookmark);
    if (index !== -1) {
      this.bookmarks.splice(index, 1);
    }
    this.storage.set('Bookmarks', this.bookmarks).then(
      log => console.log("Bookmark removed")
    );
  }
}
