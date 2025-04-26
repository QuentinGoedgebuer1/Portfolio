import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { AuthService } from '../../../services/auth.service';
import { BadgeModule } from 'primeng/badge';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { PortefeuilleService } from '../../../services/portefeuille.service';
import { InputTextModule } from 'primeng/inputtext';
import { CreatePortefeuilleComponent } from './create-portefeuille/create-portefeuille.component';
import { CreateActifComponent } from './create-actif/create-actif.component';

@Component({
  selector: 'app-portefeuille',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    Dialog,
    BadgeModule,
    AccordionModule,
    CardModule,
    InputTextModule,
    CreatePortefeuilleComponent,
    CreateActifComponent
  ],
  templateUrl: './portefeuille.component.html',
  styleUrl: './portefeuille.component.scss'
})
export class PortefeuilleComponent {

  actifVisible: boolean = false;
  
  portefeuilleVisible: boolean = false;

  portefeuilleSelectedId: number = null;

  #authService = inject(AuthService);
  #portefeuilleService = inject(PortefeuilleService);

  #portefeuillesQuery = this.#portefeuilleService.getPortefeuilles();

  portefeuilles = computed(() => this.#portefeuillesQuery.data() ?? []);
  portefeuillesIsLoading = computed(() => this.#portefeuillesQuery.isLoading());

  isAuthenticated() {
    return this.#authService.getToken() !== null;
  }
  
  showActifDialog(portefeuilleId: number) {
    this.actifVisible = true;
    this.portefeuilleSelectedId = portefeuilleId;
  }

  showPortefeuilleDialog() {
    this.portefeuilleVisible = true;
  }
}
