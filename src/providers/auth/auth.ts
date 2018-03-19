import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Auth {

    private _token: string = '';

    onSignIn: EventEmitter<any> = new EventEmitter();
    onSignOut: EventEmitter<any> = new EventEmitter();

    public get token(): string {
        return this._token;
    }

    public set token(value: string) {
        this._token = value;
        if (value.length > 0) {
            this.onSignIn.emit();
        } else {
            this.onSignOut.emit();
        }
    }

    isAuthenticated() {
        return this.token.length > 0;
    }
}