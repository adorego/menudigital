import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponent} from './header/container/header.component';
import {UserMenuComponent} from './header/components/user-menu/user-menu.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {LayoutComponent} from './layout/layout.component';
import {RouterModule} from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {AlertDialogComponent} from './alert-dialog/alert-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {NgxCurrencyModule, CurrencyMaskInputMode} from 'ngx-currency';
import { GuaraniCurrencyPipe } from './pipes/guarani-currency.pipe';
import { ExpansionHelperComponent } from './expansion-helper/expansion-helper.component';



export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  allowZero: false,
  decimal: ",",
  precision: 0,
  prefix: "Gs ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.NATURAL
};





@NgModule({
  declarations: 
  [
    HeaderComponent, 
    UserMenuComponent, 
    SidebarComponent, 
    LayoutComponent,
    AlertDialogComponent,
    GuaraniCurrencyPipe,
    ExpansionHelperComponent
    
  ],
  imports: 
  [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,//Module FlexLayout
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig), //Modulo para manejo de input de dinero
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatRadioModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule
    


  ],
  exports:
  [
    CommonModule,
    LayoutComponent,
    NgxCurrencyModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatRadioModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    GuaraniCurrencyPipe,
    ExpansionHelperComponent
    
    

  ]
})
export class SharedModule { }
