import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormErrorMessageComponent } from './form-error-message/form-error-message';

@NgModule({
	declarations: [FormErrorMessageComponent],
	imports: [
		CommonModule,
		BrowserModule
	],
	exports: [FormErrorMessageComponent]
})
export class ComponentsModule { }
