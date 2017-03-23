import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { ToolbarModule, ToolbarConfig } from 'ngx-widgets';
import {
  ComponentLoaderFactory,
  DropdownConfig,
  DropdownModule,
  PositioningService,
  TooltipConfig
} from 'ng2-bootstrap';

import {
  PipelineModule
} from 'fabric8-runtime-console';

import { PipelinesComponent } from './pipelines.component';
import { PipelinesRoutingModule } from './pipelines-routing.module';
import { runtimeConsoleImports } from './../runtime-console/runtime-console';
import { spaceDevNamespaceScopeProvider } from './../runtime-console/space-namespace.scope';
import { runtimeConsoleLoginProviders } from './../runtime-console/runtime-console.resolver';



@NgModule({
  imports: [
    CommonModule,
    PipelinesRoutingModule,
    HttpModule,
    PipelineModule,
    ToolbarModule,
    DropdownModule,
    runtimeConsoleImports
  ],
  declarations: [PipelinesComponent],
  providers: [
    ComponentLoaderFactory,
    DropdownConfig,
    PositioningService,
    TooltipConfig,
    runtimeConsoleLoginProviders,
    spaceDevNamespaceScopeProvider
  ]
})
export class PipelinesModule {
  constructor(http: Http) { }
}
