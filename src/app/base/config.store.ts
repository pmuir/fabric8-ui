import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ValWrapper } from './val-wrapper';

@Injectable()
export class ConfigStore {

  private _cache: Map<string, Observable<ValWrapper<any>>> = new Map();

  constructor(
    private http: Http
  ) { }

  get<T>(name: string): Observable<ValWrapper<T>> {
    if (this._cache.has(name)) {
      return this._cache
        .get(name);
    } else {
      let res = this.http
        .get(`/_config/${name}.config.json`)
        .map(res => res.json)
        .map(json => ({
          val: (json as any),
          loading: false
        } as ValWrapper<T>));
      this._cache.set(name, res);
      return res;
    }
  }

  clear() {
    this._cache = new Map();
  }
}
