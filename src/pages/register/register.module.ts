import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { ComponentsModule } from '../../components/components.module';
import { RegisterService } from './register.service';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RegisterPage),
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterPageModule { }
