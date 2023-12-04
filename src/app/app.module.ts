import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { AdminUserTableComponent } from './admin-user-table/admin-user-table.component';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BookingComponent } from './booking/booking.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminFlightsTableComponent } from './admin-flights-table/admin-flights-table.component'; // Import ReactiveFormsModule
import { AuthService } from './auth.service';
import { AdminBookedFlightsComponent } from './admin-booked-flights/admin-booked-flights.component';
import { TicketComponent } from './ticket/ticket.component';



// const routes: Routes =[



// ];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AdminPageComponent,
    AdminHomeComponent,
    AdminSidebarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    AdminUserTableComponent,
    BookingComponent,
    NavbarComponent,
    AdminFlightsTableComponent,
    AdminBookedFlightsComponent,
    TicketComponent
    
  ],
  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule, RouterModule, AppRoutingModule,AngularFireModule.initializeApp({"projectId":"airborne-ars","appId":"1:740554870522:web:75b96ee9cfde464d058343","storageBucket":"airborne-ars.appspot.com","apiKey":"AIzaSyDko9IxaQq7TZZcNJ3TAY7tVvB9RgNKugg","authDomain":"airborne-ars.firebaseapp.com","messagingSenderId":"740554870522"}),
    AngularFirestoreModule, provideFirebaseApp(() => initializeApp({"projectId":"airborne-ars","appId":"1:740554870522:web:75b96ee9cfde464d058343","storageBucket":"airborne-ars.appspot.com","apiKey":"AIzaSyDko9IxaQq7TZZcNJ3TAY7tVvB9RgNKugg","authDomain":"airborne-ars.firebaseapp.com","messagingSenderId":"740554870522"})), provideFirestore(() => getFirestore()), NgbModule,
    AngularFireAuthModule, ReactiveFormsModule, 
  ],
  // RouterModule.forRoot(routes)
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
