import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ActifService } from 'src/app/services/actif.service';

@Component({
  selector: 'app-create-actif',
  standalone: true,
  imports: [
    ButtonModule,
    Dialog,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './create-actif.component.html',
  styleUrl: './create-actif.component.scss'
})
export class CreateActifComponent {
  @Input() visible: boolean = false;
  @Input() portefeuilleId: number = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  
  constructor(private messageService: MessageService) { }

  actif = {
    nom: '',
    symbole: '',
    montantInvesti: 0,
    quantite: 0,
  };

  #actifService = inject(ActifService);

  closeDialog() {
    this.visibleChange.emit(false);
  }

  addActif() {
    this.#actifService.addActif.mutate(
      { nom: this.actif.nom, symbole: this.actif.symbole, montantInvesti: this.actif.montantInvesti, quantite: this.actif.quantite, portefeuilleId: this.portefeuilleId },
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
