import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Project } from '../../models/project.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DialogModule, TagModule, FormsModule, SelectButtonModule],
  template: `
    <section id="projects" class="py-20 bg-white dark:bg-gray-900">
      <div class="section-container">
        <h2 class="section-title text-center">My Projects</h2>
        <p class="section-subtitle text-center max-w-3xl mx-auto">
          Here are some of the projects I've worked on. Each one represents a unique challenge and solution.
        </p>
        
        <div class="flex justify-center my-8">
          <p-selectButton [options]="categories" [(ngModel)]="selectedCategory" 
                           (onChange)="filterProjects()" optionLabel="label" 
                           optionValue="value"></p-selectButton>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let project of filteredProjects" class="animate-on-scroll">
            <p-card styleClass="h-full">
              <ng-template pTemplate="header">
                <img [src]="project.image" [alt]="project.title" class="w-full h-48 object-cover" />
              </ng-template>
              
              <div class="flex flex-wrap gap-2 mb-3">
                <p-tag *ngFor="let tech of project.technologies.slice(0, 3)" 
                       [value]="tech" 
                       severity="info"
                       [rounded]="true"></p-tag>
                <p-tag *ngIf="project.technologies.length > 3" 
                       [value]="'+' + (project.technologies.length - 3)" 
                       severity="secondary"
                       [rounded]="true"></p-tag>
              </div>
              
              <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
              
              <ng-template pTemplate="footer">
                <div class="flex justify-between mt-4">
                  <button pButton label="Details" 
                          icon="pi pi-info-circle" 
                          (click)="showProjectDetails(project)"
                          class="p-button-outlined"></button>
                  <div class="flex gap-2">
                    <a *ngIf="project.demoUrl" 
                       [href]="project.demoUrl" 
                       target="_blank" 
                       pButton 
                       icon="pi pi-external-link" 
                       class="p-button-rounded p-button-text"></a>
                    <a *ngIf="project.githubUrl" 
                       [href]="project.githubUrl" 
                       target="_blank" 
                       pButton 
                       icon="pi pi-github" 
                       class="p-button-rounded p-button-text"></a>
                  </div>
                </div>
              </ng-template>
            </p-card>
          </div>
        </div>
      </div>
      
      <p-dialog [(visible)]="displayDialog" [style]="{width: '90%', maxWidth: '800px'}" 
                [modal]="true" [draggable]="false" [resizable]="false"
                header="{{ selectedProject?.title }}" styleClass="p-fluid">
        <ng-container *ngIf="selectedProject">
          <img [src]="selectedProject.image" [alt]="selectedProject.title" class="w-full h-64 object-cover rounded-lg mb-6" />
          
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">About this project</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            {{ selectedProject.longDescription || selectedProject.description }}
          </p>
          
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Technologies Used</h3>
          <div class="flex flex-wrap gap-2 mb-6">
            <p-tag *ngFor="let tech of selectedProject.technologies" 
                   [value]="tech" 
                   severity="info"
                   [rounded]="true"></p-tag>
          </div>
          
          <div class="flex justify-between mt-6">
            <button pButton label="Close" 
                    icon="pi pi-times" 
                    (click)="displayDialog = false"
                    class="p-button-outlined"></button>
            <div class="flex gap-2">
              <a *ngIf="selectedProject.demoUrl" 
                 [href]="selectedProject.demoUrl" 
                 target="_blank" 
                 pButton 
                 label="Live Demo"
                 icon="pi pi-external-link"></a>
              <a *ngIf="selectedProject.githubUrl" 
                 [href]="selectedProject.githubUrl" 
                 target="_blank" 
                 pButton 
                 label="GitHub"
                 icon="pi pi-github"
                 class="p-button-secondary"></a>
            </div>
          </div>
        </ng-container>
      </p-dialog>
    </section>
  `,
  styles: [`
    :host ::ng-deep .p-card {
      @apply bg-white dark:bg-gray-800 border-0;
    }
    :host ::ng-deep .p-card .p-card-content {
      @apply p-0;
    }
    :host ::ng-deep .p-card .p-card-body {
      @apply p-6;
    }
    :host ::ng-deep .p-card .p-card-footer {
      @apply p-0;
    }
    :host ::ng-deep .p-dialog .p-dialog-header {
      @apply bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700;
    }
    :host ::ng-deep .p-dialog .p-dialog-content {
      @apply bg-white dark:bg-gray-800 text-gray-800 dark:text-white;
    }
    :host ::ng-deep .p-selectbutton .p-button.p-highlight {
      @apply bg-primary-600 text-white border-primary-600;
    }
  `]
})
export class ProjectsComponent implements OnInit {
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