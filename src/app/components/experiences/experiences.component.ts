import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { Experience } from 'src/app/models/experience.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [
    CommonModule, 
    TimelineModule, 
    CardModule, 
    TagModule
  ],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent {
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
