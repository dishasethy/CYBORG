import { Achievement } from '../types';

export interface AchievementStat {
  label: string;
  value: string;
  glow: 'purple' | 'cyan';
}

export interface DecryptionLog {
  logId: string;
  title: string;
  description: string;
  glowBorder: 'purple' | 'cyan';
}

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '1st Place Flipkart GRID 4.0 Robotics',
    category: 'NATIONAL CHAMPIONS',
    status: 'VERIFIED // SECURE_LOG',
    logId: 'LOG_8023A',
    verified: true
  },
  {
    id: 'ach-2',
    title: 'e-Yantra National Finals Podium',
    category: 'DRONE AUTONOMY',
    status: 'VERIFIED // SECURE_LOG',
    logId: 'LOG_7012B',
    verified: true
  },
  {
    id: 'ach-3',
    title: 'DRDO Drone Fest Special Innovation',
    category: 'SWARM DECISIONS',
    status: 'VERIFIED // SECURE_LOG',
    logId: 'LOG_6914X',
    verified: true
  },
  {
    id: 'ach-4',
    title: 'Smart India Hackathon Winners',
    category: 'HARDWARE AUTOMATION',
    status: 'VERIFIED // SECURE_LOG',
    logId: 'LOG_5511C',
    verified: true
  },
  {
    id: 'ach-5',
    title: 'Inter-NIT Robotics Gold Medalists',
    category: 'COMPETITION MATCH',
    status: 'VERIFIED // SECURE_LOG',
    logId: 'LOG_4200M',
    verified: true
  },
  {
    id: 'ach-6',
    title: 'Best Mechanical Prototype Award',
    category: 'PNEUMATICS LAB',
    status: 'VERIFIED // SECURE_LOG',
    logId: 'LOG_3108E',
    verified: true
  }
];

export const achievementStats: AchievementStat[] = [
  { label: 'National Golds', value: '12+', glow: 'purple' },
  { label: 'Total Funding', value: '₹15L+', glow: 'cyan' },
  { label: 'Publications', value: '08', glow: 'purple' },
  { label: 'Members Placed', value: '100%', glow: 'cyan' }
];

export const verifiedDecryptionLogs: DecryptionLog[] = [
  {
    logId: 'UPLINK LOG // SIH_2023',
    title: 'Smart India Hackathon Grand Finale Winners',
    description: 'Secured first rank in hardware automation domain for autonomous ground vehicle pathing and obstacle detection.',
    glowBorder: 'purple'
  },
  {
    logId: 'UPLINK LOG // EY_2023',
    title: 'e-Yantra Drone Pathfinding Excellence',
    description: 'Constructed an embedded aerial drone with neural flight controller for GPS-denied indoor autonomous flight.',
    glowBorder: 'cyan'
  }
];
