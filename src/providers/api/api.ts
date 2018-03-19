import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

interface IApiResponse {
  headers?: HttpHeaders | { [header: string]: string | string[] },
  observe?: 'body',
  params?: HttpParams | { [param: string]: string | string[] },
  reportProgress?: boolean,
  responseType?: 'json',
  withCredentials?: boolean,
}

interface IEntity<T> {
  new(...args: any[]): T;
}

@Injectable()
export class Api {

  url: string = environment.apiEndpoint;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
  }

  private initHeaders(reqOpts?: IApiResponse) {
    return this.storage.get('token').then(token => {
      if (token) {
        if (!reqOpts) {
          reqOpts = { headers: {} };
        }
        reqOpts.headers['Authorization'] = 'Bearer ' + this.storage.get('token');
      }
      return reqOpts;
    });
  }

  get<T>(type, endpoint: string, params?: any, reqOpts?: IApiResponse) {

    this.initHeaders(reqOpts).then(options => {
      reqOpts = options;
    });

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get<T>(this.url + '/' + endpoint, reqOpts)
      .map((response: T) => {
        return this._unserialize(type, response);
      });
  }

  post<T>(type, endpoint: string, body: any, reqOpts?: IApiResponse) {

    this.initHeaders(reqOpts).then(options => {
      reqOpts = options;
    });

    return this.http.post<T>(this.url + '/' + endpoint, body, reqOpts)
      .map((response: T) => {
        return this._unserialize(type, response);
      });
  }

  put<T>(type, endpoint: string, body: any, reqOpts?: IApiResponse) {

    this.initHeaders(reqOpts).then(options => {
      reqOpts = options;
    });

    return this.http.put<T>(this.url + '/' + endpoint, body, reqOpts)
      .map((response: T) => {
        return this._unserialize(type, response);
      });
  }

  delete<T>(type, endpoint: string, reqOpts?: IApiResponse) {

    this.initHeaders(reqOpts).then(options => {
      reqOpts = options;
    });

    return this.http.delete<T>(this.url + '/' + endpoint, reqOpts)
      .map((response: T) => {
        return this._unserialize(type, response);
      });
  }

  patch<T>(type, endpoint: string, body: any, reqOpts?: IApiResponse) {

    this.initHeaders(reqOpts).then(options => {
      reqOpts = options;
    });

    return this.http.patch<T>(this.url + '/' + endpoint, body, reqOpts)
      .map((response: T) => {
        return this._unserialize(type, response);
      });
  }

  private _unserialize<T>(type: IEntity<T>, response: any) {

    if (Array.isArray(response.data)) {

      let entities = [];

      response.data.forEach(item => {

        let entity = this._instantiate(type);

        if (entity.constructor.prototype.hasOwnProperty('_jsonUnserializeMeta')) {
          entity.constructor.prototype._jsonUnserializeMeta.forEach(property => {
            entity[property.prop] = item[property.jsonProp];
          });
        }

        entities.push(entity);
      });

      return entities;
    }

    let entity = this._instantiate(type);
    if (entity.constructor.prototype.hasOwnProperty('_jsonUnserializeMeta')) {
      entity.constructor.prototype._jsonUnserializeMeta.forEach(property => {
        entity[property.prop] = response[property.jsonProp];
      });
    }

    return entity;
  }

  private _instantiate<T>(type: IEntity<T>): T {
    return new type();
  }

}