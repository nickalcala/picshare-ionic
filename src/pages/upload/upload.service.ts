import { FileUploader } from 'ng2-file-upload';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Auth } from '../../providers/auth/auth';
import { Picture } from '../pictures/picture.model';

@Injectable()
export class UploadService {

    uploader: FileUploader = new FileUploader({
        url: environment.apiEndpoint + '/pictures',
    });

    constructor(
        private auth: Auth
    ) {
        this.uploader.onAfterAddingFile = (item => {
            item.withCredentials = false;
        });
    }

    upload(picture: Picture) {
        this.uploader.authToken = 'Bearer ' + this.auth.token;
        this.uploader.onBuildItemForm = (file, form) => {
            form.append('title', picture.title);
            form.append('description', picture.description);
        };
        this.uploader.uploadAll();
    }
}