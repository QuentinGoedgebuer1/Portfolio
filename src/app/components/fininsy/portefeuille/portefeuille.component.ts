import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Table } from 'primeng/table';
import { AuthService } from '../../../services/auth.service';

import { BadgeModule } from 'primeng/badge';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { PortefeuilleService } from '../../../services/portefeuille.service';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ActifService } from '../../../services/actif.service';


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
    InputTextModule
  ],
  templateUrl: './portefeuille.component.html',
  styleUrl: './portefeuille.component.scss'
})
export class PortefeuilleComponent {

  constructor(private messageService: MessageService) { }

  visible: boolean = false;
  
  portefeuilleVisible: boolean = false;

  portefeuille = {
    nom: ''
  };

  actif = {
    nom: '',
    symbole: '',
    montantInvesti: 0,
    quantite: 0,
    portefeuilleId: 0
  };

  #authService = inject(AuthService);

  #portefeuilleService = inject(PortefeuilleService);

  #actifService = inject(ActifService);

  #portefeuillesQuery = this.#portefeuilleService.getPortefeuilles();

  portefeuilles = computed(() => this.#portefeuillesQuery.data() ?? []);
  portefeuillesIsLoading = computed(() => this.#portefeuillesQuery.isLoading());

  isAuthenticated() {
    return this.#authService.getToken() !== null;
  }

  clear(table: Table) {
    table.clear();
  }
  
  showDialog(portefeuilleId: number) {
    this.visible = true;
    this.actif.portefeuilleId = portefeuilleId;
  }

  closeDialog() {
    this.visible = false;
  }

  showPortefeuilleDialog() {
    this.portefeuilleVisible = true;
  }

  closePortefeuilleDialog() {
    this.portefeuilleVisible = false;
  }

  addPortefeuille() {
    this.#portefeuilleService.addPortefeuille.mutate(
      { nom: this.portefeuille.nom },
      {
        onSuccess: () => {
          this.messageService.add({ key: 'global', severity: 'success', summary: 'Success', detail: 'Portefeuille ajouté avec succès', life: 1500 });
          this.closePortefeuilleDialog();
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ key: 'global', severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'ajout du portefeuille', life: 1500 });
          this.closePortefeuilleDialog();
        },
      }
    );
  }

  addActif() {
    this.#actifService.addActif.mutate(
      { nom: this.actif.nom, symbole: this.actif.symbole, montantInvesti: this.actif.montantInvesti, quantite: this.actif.quantite, portefeuilleId: this.actif.portefeuilleId },
      {
        onSuccess: () => {
          this.messageService.add({ key: 'global', severity: 'success', summary: 'Success', detail: 'Actif ajouté avec succès', life: 1500 });
          this.closeDialog();
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ key: 'global', severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'ajout de l\'actif', life: 1500 });
          this.closeDialog();
        },
      }
    );
  }
}
