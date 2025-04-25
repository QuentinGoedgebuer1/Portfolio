import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RechercheComponent } from './recherche/recherche.component';
import { PortefeuilleComponent } from './portefeuille/portefeuille.component';
import { TabsModule  } from 'primeng/tabs';
import { AuthService } from '../../services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-fininsy',
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    RechercheComponent,
    PortefeuilleComponent,
    CardModule,
    MenubarModule
  ],
  templateUrl: './fininsy.component.html',
  styleUrl: './fininsy.component.scss'
})
export class FininsyComponent implements OnInit {
  items: MenuItem[] | undefined;
  #authService = inject(AuthService);

  ngOnInit() {
    this.items = [
        {
            label: 'Recherche',
            icon: 'pi pi-search',
            routerLink: ['/fininsy'], 
            fragment: 'RechercheFininsy'
        },
        {
            label: 'Portefeuille',
            icon: 'pi pi-credit-card',
            routerLink: ['/fininsy'], 
            fragment: 'PortefeuilleFininsy'
        }
    ]
  }

  isAuthenticated() {
    return this.#authService.getToken() !== null;
  }
}
