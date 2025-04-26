import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';
import { Skill } from 'src/app/models/skill.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ProgressBarModule, 
    TabViewModule
  ],
  templateUrl: './competences.component.html',
  styleUrl: './competences.component.scss'
})
export class CompetencesComponent {
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
