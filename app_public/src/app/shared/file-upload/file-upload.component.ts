import { Component, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  imgUrl:any = 'url(../../../assets/imagenes/squares1.jpg)';
  selectedFile:File;
  constructor() { }

  ngOnInit(): void {
  }

  public onFileSelected(event){
    if(event.target.files && event.target.files[0]){
      this.selectedFile = event.target.files[0];
      let fileReader = new FileReader();
      
      fileReader.onload = () => {
        this.imgUrl = 'url(' + fileReader.result as string + ')';
        
      }
      fileReader.readAsDataURL(this.selectedFile);
    }

  }

  public getSelectedFile():File{
    return this.selectedFile;
  }
}
