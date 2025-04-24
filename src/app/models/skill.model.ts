export interface Skill {
  name: string;
  icon: string; // Path to icon or CSS class
  level: number; // 1-10
  category: 'frontend' | 'backend' | 'tools' | 'other';
}