import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilComponent } from './profil/profil.component';
import { TeamComponent } from './team/team.component';
import { HttpClientModule } from '@angular/common/http';
import { AddRideComponent } from './add-ride/add-ride.component';
import { InfoRideComponent } from './info-ride/info-ride.component';
import { RideComponent } from './ride/ride.component';
import { UpdateRideComponent } from './update-ride/update-ride.component';
import { DatePipe } from '@angular/common'
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import {MatDialogModule,MAT_DIALOG_DATA} from '@angular/material/dialog';
import{MatDialogRef} from '@angular/material/dialog';
import { ToastModule } from 'ng-uikit-pro-standard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    ProfilComponent,
    TeamComponent,
    AddRideComponent,
    InfoRideComponent,
    RideComponent,
    UpdateRideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers:[DatePipe,{ provide: LOCALE_ID, useValue: "fr-FR" },
  { provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MatDialogRef, useValue: {} }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
