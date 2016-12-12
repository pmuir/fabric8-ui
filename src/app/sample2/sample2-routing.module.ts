import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Sample2Component } from './sample2.component';

console.log('`Sample2` bundle loaded');

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sample2',
    pathMatch: 'full'
  },
  {
    path: 'sample2',
    component: Sample2Component
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class Sample2RoutingModule {}
