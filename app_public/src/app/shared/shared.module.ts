import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LayoutComponent} from './layout/layout.component';
import {HeaderComponent} from './header/container/header.component';
import {UserComponent} from './header/components/user/user.component';
import {MatMenuModule} from '@angular/material/menu';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {MainNavComponent} from './main-nav/container/main-nav.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';
import {SafeBase64Pipe} from './pipes/safe-base64.pipe';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {AlertDialogComponent} from './alert-dialog/alert-dialog.component';
import {MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CurrencyPipe} from '@angular/common';
import { PizzaConfigComponent } from './pizza-config/pizza-config.component';
import {PublicHeaderComponent} from './main-nav/component/public-header/public-header.component';




@NgModule({
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    UserComponent, 
    SidebarComponent, 
    MainNavComponent,
    SafeBase64Pipe,
    FileUploadComponent,
    AlertDialogComponent,
    PizzaConfigComponent,
    PublicHeaderComponent
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    FlexLayoutModule,
    MatStepperModule,
    MatRadioModule,
    MatSliderModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialFileInputModule,
    MatAutocompleteModule,
    MatCheckboxModule
   
    

  ],
  exports:[
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    LayoutComponent,
    MainNavComponent,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    SafeBase64Pipe,
    FlexLayoutModule,
    AlertDialogComponent,
    MatStepperModule,
    MatRadioModule,
    MatSliderModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialFileInputModule,
    MatAutocompleteModule,
    MatCheckboxModule
    
   
  ],
  providers:[
    MatDatepickerModule,
    CurrencyPipe
  ]
})
export class SharedModule { }
