import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gray-100 dark:bg-gray-800 pt-12 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
          <div class="mb-6 md:mb-0">
            <a href="#" class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              <span>Dev</span><span class="text-secondary-600 dark:text-secondary-400">Portfolio</span>
            </a>
            <p class="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
              Full-stack developer specializing in modern web applications with Angular, PrimeNG, and Tailwind CSS.
            </p>
          </div>
          
          <div class="flex space-x-6">
            <a href="https://github.com/" target="_blank" class="text-gray-500 hover:text-primary-600 transition-colors">
              <i class="pi pi-github text-2xl"></i>
            </a>
            <a href="https://linkedin.com/" target="_blank" class="text-gray-500 hover:text-primary-600 transition-colors">
              <i class="pi pi-linkedin text-2xl"></i>
            </a>
            <a href="https://twitter.com/" target="_blank" class="text-gray-500 hover:text-primary-600 transition-colors">
              <i class="pi pi-twitter text-2xl"></i>
            </a>
            <a href="mailto:contact@example.com" class="text-gray-500 hover:text-primary-600 transition-colors">
              <i class="pi pi-envelope text-2xl"></i>
            </a>
          </div>
        </div>
        
        <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p class="text-center text-gray-500 dark:text-gray-400">
            © {{ currentYear }} Developer Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}