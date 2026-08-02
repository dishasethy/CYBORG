export interface Event {
  id: string;
  title: string;
  category?: string;
  date: string;
  status?: 'upcoming' | 'ongoing' | 'completed';
  venue: string;
  description: string;
  image?: string;
  registrationUrl?: string;
  phase?: string;
  riskLevel?: 'high' | 'medium' | 'low' | 'creative' | 'autonomous';
  tag?: string;
  ps?: string | null;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status?: string;
  completion?: number;
  subsystem?: string;
  lead?: string;
  description: string;
  techStack?: string[];
  image?: string;
  githubUrl?: string;
  flagship?: boolean;
  statusLabel?: string;
  tags?: string[];
  meta?: string;
  contributors?: { name: string; image: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'alumni' | 'final-year' | 'pre-final-year' | 'sophomore' | 'final' | 'pre-final';
  subsystem?: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  projects?: string;
  work_degree?: string;
  batch?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  status: string;
  logId: string;
  verified: boolean;
}

export interface UserSession {
  isLoggedIn: boolean;
  name?: string;
  email?: string;
  rollNumber?: string;
  department?: string;
  role?: string;
  avatar?: string;
}
