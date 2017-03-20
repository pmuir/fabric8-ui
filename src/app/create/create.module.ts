
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { CreateComponent } from './create.component';
import { CreateRoutingModule } from './create-routing.module';

import { CodebasesModule } from './codebases/codebases.module';

// TODO HACK
import { RestangularModule } from 'ng2-restangular';
import { KubernetesRestangularModule } from 'fabric8-runtime-console/src/app/kubernetes/service/kubernetes.restangular';
import { OnLogin } from 'fabric8-runtime-console/src/app/shared/onlogin.service';
import { OAuthConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/oauth-config-store';
import { APIsStore } from 'fabric8-runtime-console/src/app/kubernetes/store/apis.store';
import { LoginService } from 'fabric8-runtime-console/src/app/shared/login.service';
import { RuntimeConsoleResolver } from './runtime-console.resolver';
import { PipelineModule } from 'fabric8-runtime-console';




@NgModule({
  imports: [
    CodebasesModule,
    CommonModule,
    CreateRoutingModule,
    HttpModule,
    RestangularModule,
    KubernetesRestangularModule,
    PipelineModule,
  ],
  declarations: [CreateComponent],
  providers: [
    RuntimeConsoleResolver,
    LoginService,
    OnLogin,
    APIsStore,
    OAuthConfigStore
  ]
})
export class CreateModule {
  constructor(http: Http) { }
}
