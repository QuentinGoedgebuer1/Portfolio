import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Accueil',
                items: [
                    { label: 'Présentation', icon: 'pi pi-fw pi-user', routerLink: ['/'] }
                ]
            },
            {
                label: 'Projets',
                items: [
                    { label: 'FinInsy', icon: 'pi pi-fw pi-dollar', routerLink: ['/fininsy'] },
                ]
            },
        ];
    }
}
