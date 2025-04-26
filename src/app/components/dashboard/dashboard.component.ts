import { Component } from '@angular/core';
import { AccueilComponent } from '../accueil/accueil.component';
import { AproposComponent } from '../apropos/apropos.component';
import { CompetencesComponent } from '../competences/competences.component';
import { ExperiencesComponent } from '../experiences/experiences.component';
import { ProjetsComponent } from '../projets/projets.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AccueilComponent,
    AproposComponent,
    CompetencesComponent,
    ExperiencesComponent,
    ProjetsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
}
