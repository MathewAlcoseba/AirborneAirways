import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  public user: any = null; 

  constructor(
    private angularAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {}

  login(user: any) {
    this.user = user;
  }

  logout() {
    this.user = null;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.user.isAdmin;
  }
  adminLogout() {
    this.logout(); 
  }

  getUserByEmail(email: string): Observable<any[]> {
    return this.angularFirestore
      .collection('users', (ref) => ref.where('email', '==', email))
      .valueChanges();
  }
  getUser() {
    return this.user;
  }
  
}