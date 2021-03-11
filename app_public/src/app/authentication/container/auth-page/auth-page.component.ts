import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { AuthFacade } from '../../services/authFacade.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor(public dialog: MatDialog, private authFacade: AuthFacade) { }

  registrarme(){
    console.log('AuthPage registrarme');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position ={
      'top': '20px',
      'right': '30px'
    };
    dialogConfig.width = '70%';
    dialogConfig.height = '80%';
    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
    const sub = dialogRef.componentInstance.sendSignForm.subscribe(
      (formData:any) => {
        //console.log('Datos del login:', formData);
        this.authFacade.register(formData);

        
      }
    );
    dialogRef.afterClosed().subscribe(result =>{
      console.log('AuthPageComponent registrarme closed');
    })
    
  }

  login(){
    console.log('AuthPage Login');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position ={
      'top': '20px',
      'right': '20px'
    };
    dialogConfig.width = '40%';
    dialogConfig.height = '60%';
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
    const sub = dialogRef.componentInstance.sendLoginForm.subscribe(
      (formData:any) => {
        //console.log('Datos del login:', formData);
        this.authFacade.login(formData);

        
      }
    );
    dialogRef.afterClosed().subscribe(result =>{
      console.log('AuthPageComponent registrarme closed');
    })
  }
  
  

  ngOnInit(): void {
  }

}
