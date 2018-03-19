import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PicturesPage } from './pictures';
import { PicturesService } from './pictures.service';

@NgModule({
  declarations: [
    PicturesPage,
  ],
  imports: [
    IonicPageModule.forChild(PicturesPage),
  ],
  providers: [
    PicturesService
  ]
})
export class PicturesPageModule { }
