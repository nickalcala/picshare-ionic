import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth/auth';
import { PicturesPage } from '../pictures/pictures';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  isAuthenticated = false;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private auth: Auth
  ) {
    this.auth.onSignIn.subscribe(() => {
      this.isAuthenticated = true;
    });
    this.auth.onSignOut.subscribe(() => {
      this.isAuthenticated = false;
    });
  }

  ngOnInit() {
    this.storage.get('token').then(token => {
      if (token) {
        this.isAuthenticated = true;
        this.auth.token = token;
        this.viewPhotos();
      }
    });
  }

  viewPhotos() {
    this.navCtrl.push(PicturesPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}