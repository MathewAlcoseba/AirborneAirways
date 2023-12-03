// login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginUser() {
    const { email, password } = this.loginForm.value;

    if (email === 'admin' && password === 'password') {
      // Simulate an admin login
      this.authService.login({ isAdmin: true });
      console.log('Navigating to /admin-sidebar');
      this.router.navigate(['/admin-sidebar']);
    } else if (this.loginForm.valid) {
      // Fetch user info from the backend (Firestore)
      this.authService.getUserByEmail(email).subscribe((users: any[]) => {
        if (users.length > 0) {
          const userInfo = users[0];
          this.authService.login(userInfo);
          this.router.navigate(['/']);
        } else {
          alert('User not found. Please register first.');
        }
      });
    } else {
      alert('Invalid email or password. Please try again.');
    }
  }
}
