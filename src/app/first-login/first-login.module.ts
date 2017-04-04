import { FirstLoginRoutingModule } from './first-login-routing.module';
import { FirstLoginComponent } from './first-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, FormsModule, FirstLoginRoutingModule],
  declarations: [FirstLoginComponent],
  exports: [FirstLoginComponent]
})
export class FirstLoginModule { }
