import { AuthenticationService } from 'ngx-login-client';
import { Navigation } from './../models/navigation';
import { ContextService } from './context.service';
import { Observable, ConnectableObservable, Subject, BehaviorSubject } from 'rxjs';
import { Context, Contexts } from 'ngx-fabric8-wit';
import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  NavigationEnd,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

// TODO HACK
import { OnLogin } from 'fabric8-runtime-console/src/app/shared/onlogin.service';
import { OAuthConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/oauth-config-store';
import { APIsStore } from 'fabric8-runtime-console/src/app/kubernetes/store/apis.store';

@Injectable()
export class RuntimeConsoleResolver implements Resolve<Context> {

  private _lastRoute: string;

  constructor(
    private apiStore: APIsStore,
    private onLogin: OnLogin,
    private oauthConfigStore: OAuthConfigStore,
    private authService: AuthenticationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.apiStore.load();
    return this.apiStore.loading.distinctUntilChanged().filter(flag => (!flag))
      .switchMap(() => this.authService.getOpenShiftToken())
      .switchMap(token =>
        this.oauthConfigStore.resource.do(config => {
          if (config.loaded) {
            this.onLogin.onLogin(token);
          }
        })
      ).first();
  }

}
