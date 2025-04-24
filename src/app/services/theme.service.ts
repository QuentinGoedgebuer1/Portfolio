import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.getInitialThemePreference());
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    this.initTheme();
  }

  private getInitialThemePreference(): boolean {
    // Check local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private initTheme(): void {
    this.darkMode.subscribe(isDark => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  toggleTheme(): void {
    this.darkMode.next(!this.darkMode.value);
  }

  isDark(): boolean {
    return this.darkMode.value;
  }
}