import { Component, OnInit } from '@angular/core';
import {AuthenticationFacade} from '../../services/authentication.facade';
import {User} from '../../../core/models/user.model';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  public todayDate: Date = new Date();
  errorMessage: string;
  loginFailed: boolean = false;
  isSuccessFul: boolean = false;
  registerFailed: boolean = false;

  constructor(private authFacade:AuthenticationFacade) { }

  ngOnInit(): void {
    
  }

  public sendLoginForm(user:User): void{
      this.authFacade.login(user).subscribe(
        data => {
          //console.log(data);
          this.isSuccessFul = data;
        },
        err => {
          this.errorMessage = err;
          this.loginFailed = true;
        }
        

      )
  }

  public sendRegisterForm(user:User): void {
    console.log('Before call', user);
    this.authFacade.register(user).subscribe(
      data => {
        //console.log(data);
        this.isSuccessFul = data;
      },
      err => {
        this.errorMessage = err;
        this.registerFailed = true;
      }
    )
  }
}
