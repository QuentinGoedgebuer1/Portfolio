import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PortefeuilleService } from 'src/app/services/portefeuille.service';

@Component({
  selector: 'app-create-portefeuille',
  standalone: true,
  imports: [
    ButtonModule,
    Dialog,
    InputTextModule,
    FormsModule
    ],
  templateUrl: './create-portefeuille.component.html',
  styleUrl: './create-portefeuille.component.scss'
})
export class CreatePortefeuilleComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  
  constructor(private messageService: MessageService) { }
  
  portefeuille = {
    nom: ''
  };

  #portefeuilleService = inject(PortefeuilleService);

  closeDialog() {
    this.visibleChange.emit(false);
  }

  addPortefeuille() {
    this.#portefeuilleService.addPortefeuille.mutate(
      { nom: this.portefeuille.nom },
      {
        onSuccess: () => {
          this.messageService.add({ key: 'global', severity: 'success', summary: 'Success', detail: 'Portefeuille ajouté avec succès', life: 1500 });
          this.closeDialog();
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ key: 'global', severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'ajout du portefeuille', life: 1500 });
          this.closeDialog();
        },
      }
    );
  }
}
