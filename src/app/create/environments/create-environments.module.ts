import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { EnvironmentModule } from 'fabric8-runtime-console';


@NgModule({
  imports:      [ CommonModule, HttpModule, EnvironmentModule ]
})
export class CreateEnvironmentsModule {
  constructor(http: Http) {}
}
