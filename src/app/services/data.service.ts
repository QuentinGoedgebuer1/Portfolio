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
      title: 'Fininsy',
      description: 'Plateforme permettant de consulter les différents actifs boursier, de gérer ces finances personnelles et de pouvoir gérer son budget.',
      technologies: ['Angular', 'Primeng', 'Tailwindcss', '.Net', 'API', 'SQL Server', 'Docker', 'Jenkins', 'VPS'],
      image: 'https://www.affacturage.fr/img/produits/budget.jpg',
      demoUrl: 'https://goedgebuer.com/fininsy',
      githubUrl: 'https://github.com/QuentinGoedgebuer1/Portfolio/tree/main/src/app/components/fininsy',
      featured: true,
      category: 'fullstack'
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
    { name: 'Angular', icon: 'pi pi-code', level: 7, category: 'frontend' },
    { name: 'Vuejs', icon: 'pi pi-code', level: 8, category: 'frontend' },
    { name: 'TypeScript', icon: 'pi pi-code', level: 8, category: 'frontend' },
    { name: 'Tailwind CSS', icon: 'pi pi-code', level: 6, category: 'frontend' },
    { name: 'PrimeNG', icon: 'pi pi-code', level: 6, category: 'frontend' },
    { name: '.Net', icon: 'pi pi-server', level: 8, category: 'backend' },
    { name: 'Node.js', icon: 'pi pi-server', level: 6, category: 'backend' },
    { name: 'PostgreSQL', icon: 'pi pi-database', level: 6, category: 'backend' },
    { name: 'SQL Server', icon: 'pi pi-database', level: 8, category: 'backend' },
    { name: 'API', icon: 'pi pi-server', level: 8, category: 'backend' },
    { name: 'Docker', icon: 'pi pi-box', level: 6, category: 'tools' },
    { name: 'Git', icon: 'pi pi-code-branch', level: 8, category: 'tools' },
    { name: 'Jenkins', icon: 'pi pi-replay', level: 5, category: 'tools' },
    { name: 'Azure', icon: 'pi pi-cloud', level: 6, category: 'tools' }
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