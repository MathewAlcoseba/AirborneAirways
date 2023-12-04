import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminUserTableComponent } from './admin-user-table/admin-user-table.component';
import { AdminFlightsTableComponent } from './admin-flights-table/admin-flights-table.component';
import { AdminBookedFlightsComponent } from './admin-booked-flights/admin-booked-flights.component';

const routes: Routes = [

  // { path: '', redirectTo: '/admin-home', pathMatch: 'full' }, // Redirect to home by default
    // { path:'homepage', component: HomepageComponent},
  {
    path: 'admin-sidebar',
    component: AdminSidebarComponent,
    children: [
      { path: 'admin-home', component: AdminHomeComponent },
      { path: 'dashboard', component: AdminPageComponent },
      { path: '', component: AdminHomeComponent },
      { path: 'users', component: AdminUserTableComponent },
      { path: 'flights', component: AdminFlightsTableComponent },
      { path: 'booked-flights', component: AdminBookedFlightsComponent },
    ]
  },
  { path:'', component: HomepageComponent},
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
