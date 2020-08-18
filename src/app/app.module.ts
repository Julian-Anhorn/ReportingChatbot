import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from './basic-layout/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MainModule } from './modules/main/main.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TopNavComponent } from './basic-layout/top-nav/top-nav.component';
import { MenuListItemComponent } from './basic-layout/menu-list-item/menu-list-item.component';
import { NavService } from './basic-layout/nav/nav.service';
import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TopNavComponent,
    MenuListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    MainModule,
    FormsModule,
    MatTableModule,
    HighchartsChartModule,
    LayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
        MatSortModule
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
