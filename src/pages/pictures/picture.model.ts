import { JsonProperty } from "../../providers/decorators/json-property";

export class Picture {
    private _id: number;
    private _userId: number;
    private _title: string;
    private _description: string;
    private _fileName: string;
    private _createdAt: string;
    private _updatedAt: string;

    public get id(): number {
        return this._id;
    }

    @JsonProperty()
    public set id(value: number) {
        this._id = value;
    }

    public get userId(): number {
        return this._userId;
    }

    @JsonProperty('user_id')
    public set userId(value: number) {
        this._userId = value;
    }

    public get title(): string {
        return this._title;
    }

    @JsonProperty()
    public set title(value: string) {
        this._title = value;
    }

    public get description(): string {
        return this._description;
    }

    @JsonProperty('description')
    public set description(value: string) {
        this._description = value;
    }

    public get fileName(): string {
        return this._fileName;
    }

    @JsonProperty('filename')
    public set fileName(value: string) {
        this._fileName = value;
    }

    public get createdAt(): string {
        return this._createdAt;
    }

    @JsonProperty('created_at')
    public set createdAt(value: string) {
        this._createdAt = value;
    }

    public get updatedAt(): string {
        return this._updatedAt;
    }

    @JsonProperty('updated_at')
    public set updatedAt(value: string) {
        this._updatedAt = value;
    }

}