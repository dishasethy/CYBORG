export type SubsystemType = 
  | 'robotics'
  | 'software' 
  | 'mechanical' 
  | 'electronics' 
  | 'embedded' 
  | 'autonomous' 
  | 'management'
  | 'web&automation';

export type AcademicYearType = 
  | 'sophomore' 
  | 'pre-final year' 
  | 'final year' 
  | 'alumni';

export interface IAlumniDetails {
  company?: string;
  designation?: string;
  graduationYear?: number;
  currentLocation?: string;
}

export interface IMember {
  name: string;
  github?: string;
  linkedin?: string;
  email?: string;
  subsystem: SubsystemType;
  year: AcademicYearType;
  role?: string;
  image?: string;
  projects?: string;
  alumniInfo?: IAlumniDetails;
  createdAt?: Date;
  updatedAt?: Date;
}
