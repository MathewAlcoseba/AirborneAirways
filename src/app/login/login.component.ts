// login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private angularAuth: AngularFireAuth,
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

    // console.log('Email:', email);
    // console.log('Password:', password);

    if (email === 'admin' && password === 'password') {
      console.log('Navigating to /admin-sidebar');
      this.router.navigate(['/admin-sidebar']);
    } else if (this.loginForm.valid) {
      this.angularAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Login successful!');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.error('Error during login:', error);
          alert('Invalid email or password. Please try again.');
        });
    } else {
      alert('Invalid email or password. Please try again.');
    }
  }
}
