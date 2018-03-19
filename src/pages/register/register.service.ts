import { Api } from '../../providers/api/api';
import { Injectable } from '@angular/core';
import { Register } from './register.model';

@Injectable()
export class RegisterService {

    constructor(
        private api: Api
    ) {
    }

    register(model: Register) {
        return this.api.post(Register, 'register', {
            name: model.name,
            email: model.email,
            password: model.password,
            password_confirmation: model.passwordConfirmation
        });
    }
}