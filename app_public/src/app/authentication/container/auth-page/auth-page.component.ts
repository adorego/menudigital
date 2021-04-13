import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { AuthFacade } from '../../services/authFacade.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit, OnDestroy {

    subscriptionLoginDialog:Subscription;
    subscriptionRegisterDialog:Subscription;
    dialogRegisterRef:MatDialogRef<RegisterComponent>;
    dialogLoginRef:MatDialogRef<LoginComponent>;
    userState$:Observable<User>;
    userStateSubscription:Subscription;
    constructor(public dialog: MatDialog, private authFacade: AuthFacade) { }
    

    public registrarme(){
        this.dialogRegisterRef = this.dialog.open(RegisterComponent, this.createMatDialogConfig());
        this.subscriptionRegisterDialog = this.dialogRegisterRef.componentInstance.sendSignForm.subscribe(
          (formData:any) => {
            //console.log('Datos del login:', formData);
            this.authFacade.register(formData);

            
          }
        );
        
      
      }

    public login(){
        //console.log('AuthPage Login');
        
        this.dialogLoginRef = this.dialog.open(LoginComponent, this.createMatDialogConfig());
        this.subscriptionLoginDialog = this.dialogLoginRef.componentInstance.sendLoginForm.subscribe(
          (formData:any) => {
            //console.log('Datos del login:', formData);
            this.authFacade.login(formData);

            
          }
        );
        
      }

    private createMatDialogConfig():MatDialogConfig{
        const dialogConfig = new MatDialogConfig();
        dialogConfig.position ={
          'top': '20px',
          'left': '10px'
        };
        dialogConfig.width = '320px';
        dialogConfig.height = '460px';
        dialogConfig.minWidth = '300px';
        dialogConfig.minHeight = '300px';
        dialogConfig.panelClass = "my-dialog";
        return dialogConfig;
      }

      
  
  

    ngOnInit(): void {
        this.userState$ = this.authFacade.getUserState();
        this.userStateSubscription = this.userState$.subscribe(
          (user) => {
            if(user){
              if(this.dialogLoginRef){
                this.dialogLoginRef.close();
              }
              if(this.dialogRegisterRef){
                this.dialogRegisterRef.close();
              }
            }
          }
        )
      }

    ngOnDestroy(): void {
        if (this.userStateSubscription)
          this.userStateSubscription.unsubscribe();
        if(this.subscriptionLoginDialog)
          this.subscriptionLoginDialog.unsubscribe();
        if(this.subscriptionRegisterDialog)
          this.subscriptionRegisterDialog.unsubscribe();
      }
}
