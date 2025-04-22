import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AdminCertificatesComponent } from './admin-certificates/admin-certificates.component';
import { AdminEducationComponent } from './admin-education/admin-education.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminInterestsComponent } from './admin-interests/admin-interests.component';
import { AdminLanguagesComponent } from './admin-languages/admin-languages.component';
import { AdminSkillsComponent } from './admin-skills/admin-skills.component';
import { AdminWorkexperienceComponent } from './admin-workexperience/admin-workexperience.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LanguagesService } from './services/languages-service/languages.service';
import { Firestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    AdminCertificatesComponent,
    AdminEducationComponent,
    AdminHeaderComponent,
    AdminInterestsComponent,
    AdminLanguagesComponent,
    AdminSkillsComponent,
    AdminWorkexperienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    LanguagesService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
