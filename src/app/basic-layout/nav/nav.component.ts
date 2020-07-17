import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}


  selectedFile: File;


  fileChange(file) {
    this.selectedFile = file.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
    console.log(JSON.parse(fileReader.result as string));
    let jsonFile = fileReader.result as String;
    localStorage.removeItem("testKey");
    window.sessionStorage.setItem("testKey", JSON.stringify(jsonFile));



    }
    fileReader.onerror = (error) => {
    console.log(error);
   }

  }


  }

