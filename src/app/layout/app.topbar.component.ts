import { Component, ElementRef, ViewChild, inject, computed, effect } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from 'src/app/portfolio/core/service/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  providers: [MessageService],
})
export class AppTopBarComponent {
  email: string = '';
  nom: string = '';
  prenom: string = '';
  password: string = '';
  visible: boolean = false;

  items!: MenuItem;

  #authService = inject(AuthService);

  #userInfoQuery = this.#authService.getUserInfo();

  userInfo = computed(() => this.#userInfoQuery.data());
  isLoading = computed(() => this.#userInfoQuery.isLoading());

  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private messageService: MessageService) { }

  login() {
    this.#authService.login.mutate(
      { email: this.email, password: this.password },
      {
        onSuccess: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Authentification réussie' });
          this.closeDialog();
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'authentification' });
          this.closeDialog();
        },
      }
    );
  }

  register() {
    this.#authService.register.mutate(
      { email: this.email, nom: this.nom, prenom: this.prenom, password: this.password },
      {
        onSuccess: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inscription réussie' });
          this.closeDialog();
          this.login();
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'inscription' });
          this.closeDialog();
        },
      }
    );
  }

  isAuthenticated() {
    return this.#authService.getToken() !== null;
  }

  logout() {
    this.#authService.logout();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}
