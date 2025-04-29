import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule, 
    FullCalendarModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {

  depensesFixes: any[] = [
    { id: 1, title: 'Loyer', montant: 500, date: '2025-04-03' },
    { id: 2, title: 'Electricité', montant: 90, date: '2025-04-05' },
    { id: 3, title: 'Internet', montant: 30, date: '2025-04-10' },
    { id: 4, title: 'Assurance', montant: 50, date: '2025-04-15' },
    { id: 5, title: 'Téléphone', montant: 20, date: '2025-04-20' }
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.depensesFixes,
    headerToolbar: false
  };

}
