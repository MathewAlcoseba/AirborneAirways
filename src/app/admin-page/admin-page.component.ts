import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  

interface User {
  userId: string;
  photo: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  birthDate: any; 
  contactNumber: string;
  email: string;
}


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})

export class AdminPageComponent implements OnDestroy {
  currentYear: number;
  currentMonth: number;

  private ngUnsubscribe = new Subject<void>();
  users: User[] = [];
  birthDate: NgbDateStruct | null = null;

  constructor(private angularFirestore: AngularFirestore, private calendar: NgbCalendar) {
    this.getDataFromFirestore();
    const today = this.calendar.getToday();
    this.currentYear = today.year;
    this.currentMonth = today.month;
  }

  getDataFromFirestore() {
    this.angularFirestore.collection<User>('users')
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
      photo: '', //sample ra
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      age: formData.value.age,
      gender: formData.value.gender,
      birthDate: new Date(formData.value.birthDate.year, formData.value.birthDate.month - 1, formData.value.birthDate.day),
      contactNumber: formData.value.contactNumber,
      email: formData.value.email
    };

    this.angularFirestore.collection('users').doc(userId).set(userData)
      .then(() => {
        console.log(`User with ID ${userId} added successfully.`);
        formData.resetForm();
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  }

  deleteUser(userId: string) {
    const userDocRef = this.angularFirestore.collection('users').doc(userId);

    userDocRef.delete()
      .then(() => {
        console.log(`User with ID ${userId} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting user with ID ${userId}: `, error);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  
}
