import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { Experience } from '../models/experience.model';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private projects = new BehaviorSubject<Project[]>([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce platform with product management, cart, and payment processing',
      longDescription: 'A comprehensive e-commerce solution built with Angular and Node.js. Features include product catalog, user authentication, shopping cart functionality, payment processing with Stripe, and an admin dashboard for order and product management.',
      technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'AWS S3'],
      image: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://ecommerce-demo.example.com',
      githubUrl: 'https://github.com/username/ecommerce-platform',
      featured: true,
      category: 'fullstack'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Kanban-style task management application with drag-and-drop interface',
      longDescription: 'A productivity application that helps teams manage tasks using a Kanban board interface. Built with Angular and Firebase, it features real-time updates, task assignments, due dates, labels, and team collaboration features.',
      technologies: ['Angular', 'Firebase', 'RxJS', 'NgRx', 'Tailwind CSS'],
      image: 'https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://taskmanager-demo.example.com',
      githubUrl: 'https://github.com/username/task-manager',
      featured: true,
      category: 'frontend'
    },
    {
      id: 3,
      title: 'Real-time Chat Application',
      description: 'Messaging platform with real-time updates, file sharing, and user presence',
      longDescription: 'A real-time chat application that enables seamless communication between users. Features include private and group chats, file sharing, read receipts, and online status indicators.',
      technologies: ['Angular', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
      image: 'https://images.pexels.com/photos/4126743/pexels-photo-4126743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://chat-demo.example.com',
      githubUrl: 'https://github.com/username/chat-app',
      featured: false,
      category: 'fullstack'
    },
    {
      id: 4,
      title: 'Fitness Tracker',
      description: 'Mobile application for tracking workouts, nutrition, and progress',
      longDescription: 'A cross-platform mobile application for fitness enthusiasts. Users can track workouts, monitor nutrition, set goals, view progress charts, and receive personalized recommendations.',
      technologies: ['Ionic', 'Angular', 'Capacitor', 'Firebase', 'Chart.js'],
      image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      demoUrl: 'https://fitness-tracker-demo.example.com',
      githubUrl: 'https://github.com/username/fitness-tracker',
      featured: true,
      category: 'mobile'
    },
    {
      id: 5,
      title: 'API Gateway Service',
      description: 'Microservice architecture gateway for authentication and routing',
      longDescription: 'A backend service that acts as a gateway for a microservice architecture. Handles authentication, request routing, rate limiting, and service discovery.',
      technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'Kubernetes', 'JWT'],
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      githubUrl: 'https://github.com/username/api-gateway',
      featured: false,
      category: 'backend'
    }
  ]);

  private experiences = new BehaviorSubject<Experience[]>([
    {
      id: 1,
      company: 'Tech Innovations Inc.',
      position: 'Senior Full-Stack Developer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: 'Leading development of customer-facing applications and internal tools. Architected and implemented microservice infrastructure that improved scalability and reduced deployment time by 40%.',
      technologies: ['Angular', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB'],
      logo: 'https://images.pexels.com/photos/15501304/pexels-photo-15501304/free-photo-of-tech-innovations-inc-text.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      company: 'Digital Solutions LLC',
      position: 'Full-Stack Developer',
      startDate: 'Mar 2019',
      endDate: 'Dec 2021',
      description: 'Developed and maintained multiple web applications for clients in healthcare and finance sectors. Implemented CI/CD pipelines that reduced deployment errors by 75%.',
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Jenkins', 'Azure'],
      logo: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      company: 'WebCraft Studios',
      position: 'Frontend Developer',
      startDate: 'Jun 2017',
      endDate: 'Feb 2019',
      description: 'Created responsive, cross-browser compatible web interfaces for e-commerce clients. Optimized application performance, reducing load time by 35%.',
      technologies: ['Angular', 'JavaScript', 'HTML', 'CSS', 'SASS', 'Webpack'],
      logo: 'https://images.pexels.com/photos/5926398/pexels-photo-5926398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]);

  private skills = new BehaviorSubject<Skill[]>([
    { name: 'Angular', icon: 'pi pi-code', level: 9, category: 'frontend' },
    { name: 'React', icon: 'pi pi-code', level: 8, category: 'frontend' },
    { name: 'TypeScript', icon: 'pi pi-code', level: 9, category: 'frontend' },
    { name: 'HTML/CSS', icon: 'pi pi-code', level: 9, category: 'frontend' },
    { name: 'Tailwind CSS', icon: 'pi pi-code', level: 8, category: 'frontend' },
    { name: 'PrimeNG', icon: 'pi pi-code', level: 9, category: 'frontend' },
    { name: 'RxJS', icon: 'pi pi-code', level: 8, category: 'frontend' },
    { name: 'Node.js', icon: 'pi pi-server', level: 8, category: 'backend' },
    { name: 'Express', icon: 'pi pi-server', level: 8, category: 'backend' },
    { name: 'MongoDB', icon: 'pi pi-database', level: 7, category: 'backend' },
    { name: 'PostgreSQL', icon: 'pi pi-database', level: 8, category: 'backend' },
    { name: 'RESTful APIs', icon: 'pi pi-server', level: 9, category: 'backend' },
    { name: 'GraphQL', icon: 'pi pi-server', level: 7, category: 'backend' },
    { name: 'Docker', icon: 'pi pi-box', level: 7, category: 'tools' },
    { name: 'Git', icon: 'pi pi-code-branch', level: 9, category: 'tools' },
    { name: 'CI/CD', icon: 'pi pi-replay', level: 8, category: 'tools' },
    { name: 'AWS', icon: 'pi pi-cloud', level: 7, category: 'tools' },
    { name: 'Testing (Jest, Jasmine)', icon: 'pi pi-check-square', level: 8, category: 'tools' }
  ]);

  getProjects(): Observable<Project[]> {
    return this.projects.asObservable();
  }

  getExperiences(): Observable<Experience[]> {
    return this.experiences.asObservable();
  }

  getSkills(): Observable<Skill[]> {
    return this.skills.asObservable();
  }

  getFeaturedProjects(): Observable<Project[]> {
    return new Observable<Project[]>(observer => {
      this.getProjects().subscribe(projects => {
        observer.next(projects.filter(project => project.featured));
        observer.complete();
      });
    });
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return new Observable<Project[]>(observer => {
      this.getProjects().subscribe(projects => {
        observer.next(category === 'all' 
          ? projects 
          : projects.filter(project => project.category === category));
        observer.complete();
      });
    });
  }

  getProjectById(id: number): Observable<Project | undefined> {
    return new Observable<Project | undefined>(observer => {
      this.getProjects().subscribe(projects => {
        observer.next(projects.find(project => project.id === id));
        observer.complete();
      });
    });
  }
}