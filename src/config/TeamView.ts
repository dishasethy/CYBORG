import { TeamMember } from '../types';
import teamMemberDetails from '../utils/team_member_details.json';

export interface TeamCategoryFilter {
  id: string;
  label: string;
}

export const teamCategories: TeamCategoryFilter[] = [
  { id: 'all', label: 'All Operators' },
  { id: 'alumni', label: 'Alumni' },
  { id: 'final-year', label: 'Final Year' },
  { id: 'pre-final-year', label: 'Pre-Final Year' },
  { id: 'sophomore', label: 'Sophomore' }
];

// Map subsystem strings to the normalized tags used by the frontend filters
function mapJsonSubsystem(sub: string): string {
  const s = (sub || '').toLowerCase().trim();
  if (s.includes('web') || s.includes('automation')) return 'web&automation';
  if (s.includes('robotics')) return 'robotics';
  if (s.includes('mech') || s.includes('cad')) return 'mechanical';
  if (s.includes('elec') || s.includes('pcb')) return 'electronics';
  if (s.includes('embed') || s.includes('ros')) return 'embedded';
  if (s.includes('auto') || s.includes('slam')) return 'autonomous';
  if (s.includes('manage') || s.includes('pr') || s.includes('lead') || s.includes('creat')) return 'management';
  return 'software';
}

export const teamMembers: TeamMember[] = [
  // 1. Final Year
  ...teamMemberDetails.final_year.map((m, idx) => ({
    id: `final-year-${idx}`,
    name: m.name.trim(),
    role: m.role || 'Final Year Member',
    category: 'final-year' as const,
    subsystem: mapJsonSubsystem(m.subsystem || m.role),
    image: m.image || '',
    github: m.github || '',
    linkedin: m.linkedin || '',
    email: m.email || '',
    projects: m.projects || ''
  })),

  // 2. Pre-Final Year
  ...teamMemberDetails.pre_final_year.map((m, idx) => ({
    id: `pre-final-year-${idx}`,
    name: m.name.trim(),
    role: m.role || 'Pre-Final Year Coordinator',
    category: 'pre-final-year' as const,
    subsystem: mapJsonSubsystem(m.subsystem || m.role),
    image: m.image || '',
    github: m.github || '',
    linkedin: m.linkedin || '',
    email: m.email || '',
    projects: m.projects || ''
  })),

  // 3. Sophomore
  ...teamMemberDetails.sophmore.map((m, idx) => ({
    id: `sophomore-${idx}`,
    name: m.name.trim(),
    role: m.role || 'Sophomore Member',
    category: 'sophomore' as const,
    subsystem: mapJsonSubsystem(m.subsystem || m.role),
    image: m.image || '',
    github: m.github || '',
    linkedin: m.linkedin || '',
    email: m.email || '',
    projects: m.projects || ''
  })),

  // 4. Alumni
  ...teamMemberDetails.alumni.map((m, idx) => ({
    id: `alumni-${idx}`,
    name: m.name.trim(),
    role: m.role || 'Alumnus',
    category: 'alumni' as const,
    subsystem: m.subsystem || 'Alumnus', // This represents their industry title/designation
    image: m.image || '',
    github: m.github || '',
    linkedin: m.linkedin || '',
    email: m.email || '',
    work_degree: m.work_degree || '',
    batch: m.batch || ''
  }))
];
