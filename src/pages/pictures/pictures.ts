import { Component, HostListener, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, Content } from 'ionic-angular';
import { PicturesService } from './pictures.service';
import { Picture } from './picture.model';
import { UploadPage } from '../upload/upload';
import { environment } from '../../environments/environments';

@IonicPage()
@Component({
  selector: 'page-pictures',
  templateUrl: 'pictures.html',
})
export class PicturesPage {

  @ViewChild(Content) content: Content;

  picturesBaseUrl = environment.mediaEndpoint;
  pictures: Picture[] = [];
  tmpPictures: Picture[] = [];
  page = 1;
  isLoading = false;

  constructor(
    private service: PicturesService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {
  }

  ionViewDidEnter() {
    this.pictures = [];
    this.loadPictures();
  }

  upload() {
    this.navCtrl.push(UploadPage);
  }

  loadPictures() {
    this.isLoading = true;
    let loading = this.loadingCtrl.create({ content: 'Loading pictures' });
    loading.present();

    this.service.getPictres(this.page)
      .subscribe((response: Picture[]) => {
        this.tmpPictures = response;
        this.tmpPictures.forEach(p => {
          this.pictures.push(p);
        });
        this.isLoading = false;
        loading.dismiss();
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

  }

  scrollHandler(event) {
    let dim = this.content.getContentDimensions();
    let scrollTop = dim.scrollTop + dim.contentHeight;
    let scrollHeight = dim.scrollHeight;

    if (scrollTop >= scrollHeight && !this.isLoading && this.tmpPictures.length > 0) {
      this.page++;
      this.loadPictures();
    }
  }

}