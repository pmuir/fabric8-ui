import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { SampleExtensionComponent }   from './sample-extension.component';
import { SampleExtensionRoutingModule }   from './sample-extension-routing.module';

@NgModule({
  imports:      [ CommonModule, SampleExtensionRoutingModule, HttpModule ],
  declarations: [ SampleExtensionComponent ]
})
export class SampleExtensionModule {
  constructor(http: Http) {}
}
