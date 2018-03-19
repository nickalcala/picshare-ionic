export class Register {
    private _name: string;
    private _email: string;
    private _password: string;
    private _passwordConfirmation: string;

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get passwordConfirmation(): string {
        return this._passwordConfirmation;
    }

    public set passwordConfirmation(value: string) {
        this._passwordConfirmation = value;
    }

}