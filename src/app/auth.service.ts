import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: any = null; // User information

  constructor(
    private angularAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {}

  login(user: any) {
    // You can store user details in this service for easy access throughout the app
    this.user = user;
  }

  logout() {
    // Clear user details on logout
    this.user = null;
    // Other logout logic if needed
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.user.isAdmin;
  }
  adminLogout() {
    // Additional logic for admin logout if needed
    // For example, clearing admin-specific data or performing certain actions
    this.logout(); // Call the common logout method
  }

  getUserByEmail(email: string): Observable<any[]> {
    // Fetch user details from Firestore based on email
    return this.angularFirestore
      .collection('users', (ref) => ref.where('email', '==', email))
      .valueChanges();
  }
}