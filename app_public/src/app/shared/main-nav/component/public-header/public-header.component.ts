import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss']
})
export class PublicHeaderComponent implements OnInit {

  isMenuOpened:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

  openMenu(){

  }
}
