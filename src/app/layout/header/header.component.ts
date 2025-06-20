import { Component, computed, HostListener, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { filter } from 'rxjs/operators';

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

  constructor(
    private messageService: MessageService,
    private router: Router) 
  {
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  scrolled = false;
  mobileMenuOpen = false;
  themeService = inject(ThemeService);
  isDarkMode = false;

  #authService = inject(AuthService);

  #userInfoQuery = this.#authService.getUserInfo();

  userInfo = computed(() => this.#userInfoQuery.data() ?? null);
  isLoading = computed(() => this.#userInfoQuery.isLoading());
  
  menuItems = [
    { 
      label: 'Accueil', 
      command: () => this.scrollToSection('home') 
    },
    { 
      label: 'A propos',
      command: () => this.scrollToSection('about')
    },
    { 
      label: 'Compétences',
      command: () => this.scrollToSection('skills')
    },
    // { label: 'Experience', routerLink: ['/'], fragment: 'experience' },
    { 
      label: 'Projets',
      items: [
        {
          label: 'Tous les projets',
          command: () => this.scrollToSection('projects')
        },
        {
          label: 'Fininsy',
          routerLink: ['/fininsy']
        }
      ]
    }
  ];

  model = {
    email: '',
    nom: '',
    prenom: '',
    password: ''
  };

  visible: boolean = false;

  scrollToSection(fragment: string) {
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl !== '/' && currentUrl !== '/#' + fragment) {
      this.router.navigate(['/'], { fragment });
    } else {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
      { email: this.model.email, password: this.model.password },
      {
        onSuccess: () => {
          this.messageService.add({ key: 'global', severity: 'success', summary: 'Success', detail: 'Authentification réussie', life: 1500 });
          this.closeDialog();
          this.model.email = '';
          this.model.password = '';
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ key: 'global', severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'authentification', life: 1500 });
          this.closeDialog();
          this.model.email = '';
          this.model.password = '';
        },
      }
    );
  }
  
  register() {
    this.#authService.register.mutate(
      { email: this.model.email, nom: this.model.nom, prenom: this.model.prenom, password: this.model.password },
      {
        onSuccess: () => {
          this.messageService.add({ key: 'global', severity: 'success', summary: 'Success', detail: 'Inscription réussie', life: 1500 });
          this.closeDialog();
          this.login();
        },
        onError: () => {
          console.log('error');
          this.messageService.add({ key: 'global', severity: 'error', summary: 'Error', detail: 'Erreur lors de l\'inscription', life: 1500 });
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
    this.messageService.add({ key: 'global', severity: 'success', summary: 'Success', detail: 'Déconnexion réussie', life: 1500 });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.clearModel();
  }

  clearModel() {
    this.model = {
      email: '',
      nom: '',
      prenom: '',
      password: ''
    }
  }
}