import { Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from '../nav/nav.service';
import { Observable } from 'rxjs';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  @ViewChild('app-nav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(public navService: NavService,private breakpointObserver: BreakpointObserver,) { }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
            .pipe(
              map(result => result.matches),
              shareReplay()
            );



  ngOnInit() {

  }

}
