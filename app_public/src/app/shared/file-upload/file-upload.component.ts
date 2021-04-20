import { Component, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  imgUrl:any;
  selectedFile:File;
  constructor() { }

  ngOnInit(): void {
  }

  public onFileSelected(event){
    if(event.target.files && event.target.files[0]){
      this.selectedFile = event.target.files[0];
      let file:File = event.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.file[0]);
      fileReader.onload = (event) => {
        this.imgUrl = event.target.result;
      }
    }

  }

  public getSelectedFile():File{
    return this.selectedFile;
  }
}
