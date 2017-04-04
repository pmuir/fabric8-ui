import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstLoginComponent } from './first-login.component';

const routes: Routes = [
  {
    path: '',
    component: FirstLoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstLoginRoutingModule { }
