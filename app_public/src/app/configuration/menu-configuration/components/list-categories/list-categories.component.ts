import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaMenu } from 'src/app/core/models/categoria-menu.model';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  @Input() todasCategorias$:Observable<CategoriaMenu[]>;


  constructor() { }

  ngOnInit(): void {
  }

  public onNoClick(){

  }
}
