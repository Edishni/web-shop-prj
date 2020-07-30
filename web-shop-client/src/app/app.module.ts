import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClientModule} from './modules/client/client.module';
import { AdminModule} from './modules/admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './core/main/main.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { AboutComponent } from './core/components/about/about.component';
import { LoginDialogComponent } from './core/components/login-dialog/login-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
     LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClientModule,
    AdminModule,
    HttpClientModule,
    MaterialModule ,
    ReactiveFormsModule ,
    // all this modules under ...
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent]
})
export class AppModule { }
