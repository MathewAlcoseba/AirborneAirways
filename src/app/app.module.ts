import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AdminPageComponent,
    AdminHomeComponent,
    AdminSidebarComponent
  ],
  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule, RouterModule, AppRoutingModule,AngularFireModule.initializeApp({"projectId":"airborne-ars","appId":"1:740554870522:web:75b96ee9cfde464d058343","storageBucket":"airborne-ars.appspot.com","apiKey":"AIzaSyDko9IxaQq7TZZcNJ3TAY7tVvB9RgNKugg","authDomain":"airborne-ars.firebaseapp.com","messagingSenderId":"740554870522"}),
    AngularFirestoreModule, provideFirebaseApp(() => initializeApp({"projectId":"airborne-ars","appId":"1:740554870522:web:75b96ee9cfde464d058343","storageBucket":"airborne-ars.appspot.com","apiKey":"AIzaSyDko9IxaQq7TZZcNJ3TAY7tVvB9RgNKugg","authDomain":"airborne-ars.firebaseapp.com","messagingSenderId":"740554870522"})), provideFirestore(() => getFirestore()), NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
