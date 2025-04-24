import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RechercheComponent } from './recherche/recherche.component';
import { PortefeuilleComponent } from './portefeuille/portefeuille.component';
import { TabsModule  } from 'primeng/tabs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-fininsy',
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    RechercheComponent,
    PortefeuilleComponent,
    CardModule
  ],
  templateUrl: './fininsy.component.html',
  styleUrl: './fininsy.component.scss'
})
export class FininsyComponent {
  #authService = inject(AuthService);

  isAuthenticated() {
    return this.#authService.getToken() !== null;
  }
}
