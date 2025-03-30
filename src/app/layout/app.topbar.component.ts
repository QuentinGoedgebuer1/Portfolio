import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from 'src/app/portfolio/core/service/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    email: string = '';
    password: string = '';
    
    visible: boolean = false;
    
    items!: MenuItem[];

    #authService = inject(AuthService);

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }

    login() {
        this.#authService.login.mutate({ email: this.email, password: this.password }, {
            onSuccess: () => {
                var token = this.#authService.getToken();
                console.log('success', token);
                this.closeDialog();
            },
            onError: () => {
                console.log('error');
            }
        });
    }

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
        this.visible = false;
    }
}
