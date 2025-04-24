import { Component, OnInit } from '@angular/core';
import Aura from "@primeng/themes/aura";
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private primeng: PrimeNG){
    this.primeng.theme.set({
      preset: Aura,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities'
          }
        }
    })
  }
  
  ngOnInit(): void {
    this.initScrollAnimation();
  }

  private initScrollAnimation(): void {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
      observer.observe(element);
    });
  }
}
