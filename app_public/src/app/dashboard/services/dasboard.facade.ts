import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {AuthenticationFacade} from '../../authentication/services/authentication.facade';
import { SidebarLink } from '../../core/models/sidebarlink';
import {UserSideBarLinksStateService} from '../../core/state/userSideBarLinks-state.service';

@Injectable()
export class DashBoardFacade{

    constructor(private userSideBarLinksState:UserSideBarLinksStateService){}

    public getSidebarLinks():Observable<SidebarLink[]>{
        return this.userSideBarLinksState.userSideBarLinks$;
    }
}