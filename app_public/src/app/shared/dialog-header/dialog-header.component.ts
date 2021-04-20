import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent implements OnInit {

  @Input() titulo:string;
  @Input() subtitulo:string;
  constructor() { }

  ngOnInit(): void {
    console.log('DialogHeaderComponent, parametros', this.titulo, this.subtitulo);
  }

}
