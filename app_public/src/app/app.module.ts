import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from '../app/core/core.module';
import {AuthenticationModule} from '../app/authentication/authentication.module';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';

registerLocaleData(localePy, 'es');


@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthenticationModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    

  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: LOCALE_ID, useValue: 'es-PY' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
