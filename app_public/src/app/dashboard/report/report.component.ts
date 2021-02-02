import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarLink } from 'src/app/core/models/sidebarlink';
import { DashBoardFacade } from '../services/dasboard.facade';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  constructor(private dashBoardFacade: DashBoardFacade) { }

  ngOnInit(): void {
  }

  public getSideBarLinks():Observable<SidebarLink[]>{
    return this.dashBoardFacade.getSidebarLinks();
  }
  
}
