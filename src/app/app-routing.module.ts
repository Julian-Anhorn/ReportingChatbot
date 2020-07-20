import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NavComponent } from './basic-layout/nav/nav.component';
import { MainComponent } from './modules/main/main.component';


const routes: Routes = [{
  path: '',
  component: MainComponent

},
{
  path: 'Report1',
  component: DashboardComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
