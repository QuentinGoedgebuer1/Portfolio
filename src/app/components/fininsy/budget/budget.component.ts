import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [
      { title: 'Loyer: 500€', date: '2025-04-03' },
      { title: 'Electricité: 90€', date: '2025-04-05' }
    ],
    headerToolbar: false
  };

}
