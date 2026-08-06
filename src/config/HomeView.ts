export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  heightClass: string;
}

export interface DivisionOverview {
  title: string;
  notebookText: string;
  location: string;
  email: string;
}

export interface FacultyAdvisor {
  name: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  image: string;
}

export interface ClubPresidentInfo {
  name: string;
  title: string;
  memberId: string;
  phone: string;
  email: string;
  image: string;
}

export const sponsors: Sponsor[] = [


  {
    id: 'sponsor-solidworks',
    name: 'SolidWorks Logo',
    logoUrl: 'https://res.cloudinary.com/diml2eds6/image/upload/v1720209377/solidworks_d04csf.png',
    heightClass: 'h-10 md:h-12'
  },
  {
    id: 'sponsor-ansys',
    name: 'Ansys Logo',
    logoUrl: 'https://res.cloudinary.com/diml2eds6/image/upload/v1720209376/ansys_tof9ob.png',
    heightClass: 'h-8 md:h-10'
  }
];

export const divisionOverview: DivisionOverview = {
  title: 'Cyborg Division',
  notebookText: '"Operating at the intersection of embedded hardware, neural computing architectures, and physical mechanics. Our lab focuses on building scalable autonomous ground and aerial systems that bridge the gap between theoretical models and robust physical execution."',
  location: 'SAC NIT Rourkela EC 440, Odisha, Pin-769008',
  email: 'cyborg.team.nitr@gmail.com'
};

export const facultyAdvisor: FacultyAdvisor = {
  name: 'Prof. Ayas Kanta Swain',
  designation: 'Assistant Professor',
  department: '',
  phone: '0661-26462458',
  email: 'swainA@nitrkl.ac.in',
  image: 'https://res.cloudinary.com/dlrhikaak/image/upload/v1786007628/1110949_bsh1h9.jpg'
};

export const clubPresident: ClubPresidentInfo = {
  name: 'Harprosad Mandal',
  title: 'Club President',
  memberId: '',
  phone: '+91 7077871779',
  email: 'harprosadmandal@gmail.com',
  image: 'https://res.cloudinary.com/diml2eds6/image/upload/v1719347348/IMG_4070_-_Harprosad_Mandal_ra5ptd.jpg'
};

