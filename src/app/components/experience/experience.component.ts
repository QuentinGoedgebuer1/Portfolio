import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Experience } from '../../models/experience.model';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TimelineModule, CardModule, TagModule],
  template: `
    <section id="experience" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="section-container">
        <h2 class="section-title text-center">Professional Experience</h2>
        <p class="section-subtitle text-center max-w-3xl mx-auto">
          My journey as a developer, including previous roles and responsibilities.
        </p>
        
        <div class="mt-12 relative">
          <div class="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
          
          <div *ngFor="let exp of experiences; let i = index" class="relative mb-12 animate-on-scroll">
            <div class="md:flex items-start" [ngClass]="{'md:flex-row-reverse': i % 2 !== 0}">
              <div class="md:w-1/2 mb-6 md:mb-0" [ngClass]="{'md:pl-8': i % 2 === 0, 'md:pr-8': i % 2 !== 0}">
                <div class="hidden md:block absolute top-0 left-1/2 w-4 h-4 rounded-full bg-primary-600 transform -translate-x-1/2 z-10"></div>
                
                <div class="card p-6 md:transform" [ngClass]="{'md:translate-x-4': i % 2 === 0, 'md:-translate-x-4': i % 2 !== 0}">
                  <div class="flex items-center mb-4">
                    <div *ngIf="exp.logo" class="w-12 h-12 rounded-full bg-white dark:bg-gray-700 p-2 flex items-center justify-center mr-4">
                      <img [src]="exp.logo" [alt]="exp.company" class="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ exp.position }}</h3>
                      <p class="text-primary-600 dark:text-primary-400">{{ exp.company }}</p>
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <i class="pi pi-calendar mr-2"></i>
                      {{ exp.startDate }} - {{ exp.endDate }}
                    </p>
                  </div>
                  
                  <p class="text-gray-600 dark:text-gray-400 mb-4">{{ exp.description }}</p>
                  
                  <div class="flex flex-wrap gap-2">
                    <p-tag *ngFor="let tech of exp.technologies" 
                          [value]="tech" 
                          severity="info"
                          [rounded]="true"></p-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getExperiences().subscribe(experiences => {
      this.experiences = experiences;
      
      // Enable animations after the experiences are loaded
      setTimeout(() => {
        this.initScrollAnimation();
      }, 100);
    });
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