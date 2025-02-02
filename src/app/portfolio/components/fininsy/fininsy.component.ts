import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule  } from 'primeng/tabs';
import { RechercheComponent } from "./recherche/recherche.component";
import { PortefeuilleComponent } from "./portefeuille/portefeuille.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    RechercheComponent,
    PortefeuilleComponent
],
  templateUrl: './fininsy.component.html',
  styleUrls: ['./fininsy.component.scss']
})
export class FininsyComponent implements OnInit {

  constructor() {}

  async ngOnInit() {
  }
}
