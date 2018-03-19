import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { PicturesPage } from '../pictures/pictures';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private service: LoginService
  ) {
  }

  ngOnInit() {
    this._initForm();
  }

  private _initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['user@example.com', [Validators.required, Validators.email]],
      password: ['secret', [Validators.required]]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    let model = this.loginForm.value;

    this.service.login(model.email, model.password)
      .subscribe((response: Login) => {
        this.navCtrl.pop();
        this.navCtrl.push(PicturesPage);
      }, (response) => {
        let toast = this.toastCtrl.create({
          message: response.error.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
  }

}