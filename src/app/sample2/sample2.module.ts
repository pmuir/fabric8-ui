import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { Sample2Component }   from './sample2.component';
import { Sample2RoutingModule }   from './sample2-routing.module';

@NgModule({
  imports:      [ CommonModule, Sample2RoutingModule, HttpModule ],
  declarations: [ Sample2Component ]
})
export class Sample2Module {
  constructor(http: Http) {}
}
