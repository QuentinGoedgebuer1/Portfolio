import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erreur',
  standalone: true,
  imports: [],
  templateUrl: './erreur.component.html',
  styleUrl: './erreur.component.scss'
})
export class ErreurComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']); // Redirige vers la page d'accueil
  }
}
