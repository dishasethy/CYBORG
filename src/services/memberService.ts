import { IMember, SubsystemType, AcademicYearType } from '../models/Member';
import { segregateMembersByYearAndSubsystem, YearGroup } from '../utils/memberSegregation';
import teamMemberDetails from '../utils/team_member_details.json';

export type { IMember, SubsystemType, AcademicYearType };

// Map JSON subsystem string to valid subsystem name
function mapJsonSubsystem(sub: string): SubsystemType {
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

const STATIC_MEMBERS: IMember[] = [
  // 1. Final Year
  ...teamMemberDetails.final_year.map((m) => ({
    name: m.name.trim(),
    github: m.github || '',
    linkedin: m.linkedin || '',
    email: m.email || '',
    subsystem: mapJsonSubsystem(m.subsystem || m.role),
    year: 'final year' as AcademicYearType,
    role: m.role || 'Final Year Member',
    image: m.image || '',
    projects: m.projects || ''
  })),

  // 2. Pre-Final Year
  ...teamMemberDetails.pre_final_year.map((m) => ({
    name: m.name.trim(),
    github: m.github || '',
    linkedin: m.linkedin || '',
    email: m.email || '',
    subsystem: mapJsonSubsystem(m.subsystem || m.role),
    year: 'pre-final year' as AcademicYearType,
    role: m.role || 'Pre-Final Year Coordinator',
    image: m.image || '',
    projects: m.projects || ''
  })),

  // 3. Sophomore
  ...teamMemberDetails.sophmore.map((m) => ({
    name: m.name.trim(),
    github: m.github || '',
    linkedin: m.linkedin || '',
    email: m.email || '',
    subsystem: mapJsonSubsystem(m.subsystem || m.role),
    year: 'sophomore' as AcademicYearType,
    role: m.role || 'Sophomore Member',
    image: m.image || '',
    projects: m.projects || ''
  })),

  // 4. Alumni
  ...teamMemberDetails.alumni.map((m) => ({
    name: m.name.trim(),
    github: m.github || '',
    linkedin: m.linkedin || '',
    email: m.email || '',
    subsystem: mapJsonSubsystem(m.subsystem),
    year: 'alumni' as AcademicYearType,
    role: m.role || 'Alumnus',
    image: m.image || '',
    alumniInfo: {
      company: m.work_degree || '',
      designation: m.subsystem || 'Alumnus',
      graduationYear: parseInt(m.batch) || 2025
    }
  }))
];

let memoryStore: IMember[] = [...STATIC_MEMBERS];

export async function getAllMembers(): Promise<IMember[]> {
  return memoryStore;
}

export async function createNewMember(memberData: any): Promise<{ member: IMember; savedToDb: boolean }> {
  const newMemberRecord: IMember = {
    name: memberData.name.trim(),
    github: memberData.github?.trim() || '',
    linkedin: memberData.linkedin?.trim() || '',
    email: memberData.email?.trim() || '',
    subsystem: memberData.subsystem as SubsystemType,
    year: memberData.year as AcademicYearType,
    role: memberData.role?.trim() || `${memberData.subsystem.toUpperCase()} Operator`,
    image: memberData.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy',
    alumniInfo: memberData.alumniInfo,
  };

  memoryStore.unshift(newMemberRecord);
  return { member: newMemberRecord, savedToDb: false };
}

export async function getSegregatedMembers(): Promise<YearGroup<IMember>[]> {
  const members = await getAllMembers();
  return segregateMembersByYearAndSubsystem(members);
}

