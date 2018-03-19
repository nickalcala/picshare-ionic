import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterService } from './register.service';
import { Register } from './register.model';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let passwordControl = this.formBuilder.control('', [Validators.required, Validators.minLength(6)]);
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: passwordControl,
      password_confirmation: ['', this.passwordConfirmation(passwordControl)]
    });
  }

  passwordConfirmation(passwordControl: FormControl) {
    return (c: FormControl) => {
      passwordControl.valueChanges.subscribe(() => {
        if (c.dirty) {
          c.updateValueAndValidity();
        }
      });
      if (c.value != passwordControl.value) {
        return {
          passwordConfirmation: {
            valid: false
          }
        };
      }
    };
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    let loading = this.loadingCtrl.create({ content: 'Signing up...' });
    loading.present();

    let form = this.registerForm.value;
    let model = new Register();
    model.name = form.name;
    model.email = form.email;
    model.password = form.password;
    model.passwordConfirmation = form.password_confirmation;

    this.service.register(model)
      .subscribe(response => {
        loading.dismiss();
        this.navCtrl.pop();
      }, response => {
        let keys = Object.keys(response.error.messages);
        let toast = this.toastCtrl.create({
          message: response.error.messages[keys[0]][0],
          duration: 3000,
          position: 'top'
        });
        loading.dismiss();
        toast.present();
      });
  }

}