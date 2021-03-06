import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { InvoicegeneratorService, firebaseConfig, firebaseAuthConfig } from './invoicegenerator.service';
import { MessageControlService } from './message-control.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppRoutingModule, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { BaseComponent } from './components/base/base.component';
import { SavedfilesComponent } from './profile/savedfiles/savedfiles.component';
import { NewinvoiceComponent } from './profile/newinvoice/newinvoice.component';
import { UserComponent } from './profile//user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {AuthGuard} from './auth.guard';
import { PersonalInfoComponent } from './profile/personal-info/personal-info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompleteInfoComponent } from './profile/complete-info/complete-info.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    UserComponent,
    SavedfilesComponent,
    NewinvoiceComponent,
    HeaderComponent,
    FooterComponent,
    PersonalInfoComponent,
    NotFoundComponent,
    CompleteInfoComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),

  ],
  providers: [ InvoicegeneratorService, AuthGuard, MessageControlService],
  bootstrap: [AppComponent]
})
export class AppModule {}
