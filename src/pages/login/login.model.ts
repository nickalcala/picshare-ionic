import { JsonProperty } from '../../providers/decorators/json-property';

export class Login {
    private _id: number;
    private _token: string;
    private _email: string;
    private _name: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    public get id(): number {
        return this._id;
    }

    @JsonProperty()
    public set id(value: number) {
        this._id = value;
    }

    public get token(): string {
        return this._token;
    }

    @JsonProperty()
    public set token(value: string) {
        this._token = value;
    }

    public get email(): string {
        return this._email;
    }

    @JsonProperty()
    public set email(value: string) {
        this._email = value;
    }

    public get name(): string {
        return this._name;
    }

    @JsonProperty()
    public set name(value: string) {
        this._name = value;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    @JsonProperty('created_at')
    public set createdAt(value: Date) {
        this._createdAt = value;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }

    @JsonProperty('updated_at')
    public set updatedAt(value: Date) {
        this._updatedAt = value;
    }

}