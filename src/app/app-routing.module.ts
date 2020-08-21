import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NavComponent } from './basic-layout/nav/nav.component';
import { MainComponent } from './modules/main/main.component';
import { ReportSiteStateComponent } from './modules/dashboard/Reports/CCO/ReportSiteState/ReportSiteState.component';
import { ReportMessagesComponent } from './modules/dashboard/Reports/Onlim/ReportMessages/ReportMessages.component';
import { ReportConversationsComponent } from './modules/dashboard/Reports/Onlim/ReportConversations/ReportConversations.component';
import { ReportIntentsUsageComponent } from './modules/dashboard/Reports/Onlim/ReportIntents/ReportIntentsUsage/ReportIntentsUsage.component';
import { ReportIntentsComponent } from './modules/dashboard/Reports/Onlim/ReportIntents/ReportIntents.component';


const routes: Routes = [{
  path: '',
  component: MainComponent

},
{
  path: 'CCO/Report1',
  component: ReportSiteStateComponent


},
{
  path: 'Onlim/Report1',
  component: ReportMessagesComponent
},
{
  path: 'Onlim/Report2',
  component: ReportConversationsComponent
},
{
  path: 'Onlim/Report3',
  component: ReportIntentsComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
