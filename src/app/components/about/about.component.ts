import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 bg-white dark:bg-gray-900">
      <div class="section-container">
        <h2 class="section-title text-center">About Me</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <div class="relative rounded-lg overflow-hidden shadow-xl">
              <img src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                   alt="Developer working" 
                   class="w-full h-auto" />
            </div>
            <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-primary-600 rounded-lg transform rotate-6"></div>
            <div class="absolute -top-6 -left-6 w-24 h-24 bg-secondary-600 rounded-lg transform -rotate-6"></div>
          </div>
          
          <div class="flex flex-col">
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Full-Stack Developer</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              I'm a passionate full-stack developer with over 5 years of experience building modern web applications. I specialize in creating robust, scalable solutions using Angular on the frontend and Node.js on the backend.
            </p>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              My approach combines technical expertise with a strong focus on user experience. I believe that great software should not only work flawlessly but also provide an intuitive and engaging experience for users.
            </p>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical articles and mentoring junior developers.
            </p>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-primary-600 dark:text-primary-400"></i>
                <span class="text-gray-700 dark:text-gray-300">Angular & React</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-primary-600 dark:text-primary-400"></i>
                <span class="text-gray-700 dark:text-gray-300">Node.js & Express</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-primary-600 dark:text-primary-400"></i>
                <span class="text-gray-700 dark:text-gray-300">MongoDB & PostgreSQL</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-primary-600 dark:text-primary-400"></i>
                <span class="text-gray-700 dark:text-gray-300">RESTful APIs & GraphQL</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-primary-600 dark:text-primary-400"></i>
                <span class="text-gray-700 dark:text-gray-300">CI/CD & DevOps</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="pi pi-check-circle text-primary-600 dark:text-primary-400"></i>
                <span class="text-gray-700 dark:text-gray-300">AWS & Cloud Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent {
  
}