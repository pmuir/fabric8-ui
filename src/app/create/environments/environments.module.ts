import { UserMgmtService } from './wrappers/usermgmt.service';
import { DeploymentsService } from './wrappers/deployments.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { ToolbarModule, ToolbarConfig, TreeListModule } from 'ngx-widgets';
import {
  ComponentLoaderFactory,
  DropdownConfig,
  DropdownModule,
  PositioningService,
  TooltipConfig
} from 'ng2-bootstrap';

import { TreeModule } from 'angular2-tree-component';

import { EnvironmentsComponent } from './environments.component';
import { EnvironmentsRoutingModule } from './environments-routing.module';
import { SwitchableNamespaceScope } from './switchable-namepsace.scope';

import { PipelineModule } from 'fabric8-runtime-console';

// TODO HACK These should all be exported by the modules
import { RestangularModule } from 'ng2-restangular';
import { KubernetesRestangularModule } from 'fabric8-runtime-console/src/app/kubernetes/service/kubernetes.restangular';
import { LoginService } from 'fabric8-runtime-console/src/app/shared/login.service';
import { OnLogin } from 'fabric8-runtime-console/src/app/shared/onlogin.service';
import { OAuthConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/oauth-config-store';
import { BuildConfigService } from 'fabric8-runtime-console/src/app/kubernetes/service/buildconfig.service';
import { DevNamespaceScope } from 'fabric8-runtime-console/src/app/kubernetes/service/devnamespace.scope';
import { BuildService } from 'fabric8-runtime-console/src/app/kubernetes/service/build.service';
import { APIsStore } from 'fabric8-runtime-console/src/app/kubernetes/store/apis.store';
import { BuildConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/buildconfig.store';
import { BuildStore } from 'fabric8-runtime-console/src/app/kubernetes/store/build.store';
import { CompositeDeploymentStore } from 'fabric8-runtime-console/src/app/kubernetes/store/compositedeployment.store';
import { ServiceStore } from 'fabric8-runtime-console/src/app/kubernetes/store/service.store';
import { DeploymentStore } from 'fabric8-runtime-console/src/app/kubernetes/store/deployment.store';
import { DeploymentService } from 'fabric8-runtime-console/src/app/kubernetes/service/deployment.service';
import { NamespaceScope } from 'fabric8-runtime-console/src/app/kubernetes/service/namespace.scope';
import { DeploymentConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/deploymentconfig.store';
import { DeploymentConfigService } from 'fabric8-runtime-console/src/app/kubernetes/service/deploymentconfig.service';
import { ServiceService } from   'fabric8-runtime-console/src/app/kubernetes/service/service.service';
import { DeploymentModule } from 'fabric8-runtime-console/src/app/kubernetes/ui/deployment/deployment.module';


@NgModule({
  imports: [CommonModule,
    EnvironmentsRoutingModule,
    RestangularModule,
    KubernetesRestangularModule,
    HttpModule,
    PipelineModule,
    ToolbarModule,
    DropdownModule,
    TreeListModule,
    TreeModule,
    DeploymentModule],
  declarations: [EnvironmentsComponent],
  providers: [
    ComponentLoaderFactory,
    DropdownConfig,
    PositioningService,
    TooltipConfig,

    // TODO HACK These are my wrapper providers to try to contain the hacks ;-)
    DeploymentsService,
    UserMgmtService,

    // TODO HACK These are providers that need reorging in fabric8-runtime
    LoginService,
    OnLogin,
    OAuthConfigStore,
    BuildConfigService,
    APIsStore,
    BuildConfigStore,
    BuildStore,
    BuildService,
    CompositeDeploymentStore,
    ServiceStore,
    DeploymentStore,
    DeploymentService,
    DeploymentConfigStore,
    DeploymentConfigService,
    ServiceService,

    // TODO HACK These are the overrides for the namespace management
    SwitchableNamespaceScope,
    // Hack in our own namespace scope manager
    {
      provide: DevNamespaceScope,
      useExisting: SwitchableNamespaceScope
    },
    {
      provide: NamespaceScope,
      useExisting: SwitchableNamespaceScope
    }
  ]
})
export class EnvironmentsModule {
  constructor(http: Http) { }
}
