import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { NavService } from './nav/nav.service';
import { TopNavComponent } from './top-nav/top-nav.component';
import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';


@NgModule({
  declarations: [NavComponent,DashboardComponent,MenuListItemComponent,TopNavComponent],
  exports:[NavComponent,DashboardComponent,TopNavComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatMenuModule,
    RouterModule
  ],
  bootstrap: [NavComponent],
  providers: [NavService]
})
export class BasicLayoutModule { }
