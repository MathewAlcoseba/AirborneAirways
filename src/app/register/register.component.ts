import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private angularAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required]
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      const { firstname, lastname, email, password } = this.registerForm.value;

      this.angularAuth
        .createUserWithEmailAndPassword(email, password)
        .then((authResult) => {
          if (authResult.user) {
            const userId = authResult.user.uid;
            const userData = {
              userId,
              firstName: firstname,
              lastName: lastname,
              email: email
            };

            this.angularFirestore
              .collection('users')
              .doc(userId)
              .set(userData)
              .then(() => {
                alert(`User with ID ${userId} registered successfully.`);
                this.router.navigate(['/login']);
              })
              .catch((error) => {
                console.error('Error adding user:', error);
              });
          } else {
            console.error('User not found in authentication.');
          }
        })
        .catch((error) => {
          console.error('Error creating user in authentication:', error);
          if (error.code === 'auth/weak-password') {
            alert('Password is too weak. Please use a stronger password.');
          } else if (error.code === 'auth/email-already-in-use') {
            alert('Email address is already in use. Please use a different email.');
          } else {
            alert('An error occurred during registration. Please try again.');
          }
        });
    }
  }
}
