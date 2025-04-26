import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonModule
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  typedText = '';
  roles = ['Développeur Angular/Vuejs', 'Développeur Backend .NET', 'Développeur Full Stack'];
  currentRole = 0;
  currentChar = 0;
  isDeleting = false;
  typingSpeed = 100;
  pauseDuration = 1500;

  ngOnInit(): void {
    this.typeText()
  }

  typeText() {
    const currentText = this.roles[this.currentRole];
    let speed = this.typingSpeed;

    if (this.isDeleting) {
        // Deleting is faster
        speed = this.typingSpeed / 2;
        this.typedText = currentText.substring(0, this.currentChar - 1);
        this.currentChar--;
    } else {
        this.typedText = currentText.substring(0, this.currentChar + 1);
        this.currentChar++;
    }

    // Check if word is complete
    if (!this.isDeleting && this.currentChar === currentText.length) {
        // Pause at the end of typing
        speed = this.pauseDuration;
        this.isDeleting = true;
    } else if (this.isDeleting && this.currentChar === 0) {
        this.isDeleting = false;
        // Move to next word
        this.currentRole = (this.currentRole + 1) % this.roles.length;
    }

    setTimeout(() => this.typeText(), speed);
  }
}
