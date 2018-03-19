import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from './upload.service';
import { Picture } from '../pictures/picture.model';
import { FileUploader } from 'ng2-file-upload';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage implements OnInit {

  uploader: FileUploader;
  uploadForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: UploadService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {
    this.uploader = this.service.uploader;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.uploadForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });
  }

  onFileChange($event) {
    let file = $event.target.files[0];
    this.uploadForm.controls['file'].setValue(file ? file.name : '');
  }

  upload() {
    if (this.uploadForm.invalid) {
      return;
    }

    let loading = this.loadingCtrl.create({ content: 'Uploading' });
    loading.present();
    this.service.uploader.onCompleteAll = () => {
      loading.dismiss();
      this.navCtrl.pop();
    };

    let model = this.uploadForm.value;
    let picture = new Picture();
    picture.title = model.title;
    picture.description = model.description;
    this.service.upload(picture);
  }

}
