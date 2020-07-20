import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FileUploadComponent } from './fileUpload/fileUpload.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DndDirective } from './fileUpload/dnd.directive';
import { ProgressComponent } from './fileUpload/progress/progress.component';



@NgModule({
  declarations: [MainComponent, FileUploadComponent, DndDirective,ProgressComponent],
  exports:[MainComponent, FileUploadComponent, ProgressComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule
  ]
})
export class MainModule { }