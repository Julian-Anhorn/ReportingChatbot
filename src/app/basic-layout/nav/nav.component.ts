
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {VERSION} from '@angular/material/core';
import {NavItem} from './nav-item';
import {NavService} from './nav.service';
import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']

})
export class NavComponent implements OnInit{

    @ViewChild('sidenav') sidenav: MatSidenav;


    version = VERSION;
    navItems: NavItem[] = [{
      displayName: 'File Upload',
      iconName: 'backup',
      route: '',
      children: []},
      {
        displayName: 'CCO Reports',
        iconName: 'collections_bookmark',
        route: '',
        children: [
          {
            displayName: 'Report1',
            iconName: 'poll',
            route: '/CCO/Report1',
              },  {
              displayName: 'Report2',
              iconName: 'poll',
              route: '/Report2',

            }]},{
        displayName: 'Onlim Reports',
        iconName: 'chat',
        route: '',
        children: [
          {
            displayName: 'Report1',
            iconName: 'assessment',
            route: 'Onlim/Report1',
              },  {
              displayName: 'Report2',
              iconName: 'assessment',
              route: 'Onlim/Report2',

            }]}]




  constructor(private breakpointObserver: BreakpointObserver,private navService: NavService) {}
  ngOnInit(): void {
    this.navService.appDrawer = this.sidenav;
  }
  ngAfterViewInit(): void {
    this.navService.appDrawer = this.sidenav;
  }


  }

