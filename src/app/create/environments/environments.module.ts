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

import {
  KubernetesRestangularModule,
  NamespaceScope,
  DeploymentModule,
  DevNamespaceScope
} from 'fabric8-runtime-console';
import { RestangularModule } from 'ng2-restangular';

import { SwitchableNamespaceScope } from './../runtime-console/switchable-namepsace.scope';
import { runtimeConsoleImports } from './../runtime-console/runtime-console';
import { EnvironmentsComponent } from './environments.component';
import { EnvironmentsRoutingModule } from './environments-routing.module';


@NgModule({
  imports: [
    CommonModule,
    EnvironmentsRoutingModule,
    HttpModule,
    ToolbarModule,
    DropdownModule,
    TreeListModule,
    TreeModule,
    DeploymentModule,
    runtimeConsoleImports
  ],
  declarations: [EnvironmentsComponent],
  providers: [
    ComponentLoaderFactory,
    DropdownConfig,
    PositioningService,
    TooltipConfig,
    SwitchableNamespaceScope,
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
