import { Project } from '../types';

export interface ProjectCategoryFilter {
  id: string;
  label: string;
}

export const projects: Project[] = [
  {
    id: 'proj-agv',
    title: 'Autonomous AGV',
    description: 'Industrial-grade Autonomous Ground Vehicle leveraging LiDAR SLAM navigation nodes, RTK GPS, and dynamic B-spline path planning algorithms for precise warehouse automation and obstacle avoidance.',
    tags: ['LiDAR', 'SLAM', 'ROS2', 'C++'],
    category: 'robotics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkXIOyHoyikiaGl7Ub7sv0LmMEkSw3F8fG-E5DslqfKdABVj9TYC7swpHZxZDagkuII2fyv29ZMsiBW4HkPg-xP6ps7X3C74AW4VPugVVCA8foObfEpYEZa6v5JkqqPmLQV0iMCNTBfzUMIxMiUvxlO85EaHx9Yz6JdXm9Q9MHQqQ9cyiIG3rdyoDQgZyVcpSYddEJxzxYcqfDxbRFaI3h-E5udfX_r1-I-hclFaPltgpbIkky_P8GTrvG85b0hgBMolBDXZETCmPp',
    flagship: true,
    meta: 'CORE UPTIME: 1400H // PRECISION: 2MM',
    statusLabel: 'OPERATIONAL'
  },
  {
    id: 'proj-neural',
    title: 'Neural Flight Controller',
    description: 'High-frequency flight stabilization system utilizing custom deep reinforcement learning networks running on onboard coral edge accelerators to counteract turbulent wind-shear in real-time.',
    tags: ['TensorFlow', 'Edge AI', 'IMU Matrix', 'Python'],
    category: 'neural',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQqFxoA5dlsnJndCsZYkMm1Fj2TYHU1vNcSQSRBGsgYdzUu-Woj-xdhvbVdn6JJg6ZQmydoUjJCcImfPnQH8UmzOCgiL1yzE05v7qhwFUyKuueXbMoaq7NXhChf4KOPnhfVvJINLxbfPo8lEKrDr5RHcRvYgcwpMEK1k8DLicvv1MnwwqGJcL-XrSgF3K5y0Uy6g_i5XyPEIzlm4HE3RRXjQIdfRPhzbKlMjX1m7FhllAD7rh6qm0uiPw5K39wAqtz93ShxrIc8YHo',
    flagship: false,
    meta: 'LATENCY: 1.2MS // EFFICIENCY: 98.4%',
    statusLabel: 'STABLE'
  },
  {
    id: 'proj-telemetry',
    title: 'Custom Telemetry Hub',
    description: 'Ultra-low latency wireless transceiver system broadcasting sub-GHz multi-channel sensor matrices, thermal grids, and high-frequency actuator states over secure RF protocols.',
    tags: ['Sub-GHz', 'SPI Bus', 'RTOS', 'Embedded C'],
    category: 'telemetry',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ckz5C7n4GUl1lse-toZpg-z2GAkmWLMLFmQmmwTcqIoyS7LIZcpBleyIx_GVdBAQ8576s5feta38P0LuXce0DyXXxFtRpvDiYi44lvEklFTUdTOIy_c9u00MqHUcLtt12L3yd6clZ4ODe6yLsmWF6a51uM5tHSpgLdJg11ZD1AfmworIgTU-h-rIBO1IsS2TcIHMqhclGN-PFi6z26NB6Njofaz5Kxzzo5F2t_7Pfx_rB8ywBeU3q1dduiC_PQWR5WLCR6XW_PZx',
    flagship: false,
    meta: 'BANDWIDTH: 4.8MBPS // THREADS: 8',
    statusLabel: 'ONLINE'
  },
  {
    id: 'proj-gripper',
    title: 'Cybernetic Gripper S4',
    description: 'An advanced 4-degrees-of-freedom carbon-fiber robotic arm end-effector integrating resistive force-feedback matrices for delicate force-sensitive hardware manipulation.',
    tags: ['Mechanics', 'Force Sensors', 'SolidWorks', 'FEA'],
    category: 'systems',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy',
    flagship: false,
    meta: 'TORQUE: 45NM // ACTUATORS: DYNAMIXEL',
    statusLabel: 'TESTING'
  }
];

export const projectCategories: ProjectCategoryFilter[] = [
  { id: 'all', label: 'All MAIN_NODES' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'neural', label: 'Neural AI' },
  { id: 'telemetry', label: 'Telemetry' },
  { id: 'systems', label: 'Systems' }
];
