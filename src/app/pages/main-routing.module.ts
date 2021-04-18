import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Main2Component } from './main2/main2.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main2', component: Main2Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
