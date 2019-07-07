import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _httpHeaders = new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'});
  private _legacySiteUrl = `http://brillante.rolivencia.xyz/`;
  private _webApiUrl = `${this._legacySiteUrl}api/fix`;

  constructor() { }

  get httpHeaders(): HttpHeaders {
    return this._httpHeaders;
  }

  set httpHeaders(value: HttpHeaders) {
    this._httpHeaders = value;
  }

  get webApiUrl(): string {
    return this._webApiUrl;
  }

  set webApiUrl(value: string) {
    this._webApiUrl = value;
  }

  get legacySiteUrl(): string {
    return this._legacySiteUrl;
  }

  set legacySiteUrl(value: string) {
    this._legacySiteUrl = value;
  }
}
