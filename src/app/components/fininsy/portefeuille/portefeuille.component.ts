import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import { BadgeModule } from 'primeng/badge';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { PortefeuilleService } from '../../../services/portefeuille.service';
import { InputTextModule } from 'primeng/inputtext';
import { CreatePortefeuilleComponent } from './create-portefeuille/create-portefeuille.component';
import { CreateActifComponent } from './create-actif/create-actif.component';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-portefeuille',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    BadgeModule,
    AccordionModule,
    CardModule,
    InputTextModule,
    CreatePortefeuilleComponent,
    CreateActifComponent,
    TooltipModule
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

  portefeuilles = computed(() => {
    const data = (this.#portefeuillesQuery.data() as any[]) ?? [];
  
    return data.map(portefeuille => {
      const totalInvesti = portefeuille.actifs?.reduce((sum, actif) => sum + (actif.montantInvesti || 0), 0) ?? 0;
      return {
        ...portefeuille,
        totalInvesti
      };
    });
  });
  
  totalInvesti = computed(() => {
    return this.portefeuilles().reduce((sum, portefeuille) => sum + portefeuille.totalInvesti, 0);
  });
  
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

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(amount);
  }  

  async getPriceActif(symbol: string, portefeuilleId: number, actifId: number): Promise<void> {
    const apiKey = environment.API_POLYGON;
    const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${apiKey}`;
  
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      const price = this.dollarsToEuros(data.results?.[0]?.c);
  
      if (price == null) {
        console.error('Prix non trouvé dans la réponse', data);
        return;
      }
  
      this.#portefeuilleService.updateActifPrice(portefeuilleId, actifId, price);
  
    } catch (error) {
      console.error("Erreur en récupérant le prix de l'actif :", error);
    }
  }

  dollarsToEuros(dollars: number): number {
    const conversionRate = 0.88;
    return dollars * conversionRate;
  }
  
}
