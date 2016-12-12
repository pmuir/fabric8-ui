import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SampleExtensionComponent } from './sample-extension.component';

console.log('`Sample Extension` bundle loaded');

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sample-extension',
    pathMatch: 'full'
  },
  {
    path: 'sample-extension',
    component: SampleExtensionComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SampleExtensionRoutingModule {}
