import { Component, Input, Host, SkipSelf } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'form-error-message',
  templateUrl: 'form-error-message.html',
  styles: ['./form-error-message.scss']
})
export class FormErrorMessageComponent {

  @Input() controlName: string;
  @Input() errorKey: string;

  constructor(
    @Host() @SkipSelf() private form: FormGroupDirective
  ) {
  }

  get isInvalid() {
    let control = this.form.form.get(this.controlName);
    let isInvalid = control.hasError(this.errorKey) && (control.dirty || this.form.submitted);
    return isInvalid;
  }
}
