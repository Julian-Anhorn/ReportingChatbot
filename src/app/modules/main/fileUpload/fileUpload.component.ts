import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../dashboard/Reports/report.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileUpload.component.html',
  styleUrls: ['./fileUpload.component.scss']
})


export class FileUploadComponent{
  files: any[] = [];


  constructor(private reportService:ReportService,    public router: Router
    ){}

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);

  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {

    setTimeout(() => {
      if (index === this.files.length) {

        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {

            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }
  deleteFiles(numberOfFiles:number){

    for(var cnt=0; cnt<numberOfFiles; cnt++){
      console.log("Delete")
    this.reportService.deleteAll(cnt).subscribe();
  }
}

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {

    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }

// ********* Post file to jsonServer **********//
const fileReader = new FileReader();
fileReader.readAsText(this.files[0], "UTF-8");
fileReader.onload = () => {
let jsonFile = fileReader.result as string;
var jsonObject : any = JSON.parse(jsonFile)


    let openItems=[];
    let id=0;
      var keys = Object.keys(jsonObject["data"]);
      for(var i=0; i<keys.length; i++){
        id++;
      let key = keys[i];
      openItems.push({"id":id,"Seite":  jsonObject["data"][key][2],"Status":  jsonObject["data"][key][1], "Aufrufe": jsonObject["data"][key][3], "Abspruenge":  jsonObject["data"][key][4]});
      }


    this.reportService.postData(openItems).subscribe((data: {}) => {
      console.log("****POST***");

    })
  }
  fileReader.onerror = (error) => {
  console.log(error);
  }

  this.uploadFilesSimulator(0);
  }


  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
