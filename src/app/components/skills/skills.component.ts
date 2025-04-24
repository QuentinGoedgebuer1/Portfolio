import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Skill } from '../../models/skill.model';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressBarModule, TabViewModule],
  template: `
    <section id="skills" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="section-container">
        <h2 class="section-title text-center">My Skills</h2>
        <p class="section-subtitle text-center max-w-3xl mx-auto">
          I've worked with a variety of technologies across the full stack. Here are some of my key areas of expertise.
        </p>
        
        <div class="mt-12">
          <p-tabView>
            <p-tabPanel header="Frontend">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div *ngFor="let skill of frontendSkills" class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ skill.name }}</h3>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ skill.level }}/10</span>
                  </div>
                  <p-progressBar [value]="skill.level * 10" [showValue]="false" [styleClass]="'h-2 rounded-full'"></p-progressBar>
                </div>
              </div>
            </p-tabPanel>
            
            <p-tabPanel header="Backend">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div *ngFor="let skill of backendSkills" class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ skill.name }}</h3>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ skill.level }}/10</span>
                  </div>
                  <p-progressBar [value]="skill.level * 10" [showValue]="false" [styleClass]="'h-2 rounded-full'"></p-progressBar>
                </div>
              </div>
            </p-tabPanel>
            
            <p-tabPanel header="Tools & Other">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div *ngFor="let skill of otherSkills" class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ skill.name }}</h3>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ skill.level }}/10</span>
                  </div>
                  <p-progressBar [value]="skill.level * 10" [showValue]="false" [styleClass]="'h-2 rounded-full'"></p-progressBar>
                </div>
              </div>
            </p-tabPanel>
          </p-tabView>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  frontendSkills: Skill[] = [];
  backendSkills: Skill[] = [];
  otherSkills: Skill[] = [];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.categorizeSkills();
    });
  }
  
  private categorizeSkills(): void {
    this.frontendSkills = this.skills.filter(skill => skill.category === 'frontend');
    this.backendSkills = this.skills.filter(skill => skill.category === 'backend');
    this.otherSkills = [
      ...this.skills.filter(skill => skill.category === 'tools'),
      ...this.skills.filter(skill => skill.category === 'other')
    ];
  }
}