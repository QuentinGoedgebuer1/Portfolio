import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/portfolio/core/service/auth.service';


@Component({
  selector: 'app-portefeuille',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    Dialog
  ],
  templateUrl: './portefeuille.component.html',
  styleUrl: './portefeuille.component.scss'
})
export class PortefeuilleComponent {

  actifs!: any[];

  representatives!: any[];

  statuses!: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

  visible: boolean = false;

  #authService = inject(AuthService);

  async ngOnInit() {

    this.actifs = [
      {
        id: 1,
        nom: 'Apple',
        code: 'AAPL',
        investi: 6000,
        montantTotal: 10000,
        diff: 4000,
      },
      {
        id: 2,
        nom: 'Nvidia',
        code: 'NVDA',
        investi: 9000,
        montantTotal: 15000,
        diff: 6000,
      }
    ];
  }

  isAuthenticated() {
    return this.#authService.getToken() !== null;
  }

  clear(table: Table) {
    table.clear();
  }
  
  showDialog() {
    this.visible = true;
  }
}
