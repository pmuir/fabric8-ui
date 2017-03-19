import { Observable } from 'rxjs';
import { AuthenticationService } from 'ngx-login-client';
import { Injectable } from '@angular/core';

// TODO HACK
import { OnLogin } from 'fabric8-runtime-console/src/app/shared/onlogin.service';
import { OAuthConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/oauth-config-store';
import { APIsStore } from 'fabric8-runtime-console/src/app/kubernetes/store/apis.store';

@Injectable()
export class UserMgmtService {

  constructor(private authService: AuthenticationService,
    private onLogin: OnLogin,
    private oauthConfigStore: OAuthConfigStore,
    private apiStore: APIsStore
    ) { }

  setup(): Observable<any> {
    this.apiStore.load();
    return this.apiStore.loading.distinctUntilChanged().filter(flag => (!flag))
      .switchMap(() => this.authService.getOpenShiftToken())
      .switchMap(token =>
        this.oauthConfigStore.resource.do(config => {
          if (config.loaded) {
            this.onLogin.onLogin(token);
          }
        })
      );
  }

}
