import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { Main2Component } from './main2/main2.component';


@NgModule({
  declarations: [Main2Component],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
