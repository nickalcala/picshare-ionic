import { Api } from '../../providers/api/api';
import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { Storage } from '@ionic/storage';
import { Auth } from '../../providers/auth/auth';

@Injectable()
export class LoginService {

    constructor(
        private storage: Storage,
        private api: Api,
        private auth: Auth,
    ) {
    }

    login(email: string, password: string) {
        return this.api.post<Login>(Login, 'login', {
            email: email,
            password: password
        }).map((response: Login) => {
            this.storage.set('token', response.token).then(token => {
            });
            this.auth.token = response.token;
            return response;
        });
    }

}