import { BuildConfigService } from 'fabric8-runtime-console/src/app/kubernetes/service/buildconfig.service';
import { SwitchableNamespaceScope } from './switchable-namepsace.scope';
import { Space, SpaceService } from 'ngx-fabric8-wit';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from 'ngx-login-client';

import { ToolbarConfig, FilterConfig, FilterQuery, FilterEvent, Filter, SortEvent, SortField } from 'ngx-widgets';

// TODO HACK
import { OnLogin } from 'fabric8-runtime-console/src/app/shared/onlogin.service';
import { OAuthConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/oauth-config-store';
import {
  BuildConfig, BuildConfigs,
  combineBuildConfigAndBuilds,
  filterEnvironments
} from 'fabric8-runtime-console/src/app/kubernetes/model/buildconfig.model';
import { APIsStore } from 'fabric8-runtime-console/src/app/kubernetes/store/apis.store';
import { BuildConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/buildconfig.store';
import { BuildStore } from 'fabric8-runtime-console/src/app/kubernetes/store/build.store';

class Environment {
  name: string;
  type: EnvironmentType;
  namespaceRef: string;
}

class EnvironmentType {

  public static readonly DEV = { name: 'dev' } as EnvironmentType;
  public static readonly INT = { name: 'int' } as EnvironmentType;
  public static readonly PROD = { name: 'prod' } as EnvironmentType;

  name: string;
}

@Component({
  selector: 'alm-environments',
  templateUrl: 'environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {

  ngOnInit() {

  }

}
