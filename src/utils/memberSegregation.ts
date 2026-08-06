import { IMember, AcademicYearType, SubsystemType } from '../models/Member';

export interface SubsystemGroup<T = IMember> {
  subsystemKey: SubsystemType;
  subsystemLabel: string;
  badgeColor: string;
  members: T[];
}

export interface YearGroup<T = IMember> {
  yearKey: AcademicYearType;
  yearLabel: string;
  description: string;
  subsystems: SubsystemGroup<T>[];
  totalCount: number;
}

// Canonical display labels and metadata for Years
export const YEAR_METADATA: Record<AcademicYearType, { label: string; description: string; order: number }> = {
  'alumni': {
    label: 'ALUMNI MEMBERS & VETERANS',
    description: '',
    order: 1,
  },
  'final year': {
    label: 'FINAL YEAR MEMBERS',
    description: '',
    order: 2,
  },
  'pre-final year': {
    label: 'PRE-FINAL YEAR MEMBERS',
    description: '',
    order: 3,
  },
  'sophomore': {
    label: 'SOPHOMORE MEMBERS',
    description: '',
    order: 4,
  },
};

// Canonical display labels and colors for Subsystems
export const SUBSYSTEM_METADATA: Record<SubsystemType, { label: string; badgeColor: string; order: number }> = {
  'software': {
    label: 'Software & AI Systems',
    badgeColor: 'border-[#00F2FF]/40 text-[#00F2FF] bg-[#00F2FF]/10',
    order: 1,
  },
  'mechanical': {
    label: 'Mechanical & CAD Engineering',
    badgeColor: 'border-[#cfbdff]/40 text-[#cfbdff] bg-[#cfbdff]/10',
    order: 2,
  },
  'electronics': {
    label: 'Electronics & Hardware PCB',
    badgeColor: 'border-amber-400/40 text-amber-300 bg-amber-400/10',
    order: 3,
  },
  'embedded': {
    label: 'Embedded Systems & ROS2',
    badgeColor: 'border-emerald-400/40 text-emerald-300 bg-emerald-400/10',
    order: 4,
  },
  'autonomous': {
    label: 'Autonomous Navigation & SLAM',
    badgeColor: 'border-purple-400/40 text-purple-300 bg-purple-400/10',
    order: 5,
  },
  'management': {
    label: 'Operations & Public Relations',
    badgeColor: 'border-cyan-400/40 text-cyan-200 bg-cyan-400/10',
    order: 6,
  },
};

/**
 * Normalizes user input string for 'year' attribute to match canonical AcademicYearType
 */
export function normalizeYear(yearStr: string): AcademicYearType {
  const lowered = yearStr.trim().toLowerCase().replace(/[-_]/g, ' ');
  if (lowered.includes('alumni') || lowered.includes('alumini')) return 'alumni';
  if (lowered.includes('pre final') || lowered.includes('prefinal') || lowered.includes('3rd year')) return 'pre-final year';
  if (lowered.includes('final year') || lowered.includes('finalyear') || lowered === 'final' || lowered.includes('4th year')) return 'final year';
  if (lowered.includes('sophomore') || lowered.includes('2nd year') || lowered.includes('sophmore')) return 'sophomore';
  return 'sophomore';
}

/**
 * Normalizes user input string for 'subsystem' attribute to match canonical SubsystemType
 */
export function normalizeSubsystem(subsystemStr: string): SubsystemType {
  const lowered = subsystemStr.trim().toLowerCase();
  if (lowered.includes('soft') || lowered.includes('ai')) return 'software';
  if (lowered.includes('mech') || lowered.includes('cad')) return 'mechanical';
  if (lowered.includes('elec') || lowered.includes('pcb')) return 'electronics';
  if (lowered.includes('embed') || lowered.includes('ros')) return 'embedded';
  if (lowered.includes('auto') || lowered.includes('slam')) return 'autonomous';
  if (lowered.includes('manage') || lowered.includes('pr') || lowered.includes('lead')) return 'management';
  return 'software';
}

/**
 * Takes a list of raw member records and segregates them:
 * STEP 1: Segregate by Academic Year (Alumni, Final Year, Pre-Final Year, Sophomore)
 * STEP 2: Inside each Year, segregate by Subsystem (Software, Mechanical, Electronics, etc.)
 */
export function segregateMembersByYearAndSubsystem<T extends IMember>(members: T[]): YearGroup<T>[] {
  const canonicalYears: AcademicYearType[] = ['alumni', 'final year', 'pre-final year', 'sophomore'];
  
  // Step 1: Initialize Year Map
  const yearGroupsMap = new Map<AcademicYearType, Map<SubsystemType, T[]>>();

  canonicalYears.forEach(year => {
    yearGroupsMap.set(year, new Map<SubsystemType, T[]>());
  });

  // Step 2: Populate members into nested Year -> Subsystem buckets
  members.forEach(member => {
    const normYear = normalizeYear(member.year);
    const normSubsystem = normalizeSubsystem(member.subsystem);

    if (!yearGroupsMap.has(normYear)) {
      yearGroupsMap.set(normYear, new Map<SubsystemType, T[]>());
    }

    const subsystemMap = yearGroupsMap.get(normYear)!;
    if (!subsystemMap.has(normSubsystem)) {
      subsystemMap.set(normSubsystem, []);
    }

    subsystemMap.get(normSubsystem)!.push({
      ...member,
      year: normYear,
      subsystem: normSubsystem,
    });
  });

  // Step 3: Format into structured array for UI or API response
  const result: YearGroup<T>[] = [];

  canonicalYears.forEach(yearKey => {
    const subsystemMap = yearGroupsMap.get(yearKey);
    if (!subsystemMap) return;

    const subsystemGroups: SubsystemGroup<T>[] = [];
    let yearMemberCount = 0;

    const canonicalSubsystems: SubsystemType[] = [
      'software', 
      'mechanical', 
      'electronics', 
      'embedded', 
      'autonomous', 
      'management'
    ];

    canonicalSubsystems.forEach(subKey => {
      const subMembers = subsystemMap.get(subKey) || [];
      if (subMembers.length > 0) {
        yearMemberCount += subMembers.length;
        const subMeta = SUBSYSTEM_METADATA[subKey] || {
          label: subKey.toUpperCase(),
          badgeColor: 'border-white/30 text-white bg-white/10',
          order: 99
        };

        subsystemGroups.push({
          subsystemKey: subKey,
          subsystemLabel: subMeta.label,
          badgeColor: subMeta.badgeColor,
          members: subMembers,
        });
      }
    });

    if (yearMemberCount > 0) {
      const yearMeta = YEAR_METADATA[yearKey];
      result.push({
        yearKey,
        yearLabel: yearMeta.label,
        description: yearMeta.description,
        subsystems: subsystemGroups,
        totalCount: yearMemberCount,
      });
    }
  });

  return result;
}
