import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {}

// app.ts

// Function to handle scrolling to the specified element
function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Add an event listener to the "Flights" button
document.addEventListener('DOMContentLoaded', () => {
  const flightsButton = document.getElementById('flightsButton');

  if (flightsButton) {
    flightsButton.addEventListener('click', () => {
      scrollToElement('bodyText1'); // Scroll to the bodyText1 section
    });
  }
});
