import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UploadPage } from '../pages/upload/upload';
import { Auth } from '../providers/auth/auth';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {

  @ViewChild('nav') nav: NavController;

  rootPage: any = HomePage;
  uploadPage: any = UploadPage;
  isAuthenticated = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menu: MenuController,
    private auth: Auth,
    private storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.isAuthenticated = this.auth.isAuthenticated();
      this.auth.onSignIn.subscribe(() => {
        this.isAuthenticated = true;
      });
      this.auth.onSignOut.subscribe(() => {
        this.isAuthenticated = false;
      });
    });
  }

  openPage(page) {
    this.nav.push(page);
    this.menu.toggle();
  }

  logout() {
    this.auth.token = '';
    this.storage.clear();
    this.nav.popToRoot();
    this.menu.toggle();
  }
}