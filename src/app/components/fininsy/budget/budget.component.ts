import { Component, computed, effect, inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DepenseService } from 'src/app/services/depense.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule, 
    FullCalendarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {

  dateNow: Date = new Date();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    headerToolbar: false
  };

  visible: boolean = false;

  newDepense: any = {
    nom: null,
    montant: null,
    jour: null
  };

  #depenseService = inject(DepenseService);

  #depensesQuery = this.#depenseService.getDepenses();

  depenses = computed(() => {
    const rawData = (this.#depensesQuery.data() as any[]) ?? [];
  
    const mappedData = rawData.map(depense => {
      const date = `${this.dateNow.getFullYear()}-${String(this.dateNow.getMonth() + 1).padStart(2, '0')}-${String(depense.jour).padStart(2, '0')}`;
      const title = depense.nom;

      return {
        id: depense.id,
        title: title,
        montant: depense.montant,
        date: date,
        jour: depense.jour,
      };
    });
    
    return mappedData;
  });

  totalDepenses = computed(() => {
    const total = this.depenses().reduce((acc, depense) => acc + depense.montant, 0);
    return total.toFixed(2);
  });
  
  constructor(private messageService: MessageService) {
    effect(() => {
      const data = this.depenses();
      if (data.length > 0) {
        this.calendarOptions.events = data;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.clearNewDepense();
  }

  clearNewDepense() {
    this.newDepense.nom = null;
    this.newDepense.montant = null;
    this.newDepense.jour = null;
  }

  addDepense(){
    this.#depenseService.addDepense.mutate(
      { nom: this.newDepense.nom, montant: this.newDepense.montant, jour: this.newDepense.jour },
      {
        onSuccess: () => {
          this.messageService.add({ key: 'global', severity: 'success', summary: 'Success', detail: 'Dépense ajouté avec succès', life: 1500 });
          this.closeDialog();
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ key: 'global', severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'ajout de la dépense', life: 1500 });
          this.closeDialog();
        },
        onSettled: () => {
          this.clearNewDepense();
        }
      }
    );
  }

  deleteActif(id: number) {
    this.#depenseService.deleteDepense.mutate(
      { id: id },
      {
        onSuccess: () => {
          this.messageService.add({ key: 'global', severity: 'success', summary: 'Success', detail: 'Dépense supprimé avec succès', life: 1500 });
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ key: 'global', severity: 'error', summary: 'Error', detail: 'Erreur lors de la suppression de la dépense', life: 1500 });
        },
      }
    );
  }

}
