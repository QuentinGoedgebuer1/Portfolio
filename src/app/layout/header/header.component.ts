import { Component, computed, HostListener, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MenubarModule, 
    ButtonModule, 
    InputSwitchModule, 
    FormsModule, 
    DialogModule, 
    TabsModule,
    InputTextModule
  ],
})
export class HeaderComponent {
  scrolled = false;
  mobileMenuOpen = false;
  themeService = inject(ThemeService);
  isDarkMode = false;
  
  menuItems = [
    { label: 'Accueil', routerLink: ['/'], fragment: 'home' },
    { label: 'A propos', routerLink: ['/'], fragment: 'about' },
    { label: 'Compétences', routerLink: ['/'], fragment: 'skills' },
    { label: 'Experience', routerLink: '/', fragment: 'experience' },
    { 
      label: 'Projets',
      items: [
        {
          label: 'Tous les projets', 
          routerLink: '/', 
          fragment: 'projects'
        },
        {
          label: 'Fininsy',
          routerLink: ['/fininsy']
        }
      ]
    }
  ];

  email: string = '';
  nom: string = '';
  prenom: string = '';
  password: string = '';
  visible: boolean = false;

  items!: MenuItem;

  #authService = inject(AuthService);

  #userInfoQuery = this.#authService.getUserInfo();

  userInfo = computed(() => this.#userInfoQuery.data() ?? null);
  isLoading = computed(() => this.#userInfoQuery.isLoading());
  
  constructor(private messageService: MessageService) {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDark(){
    return this.themeService.isDark();
  }

  login() {
    this.#authService.login.mutate(
      { email: this.email, password: this.password },
      {
        onSuccess: () => {
          this.messageService.add({ key: 'toast', severity: 'success', summary: 'Success', detail: 'Authentification réussie', life: 1500 });
          this.closeDialog();
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ key: 'toast', severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'authentification', life: 1500 });
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
          this.messageService.add({ key: 'toast', severity: 'success', summary: 'Success', detail: 'Inscription réussie', life: 1500 });
          this.closeDialog();
          this.login();
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ key: 'toast', severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'inscription', life: 1500 });
          this.closeDialog();
        },
      }
    );
  }

  isAuthenticated() {
    return this.#authService.isAuthenticated();
  }

  logout() {
    this.#authService.logout();
    this.messageService.add({ key: 'toast', severity: 'success', summary: 'Success', detail: 'Déconnexion réussie', life: 1500 });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}