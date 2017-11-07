import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewBookmarkPage } from './view-bookmark';

@NgModule({
  declarations: [
    ViewBookmarkPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewBookmarkPage),
  ],
})
export class ViewBookmarkPageModule {}
