import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RechercheComponent } from './recherche/recherche.component';
import { PortefeuilleComponent } from './portefeuille/portefeuille.component';
import { TabsModule  } from 'primeng/tabs';
import { AuthService } from '../../services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BudgetComponent } from './budget/budget.component';

@Component({
  selector: 'app-fininsy',
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    RechercheComponent,
    PortefeuilleComponent,
    CardModule,
    MenubarModule,
    BudgetComponent
  ],
  templateUrl: './fininsy.component.html',
  styleUrl: './fininsy.component.scss'
})
export class FininsyComponent implements OnInit {
  items: MenuItem[] | undefined;
  currentView: string = 'recherche';
  #authService = inject(AuthService);

  ngOnInit() {
    this.buildMenuBar();
    this.#authService.loginStatusChanged.subscribe((loggedIn) => {
      if (loggedIn) {
        this.buildMenuBar();
      }
    });
  }

  buildMenuBar() {
    this.items = [
      {
          label: 'Recherche',
          icon: 'pi pi-search',
          command: () => this.changeView('recherche')
      },
      {
          label: 'Portefeuille',
          icon: 'pi pi-credit-card',
          visible: this.isAuthenticated(),
          command: () => this.changeView('portefeuille')
      },
      {
        label: 'Budget',
        icon: 'pi pi-wallet',
        visible: this.isAuthenticated(),
        command: () => this.changeView('budget')
      },
      {
        label: 'Paramètre',
        icon: 'pi pi-cog',
        visible: this.isAuthenticated(),
        command: () => this.changeView('parametre')
      }
    ]
  }

  changeView(view: string) {
    this.currentView = view;
  }

  isAuthenticated() {
    return this.#authService.getToken() !== null;
  }
}
