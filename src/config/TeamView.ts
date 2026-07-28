import { TeamMember } from '../types';

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

export const teamMembers: TeamMember[] = [
  // 1. Alumni
  {
    id: 'team-alumni1',
    name: 'Dr. Soumya Ranjan',
    role: 'Founding Member // AI Researcher at Google DeepMind',
    category: 'alumni',
    subsystem: 'software',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKM81b_c5twuQBSK3wO5hzZMXGs3NegkD6QHvd7jDI1bPkQiqmwBkk5eu3qNTlRVHh-6uWh_2rsooGT0LM1Kk32SIpgWdZz25T2LVDVFtnjXs431ijvmW37HZ-Z4knWwn4T4d9IsoUa88Kb36sx4e_2tm9JFaheYtQTCpD2xSYI8T9jXy8U7AyvAXFjkhzr2aBBL9IfMlHiV4GrFGOa57COloAqiTdbezV7U1nVlGFEpvIi3NBBRjM9J_lsiq5ZFmACI0ju7PT3BEQ',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'soumya.alumni@nitrkl.ac.in'
  },
  {
    id: 'team-alumni2',
    name: 'Siddharth Mohanty',
    role: 'Ex-Captain // Robotics Systems Architect at Boston Dynamics',
    category: 'alumni',
    subsystem: 'mechanical',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkXIOyHoyikiaGl7Ub7sv0LmMEkSw3F8fG-E5DslqfKdABVj9TYC7swpHZxZDagkuII2fyv29ZMsiBW4HkPg-xP6ps7X3C74AW4VPugVVCA8foObfEpYEZa6v5JkqqPmLQV0iMCNTBfzUMIxMiUvxlO85EaHx9Yz6JdXm9Q9MHQqQ9cyiIG3rdyoDQgZyVcpSYddEJxzxYcqfDxbRFaI3h-E5udfX_r1-I-hclFaPltgpbIkky_P8GTrvG85b0hgBMolBDXZETCmPp',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'siddharth.alumni@nitrkl.ac.in'
  },
  // 2. Final Year
  {
    id: 'team-rudra',
    name: 'Rudra N. Anjiwadekar',
    role: 'Club President // Core Mechanics Lead',
    category: 'final-year',
    subsystem: 'mechanical',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkZljaGvQgPLC060s1NnGpI4bSP_lAuIbYzMp-al7kl8etweSVtXLQMAXGtekC8uFeDIm86wQ9gdf32vYh1eaaEU0TnZFMnLL26MGM3tG_Ha-73jxvvvmJm4WSmctLeVPzm8qcn2YRO2nofP6r8cBFAJ3XofAEyIPxvH5JIOv6heYssEvHYZvgteH9jFqDW3bL8YmojThRrh51jOvv_9CE0a4GF7KdaD88uHHU59IUqdMP6dxmoyF6WWYb14tDMklc5wS7V81BVilD',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: '122me0896@nitrkl.ac.in'
  },
  {
    id: 'team-advait',
    name: 'Advait Sidana',
    role: 'Autonomous Systems & Deep Learning Lead',
    category: 'final-year',
    subsystem: 'software',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQqFxoA5dlsnJndCsZYkMm1Fj2TYHU1vNcSQSRBGsgYdzUu-Woj-xdhvbVdn6JJg6ZQmydoUjJCcImfPnQH8UmzOCgiL1yzE05v7qhwFUyKuueXbMoaq7NXhChf4KOPnhfVvJINLxbfPo8lEKrDr5RHcRvYgcwpMEK1k8DLicvv1MnwwqGJcL-XrSgF3K5y0Uy6g_i5XyPEIzlm4HE3RRXjQIdfRPhzbKlMjX1m7FhllAD7rh6qm0uiPw5K39wAqtz93ShxrIc8YHo',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'cyborg.team.nitr@gmail.com'
  },
  // 3. Pre-Final Year
  {
    id: 'team-priyanshi',
    name: 'Priyanshi S. Mohanty',
    role: 'ROS2 Navigation & Embedded Systems Coordinator',
    category: 'pre-final-year',
    subsystem: 'embedded',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ckz5C7n4GUl1lse-toZpg-z2GAkmWLMLFmQmmwTcqIoyS7LIZcpBleyIx_GVdBAQ8576s5feta38P0LuXce0DyXXxFtRpvDiYi44lvEklFTUdTOIy_c9u00MqHUcLtt12L3yd6clZ4ODe6yLsmWF6a51uM5tHSpgLdJg11ZD1AfmworIgTU-h-rIBO1IsS2TcIHMqhclGN-PFi6z26NB6Njofaz5Kxzzo5F2t_7Pfx_rB8ywBeU3q1dduiC_PQWR5WLCR6XW_PZx',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'cyborg.team.nitr@gmail.com'
  },
  {
    id: 'team-ritik',
    name: 'Ritik Senapati',
    role: 'Pneumatics & CAD Design Architect',
    category: 'pre-final-year',
    subsystem: 'mechanical',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkZljaGvQgPLC060s1NnGpI4bSP_lAuIbYzMp-al7kl8etweSVtXLQMAXGtekC8uFeDIm86wQ9gdf32vYh1eaaEU0TnZFMnLL26MGM3tG_Ha-73jxvvvmJm4WSmctLeVPzm8qcn2YRO2nofP6r8cBFAJ3XofAEyIPxvH5JIOv6heYssEvHYZvgteH9jFqDW3bL8YmojThRrh51jOvv_9CE0a4GF7KdaD88uHHU59IUqdMP6dxmoyF6WWYb14tDMklc5wS7V81BVilD',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'cyborg.team.nitr@gmail.com'
  },
  // 4. Sophomore
  {
    id: 'team-tanmay',
    name: 'Tanmay K. Biswal',
    role: 'Computer Vision & SLAM Specialist',
    category: 'sophomore',
    subsystem: 'software',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'cyborg.team.nitr@gmail.com'
  },
  {
    id: 'team-ananya',
    name: 'Ananya Sharma',
    role: 'Firmware & Sensor Fusion Engineer',
    category: 'sophomore',
    subsystem: 'electronics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ckz5C7n4GUl1lse-toZpg-z2GAkmWLMLFmQmmwTcqIoyS7LIZcpBleyIx_GVdBAQ8576s5feta38P0LuXce0DyXXxFtRpvDiYi44lvEklFTUdTOIy_c9u00MqHUcLtt12L3yd6clZ4ODe6yLsmWF6a51uM5tHSpgLdJg11ZD1AfmworIgTU-h-rIBO1IsS2TcIHMqhclGN-PFi6z26NB6Njofaz5Kxzzo5F2t_7Pfx_rB8ywBeU3q1dduiC_PQWR5WLCR6XW_PZx',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'ananya.sophomore@nitrkl.ac.in'
  }
];
