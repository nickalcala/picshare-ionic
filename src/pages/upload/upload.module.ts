import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPage } from './upload';
import { ComponentsModule } from '../../components/components.module';
import { FileUploadModule } from 'ng2-file-upload';
import { UploadService } from './upload.service';

@NgModule({
  declarations: [
    UploadPage,
  ],
  imports: [
    FileUploadModule,
    ComponentsModule,
    IonicPageModule.forChild(UploadPage),
  ],
  providers: [
    UploadService
  ]
})
export class UploadPageModule { }