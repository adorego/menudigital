import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarLink } from 'src/app/core/models/sidebarlink';
import {MainMenuFacade} from '../../services/mainMenu.facade';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-main-menu-list',
  templateUrl: './main-menu-list.component.html',
  styleUrls: ['./main-menu-list.component.scss']
})
export class MainMenuListComponent implements OnInit {

  categorias$:Observable<Category[]>;
  sidebarLinks$:Observable<SidebarLink[]>;

  constructor(private mainMenuFacade:MainMenuFacade) { 
    this.categorias$ = this.mainMenuFacade.getMenuDigital2();
    this.sidebarLinks$ = this.mainMenuFacade.getMenuDigitalSideBar();
  }

  ngOnInit(): void {
    
  }

  personalizacionSelected(event){
    console.log('Objeto enviado:', event);
  }
}
