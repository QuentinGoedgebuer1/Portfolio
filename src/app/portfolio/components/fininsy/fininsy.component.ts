import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule  } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { RechercheComponent } from "./recherche/recherche.component";
import { PortefeuilleComponent } from "./portefeuille/portefeuille.component";
import { AuthService } from '../../core/service/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    RechercheComponent,
    PortefeuilleComponent,
    CardModule
],
  templateUrl: './fininsy.component.html',
  styleUrls: ['./fininsy.component.scss']
})
export class FininsyComponent {

  #authService = inject(AuthService);

  isAuthenticated() {
    return this.#authService.getToken() !== null;
  }
}
