import { Injectable } from '@angular/core';
import { Api } from '../../providers/api/api';
import { Picture } from './picture.model';

@Injectable()
export class PicturesService {

    constructor(
        private api: Api
    ) {
    }

    getPictres(page: number = 1) {
        return this.api.get<Array<Picture>>(Picture, 'pictures?page=' + page);
    }
}