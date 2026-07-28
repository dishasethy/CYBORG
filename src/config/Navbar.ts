export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'items', label: 'Inventory' },
  { id: 'events', label: 'Events' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'team', label: 'Team' },
];

export const initialTerminalLogs: string[] = [
  'UPLINK STATUS: SECURE_V2',
  'AI CORE INITIALIZED',
  'TYPE HELP FOR COMMANDS'
];
