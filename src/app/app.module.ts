import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule, CollapseModule } from 'ng2-bootstrap';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { InvoicegeneratorService, firebaseConfig, firebaseAuthConfig } from './invoicegenerator.service';


import { AppRoutingModule } from './app.routing';
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

// Must export the config
/*export const firebaseConfig = {
  apiKey: 'AIzaSyCTNcoyeUO-0G0x42hj0T3K5o2Y9T_kxy4',
  authDomain: 'fir-invoicegenerator.firebaseapp.com',
  databaseURL: 'https://fir-invoicegenerator.firebaseio.com',
  storageBucket: 'fir-invoicegenerator.appspot.com',
  messagingSenderId: '279649067231'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup,
  
};
*/
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
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    CollapseModule.forRoot()
  ],
  providers: [InvoicegeneratorService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {public _InvoicegeneratorService: InvoicegeneratorService }
