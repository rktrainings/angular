import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermsComponent } from './components/terms/terms.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { LogoutComponent } from './components/logout/logout.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './services/common-service.service';

import { AuthService } from './services/auth-service.service';
import { AuthGuardService } from './services/auth-guard.service';
import { LoaderComponent } from './components/loader/loader.component';
import { SharedModule } from './modules/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MainViewComponent } from './components/main-view/main-view.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { ErrorService } from './services/error.service';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoggedOutViewComponent } from './components/logged-out-view/logged-out-view.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { CookieModule } from 'ngx-cookie';
import { TermGuardService } from './services/term-guard.service';
import { DatePipe } from '@angular/common';
import { HcUpdateComponent } from './components/upload/hc-update/hc-update.component';
import { DialogHcUpdateComponent } from './components/upload/Dialogs/dialog-hc-update/dialog-hc-update.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TermsComponent,
    LogoutComponent,    
    MainViewComponent,
    AuthenticateComponent,
    SessionExpiredComponent,
    LoggedOutViewComponent,
    ViewProfileComponent
   
  
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgbPopoverModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot()

  ],
  providers: [CommonService, AuthService, AuthGuardService, ErrorService,TermGuardService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [
    ViewProfileComponent,
    LoaderComponent,
    LogoutComponent
  ]

})
export class AppModule { }
