import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.scss']
})
export class AdminUserTableComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  users: User[] = [];

  constructor(private angularFirestore: AngularFirestore, private angularAuth: AngularFireAuth) {
    this.getDataFromFirestore();
  }

  getDataFromFirestore() {
    this.angularFirestore
      .collection<User>('users')
      .valueChanges()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  addUser(formData: any) {
    const userId = this.angularFirestore.createId();
    const userData: User = {
      userId,
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
    };

    const password = formData.value.password;

    this.angularAuth
      .createUserWithEmailAndPassword(userData.email, password)
      .then((authResult) => {
        this.angularFirestore
          .collection('users')
          .doc(userId)
          .set(userData)
          .then(() => {
            alert(`User with ID ${userId} added successfully.`);
            formData.resetForm();
          })
          .catch((error) => {
            alert(`Failed to add user`);
            console.error('Error adding user:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating user in authentication:', error);
      });
  }

  deleteUser(userId: string) {
    // Step 1: Delete from Firebase Authentication
    this.angularAuth.currentUser
      .then((user) => {
        if (user) {
          return user.delete();
        } else {
          console.error('User not found in Firebase Authentication.');
          return Promise.reject('User not found in Firebase Authentication.');
        }
      })
      .then(() => {
        // Step 2: Delete from Firestore
        const userDocRef = this.angularFirestore.collection('users').doc(userId);
  
        return userDocRef.delete();
      })
      .then(() => {
        alert(`User with ID ${userId} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting user with ID ${userId}: `, error);
        alert(`Failed to delete user`);
      });
  }
  

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
