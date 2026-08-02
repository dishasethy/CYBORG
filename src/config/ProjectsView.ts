import { Project } from '../types';
import projectsData from '../utils/projects_details.json';

export interface ProjectCategoryFilter {
  id: string;
  label: string;
}

function mapProjectCategory(name: string, body: string, idx: number): string {
  const s = `${name} ${body}`.toLowerCase();
  if (s.includes('telemetry') || s.includes('app') || s.includes('database') || s.includes('web')) return 'telemetry';
  if (s.includes('drone') || s.includes('aerial') || s.includes('flight') || s.includes('reinforcement')) return 'neural';
  if (s.includes('arm') || s.includes('gripper') || s.includes('actuator') || s.includes('feeder')) return 'systems';
  if (s.includes('vehicle') || s.includes('igvc') || s.includes('ground') || s.includes('robot') || s.includes('maze')) return 'robotics';
  
  const categories = ['robotics', 'neural', 'telemetry', 'systems'];
  return categories[idx % categories.length];
}

export const projects: Project[] = projectsData.projects.map((proj, idx) => {
  const category = mapProjectCategory(proj.name, proj.body, idx);
  const tags = proj["tech stack"] || [];
  const statusLabels = ['OPERATIONAL', 'STABLE', 'ONLINE', 'TESTING'];

  return {
    id: `proj-${proj.id}`,
    title: proj.name,
    description: proj.body,
    tags: tags,
    category: category,
    image: proj.image,
    flagship: idx === 0, // Make the first project flagship
    meta: `TECH STACK: ${tags.slice(0, 3).join(', ')}`,
    statusLabel: statusLabels[idx % statusLabels.length],
    contributors: proj.contributors || []
  };
});

export const projectCategories: ProjectCategoryFilter[] = [
  { id: 'all', label: 'All MAIN_NODES' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'neural', label: 'Neural AI' },
  { id: 'telemetry', label: 'Telemetry' },
  { id: 'systems', label: 'Systems' }
];
