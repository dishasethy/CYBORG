import { Event } from '../types';

export interface ArchiveEvent {
  id: string;
  label: string;
  code: string;
}

export const activeEvents: Event[] = [
  {
    id: 'death-race',
    title: 'Death Race',
    phase: 'PHASE_01',
    tag: 'High Risk',
    date: 'NOV_07',
    venue: 'ARENA_S01',
    description: 'Combat-focused high-velocity obstacle traversal at terminal velocity. Structural integrity is optional. Victory is mandatory.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkXIOyHoyikiaGl7Ub7sv0LmMEkSw3F8fG-E5DslqfKdABVj9TYC7swpHZxZDagkuII2fyv29ZMsiBW4HkPg-xP6ps7X3C74AW4VPugVVCA8foObfEpYEZa6v5JkqqPmLQV0iMCNTBfzUMIxMiUvxlO85EaHx9Yz6JdXm9Q9MHQqQ9cyiIG3rdyoDQgZyVcpSYddEJxzxYcqfDxbRFaI3h-E5udfX_r1-I-hclFaPltgpbIkky_P8GTrvG85b0hgBMolBDXZETCmPp',
    riskLevel: 'high'
  },
  {
    id: 'robo-sumo',
    title: 'Robo Sumo',
    phase: 'PHASE_02',
    tag: 'Technical',
    date: 'NOV_10',
    venue: 'RING_R01',
    description: 'Pure torque and geometric weight distribution. Control the perimeter. Dominate the ring under direct cognitive synchronizations.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQqFxoA5dlsnJndCsZYkMm1Fj2TYHU1vNcSQSRBGsgYdzUu-Woj-xdhvbVdn6JJg6ZQmydoUjJCcImfPnQH8UmzOCgiL1yzE05v7qhwFUyKuueXbMoaq7NXhChf4KOPnhfVvJINLxbfPo8lEKrDr5RHcRvYgcwpMEK1k8DLicvv1MnwwqGJcL-XrSgF3K5y0Uy6g_i5XyPEIzlm4HE3RRXjQIdfRPhzbKlMjX1m7FhllAD7rh6qm0uiPw5K39wAqtz93ShxrIc8YHo',
    riskLevel: 'medium'
  },
  {
    id: 'hack-samagam',
    title: 'Hack Samagam',
    phase: 'PHASE_03',
    tag: 'Creative',
    date: 'JAN_18',
    venue: 'LAB_X04',
    description: 'Intense physical engineering hackathon focused on rapid neural interfaces, custom motor controllers, and rapid hardware prototyping.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ckz5C7n4GUl1lse-toZpg-z2GAkmWLMLFmQmmwTcqIoyS7LIZcpBleyIx_GVdBAQ8576s5feta38P0LuXce0DyXXxFtRpvDiYi44lvEklFTUdTOIy_c9u00MqHUcLtt12L3yd6clZ4ODe6yLsmWF6a51uM5tHSpgLdJg11ZD1AfmworIgTU-h-rIBO1IsS2TcIHMqhclGN-PFi6z26NB6Njofaz5Kxzzo5F2t_7Pfx_rB8ywBeU3q1dduiC_PQWR5WLCR6XW_PZx',
    riskLevel: 'creative'
  },
  {
    id: 'tread-o-quest',
    title: 'Tread-O-Quest',
    phase: 'PHASE_04',
    tag: 'Autonomous',
    date: 'JAN_27',
    venue: 'MAZE_B12',
    description: 'Autonomous high-precision pathfinding through complex dynamic maze structures. Human operational input: Absolute Zero.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy',
    riskLevel: 'autonomous'
  }
];

export const archiveEvents: ArchiveEvent[] = [
  { id: 'arc-1', label: 'FLIPKART GRID 4.0 FINALS', code: 'Q4_2023_DATALINK' },
  { id: 'arc-2', label: 'E-YANTRA CHALLENGE', code: 'Q3_2023_DATALINK' },
  { id: 'arc-3', label: 'DRDO DRONE FEST', code: 'Q2_2023_DATALINK' },
  { id: 'arc-4', label: 'INTERNAL HACKATHON V1', code: 'Q1_2023_DATALINK' }
];
