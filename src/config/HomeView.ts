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
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAWkCepxJxMxuWkpKFjLs7BKRccpS-UxHpYz8cP4TKN-b4FvJaqGBvF3DbXM7Rq9j0LbweFzSTLF0b05zr9l8R7wRZSHgbV28ociCz08mDWKLWrKHLHewjtBV2702eBfO9xotX8pYNAm5MK9dxvHjDMy67tVGLJb7Zj9LEltz8dYO5qXdb1_xe5scblTqLO3FakNDjt_sIc-oPYJ2VxxYIG6_HSoee7QOPclc9v2GkzhxWB9F8twu9pO58TNfdEr3CERB9SHmAP5_Q',
    heightClass: 'h-10 md:h-12'
  },
  {
    id: 'sponsor-ansys',
    name: 'Ansys Logo',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdM2y3xf3LILupk_b4zd8N4qbL5GPLwkZgWSf4FspJQZanKSz9RG_IfxAf7vDnXsRcRYGubh2gSuMwNr56V7JkGhZn3Hbj5EaPQLKpT4w42Q2NC_EtSDBgM6m8umZuRlwKe8_SJ6L5tg_JBCQbpqiKXKGG4B6o4faZHNjHYuZuZ_amt8FTg-2RgmCw0xXmSWb_DGs6V-R3mco5uF9rNeO0_rDxFGOQ3pFsC_cTkG4FkrirTdKzWdUFw11Sbi8c_0vHyJK2fgE1Y536',
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

