export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  technologies: string[];
  logo?: string;
}