import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { Project } from 'src/app/models/project.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ButtonModule, 
    DialogModule, 
    TagModule, 
    FormsModule, 
    SelectButtonModule
  ],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  displayDialog = false;
  selectedProject: Project | null = null;
  selectedCategory = 'all';
  
  categories = [
    { label: 'All', value: 'all' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Full-Stack', value: 'fullstack' },
    { label: 'Mobile', value: 'mobile' }
  ];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.filteredProjects = [...this.projects];
      
      // Enable animations after the projects are loaded
      setTimeout(() => {
        this.initScrollAnimation();
      }, 100);
    });
  }
  
  filterProjects(): void {
    if (this.selectedCategory === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(
        project => project.category === this.selectedCategory
      );
    }
  }
  
  showProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.displayDialog = true;
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
