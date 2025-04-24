import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <section id="home" class="min-h-screen relative flex items-center pt-16 overflow-hidden">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        <div class="order-2 md:order-1 animate-slide-up">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span>Bonjour, je suis </span>
            <span class="text-gradient">Goedgebuer Quentin</span>
          </h1>
          
          <div class="mb-6 h-8">
            <h2 class="text-xl sm:text-2xl font-medium flex">
              <span class="mr-2">Je suis un </span>
              <span class="typed-text">{{ typedText }}</span>  
              <span class="cursor"></span>
            </h2>
          </div>
          
          <p class="text-lg mb-8 max-w-lg">
            Développeur web expérimenté avec plus de 3 ans d’expertise en Angular / Vuejs et en APIs .NET 6. 
            Passionné par la création d’applications élégantes et performantes.
          </p>
          
          <div class="flex flex-wrap gap-4">
            <a 
              pButton 
              href="https://www.linkedin.com/in/quentin-goedgebuer/"
              icon="pi pi-linkedin" 
              class="border-0"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </div>
        
        <div class="order-1 md:order-2 flex justify-center animate-slide-in-right">
          <div class="relative">
            <div class="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <div class="w-60 h-60 sm:w-76 sm:h-76 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="../../../../assets/images/me.jpg" 
                  alt="Developer profile" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-gray-800 dark:bg-white rounded-lg shadow-lg flex items-center justify-center animate-bounce-slow">
              <div class="text-center">
                <div class="text-lg font-bold text-white dark:text-primary-600">3+</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Années d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent implements OnInit {
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