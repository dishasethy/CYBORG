import { Achievement } from '../types';
import achievementsData from '../utils/achievements.json';

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

export const achievements: Achievement[] = achievementsData.achievements.map((m, idx) => {
  // Extract year/date cleanly
  let dateStr = String(m["Year Of Participation"] || '').split(' ')[0];
  if (dateStr === 'nan') dateStr = '2025';

  return {
    id: `ach-${idx + 1}`,
    title: `${m["Award/Rank Achieved"].trim()} - ${m["Competition Name"].trim()}`,
    category: m["Members"].trim().toUpperCase(),
    status: `VERIFIED // ${dateStr}`,
    logId: `LOG_${String(9000 + idx).padStart(4, '0')}`,
    verified: true
  };
});

// Calculate stats based on JSON
const totalAchievements = achievementsData.achievements.length;
const winnersCount = achievementsData.achievements.filter(m => 
  m["Award/Rank Achieved"].toLowerCase().includes('winner') || 
  m["Award/Rank Achieved"].toLowerCase().includes('1st') ||
  m["Award/Rank Achieved"].toLowerCase().includes('champion')
).length;

export const achievementStats: AchievementStat[] = [
  { label: 'Total Verified', value: String(totalAchievements), glow: 'purple' },
  { label: 'Championships', value: String(winnersCount), glow: 'cyan' },
  { label: 'Logged Members', value: '15+', glow: 'purple' },
  { label: 'Success Ratio', value: '100%', glow: 'cyan' }
];

export const verifiedDecryptionLogs: DecryptionLog[] = achievementsData.achievements
  .filter(m => m["Brief Description"] && m["Brief Description"].trim() !== 'nan')
  .map((m, idx) => ({
    logId: `UPLINK LOG // LOG_${String(5000 + idx).padStart(4, '0')}`,
    title: `${m["Award/Rank Achieved"].trim()} - ${m["Competition Name"].trim()}`,
    description: `${m["Brief Description"].trim()} (Members: ${m["Members"].trim()})`,
    glowBorder: idx % 2 === 0 ? 'purple' : 'cyan'
  }));
