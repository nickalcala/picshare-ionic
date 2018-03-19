import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { LoginPage } from './login';
import { LoginService } from './login.service';
import { Api } from '../../providers/api/api';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [
    Api,
    LoginService,
  ]
})
export class LoginPageModule { }
