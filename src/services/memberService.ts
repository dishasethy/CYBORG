import MemberModel, { IMember } from '../models/Member';
import { connectMongoDB } from '../db/mongo';
import { segregateMembersByYearAndSubsystem, YearGroup } from '../utils/memberSegregation';

// Initial seed members dataset covering Alumni, Final Year, Pre-Final Year, Sophomore and different subsystems
const INITIAL_SEED_MEMBERS: IMember[] = [
  // 1. Alumni Members
  {
    name: 'Dr. Soumya Ranjan',
    github: 'https://github.com/soumya-ai',
    linkedin: 'https://linkedin.com/in/soumya-ranjan',
    email: 'soumya.alumni@nitrkl.ac.in',
    subsystem: 'software',
    year: 'alumni',
    role: 'Founding Lead // Senior AI Researcher at Google DeepMind',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKM81b_c5twuQBSK3wO5hzZMXGs3NegkD6QHvd7jDI1bPkQiqmwBkk5eu3qNTlRVHh-6uWh_2rsooGT0LM1Kk32SIpgWdZz25T2LVDVFtnjXs431ijvmW37HZ-Z4knWwn4T4d9IsoUa88Kb36sx4e_2tm9JFaheYtQTCpD2xSYI8T9jXy8U7AyvAXFjkhzr2aBBL9IfMlHiV4GrFGOa57COloAqiTdbezV7U1nVlGFEpvIi3NBBRjM9J_lsiq5ZFmACI0ju7PT3BEQ',
    alumniInfo: {
      company: 'Google DeepMind',
      designation: 'Senior AI Staff Scientist',
      graduationYear: 2021,
      currentLocation: 'London, UK'
    }
  },
  {
    name: 'Siddharth Mohanty',
    github: 'https://github.com/sid-robotics',
    linkedin: 'https://linkedin.com/in/siddharth-mohanty',
    email: 'siddharth.alumni@nitrkl.ac.in',
    subsystem: 'mechanical',
    year: 'alumni',
    role: 'Ex-Captain // Robotics Systems Architect at Boston Dynamics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkXIOyHoyikiaGl7Ub7sv0LmMEkSw3F8fG-E5DslqfKdABVj9TYC7swpHZxZDagkuII2fyv29ZMsiBW4HkPg-xP6ps7X3C74AW4VPugVVCA8foObfEpYEZa6v5JkqqPmLQV0iMCNTBfzUMIxMiUvxlO85EaHx9Yz6JdXm9Q9MHQqQ9cyiIG3rdyoDQgZyVcpSYddEJxzxYcqfDxbRFaI3h-E5udfX_r1-I-hclFaPltgpbIkky_P8GTrvG85b0hgBMolBDXZETCmPp',
    alumniInfo: {
      company: 'Boston Dynamics',
      designation: 'Principal Mechanical Architect',
      graduationYear: 2022,
      currentLocation: 'Waltham, MA'
    }
  },
  {
    name: 'Suhani Parida',
    github: 'https://github.com/suhani-pcb',
    linkedin: 'https://linkedin.com/in/suhani-parida',
    email: 'suhani.alumni@nitrkl.ac.in',
    subsystem: 'electronics',
    year: 'alumni',
    role: 'Former PCB Hardware Lead // Hardware Engineer at Qualcomm',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ckz5C7n4GUl1lse-toZpg-z2GAkmWLMLFmQmmwTcqIoyS7LIZcpBleyIx_GVdBAQ8576s5feta38P0LuXce0DyXXxFtRpvDiYi44lvEklFTUdTOIy_c9u00MqHUcLtt12L3yd6clZ4ODe6yLsmWF6a51uM5tHSpgLdJg11ZD1AfmworIgTU-h-rIBO1IsS2TcIHMqhclGN-PFi6z26NB6Njofaz5Kxzzo5F2t_7Pfx_rB8ywBeU3q1dduiC_PQWR5WLCR6XW_PZx',
    alumniInfo: {
      company: 'Qualcomm',
      designation: 'Senior Power Electronics Engineer',
      graduationYear: 2023,
      currentLocation: 'San Diego, CA'
    }
  },

  // 2. Final Year Members
  {
    name: 'Rudra N. Anjiwadekar',
    github: 'https://github.com/rudra-cyborg',
    linkedin: 'https://linkedin.com/in/rudra-anjiwadekar',
    email: '122me0896@nitrkl.ac.in',
    subsystem: 'mechanical',
    year: 'final year',
    role: 'Club President // Core Mechanical & Pneumatics Architect',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkZljaGvQgPLC060s1NnGpI4bSP_lAuIbYzMp-al7kl8etweSVtXLQMAXGtekC8uFeDIm86wQ9gdf32vYh1eaaEU0TnZFMnLL26MGM3tG_Ha-73jxvvvmJm4WSmctLeVPzm8qcn2YRO2nofP6r8cBFAJ3XofAEyIPxvH5JIOv6heYssEvHYZvgteH9jFqDW3bL8YmojThRrh51jOvv_9CE0a4GF7KdaD88uHHU59IUqdMP6dxmoyF6WWYb14tDMklc5wS7V81BVilD'
  },
  {
    name: 'Advait Sidana',
    github: 'https://github.com/advait-ai',
    linkedin: 'https://linkedin.com/in/advait-sidana',
    email: 'advait.cyborg@nitrkl.ac.in',
    subsystem: 'software',
    year: 'final year',
    role: 'Autonomous Systems & Deep Learning Core Lead',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQqFxoA5dlsnJndCsZYkMm1Fj2TYHU1vNcSQSRBGsgYdzUu-Woj-xdhvbVdn6JJg6ZQmydoUjJCcImfPnQH8UmzOCgiL1yzE05v7qhwFUyKuueXbMoaq7NXhChf4KOPnhfVvJINLxbfPo8lEKrDr5RHcRvYgcwpMEK1k8DLicvv1MnwwqGJcL-XrSgF3K5y0Uy6g_i5XyPEIzlm4HE3RRXjQIdfRPhzbKlMjX1m7FhllAD7rh6qm0uiPw5K39wAqtz93ShxrIc8YHo'
  },
  {
    name: 'Ayan Mukherjee',
    github: 'https://github.com/ayan-embedded',
    linkedin: 'https://linkedin.com/in/ayan-mukherjee',
    email: 'ayan.cyborg@nitrkl.ac.in',
    subsystem: 'embedded',
    year: 'final year',
    role: 'ROS2 DDS & Real-Time Microcontroller Architect',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy'
  },

  // 3. Pre-Final Year Members
  {
    name: 'Priyanshi S. Mohanty',
    github: 'https://github.com/priyanshi-dev',
    linkedin: 'https://linkedin.com/in/priyanshi-mohanty',
    email: 'priyanshi.cyborg@nitrkl.ac.in',
    subsystem: 'embedded',
    year: 'pre-final year',
    role: 'ROS2 Navigation & Microcontroller Coordinator',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ckz5C7n4GUl1lse-toZpg-z2GAkmWLMLFmQmmwTcqIoyS7LIZcpBleyIx_GVdBAQ8576s5feta38P0LuXce0DyXXxFtRpvDiYi44lvEklFTUdTOIy_c9u00MqHUcLtt12L3yd6clZ4ODe6yLsmWF6a51uM5tHSpgLdJg11ZD1AfmworIgTU-h-rIBO1IsS2TcIHMqhclGN-PFi6z26NB6Njofaz5Kxzzo5F2t_7Pfx_rB8ywBeU3q1dduiC_PQWR5WLCR6XW_PZx'
  },
  {
    name: 'Ritik Senapati',
    github: 'https://github.com/ritik-cad',
    linkedin: 'https://linkedin.com/in/ritik-senapati',
    email: 'ritik.cyborg@nitrkl.ac.in',
    subsystem: 'mechanical',
    year: 'pre-final year',
    role: 'Pneumatics & SolidWorks CAD Design Lead',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkZljaGvQgPLC060s1NnGpI4bSP_lAuIbYzMp-al7kl8etweSVtXLQMAXGtekC8uFeDIm86wQ9gdf32vYh1eaaEU0TnZFMnLL26MGM3tG_Ha-73jxvvvmJm4WSmctLeVPzm8qcn2YRO2nofP6r8cBFAJ3XofAEyIPxvH5JIOv6heYssEvHYZvgteH9jFqDW3bL8YmojThRrh51jOvv_9CE0a4GF7KdaD88uHHU59IUqdMP6dxmoyF6WWYb14tDMklc5wS7V81BVilD'
  },
  {
    name: 'Divya N. Sahoo',
    github: 'https://github.com/divya-software',
    linkedin: 'https://linkedin.com/in/divya-sahoo',
    email: 'divya.cyborg@nitrkl.ac.in',
    subsystem: 'software',
    year: 'pre-final year',
    role: 'Computer Vision & YOLO Object Detection Lead',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKM81b_c5twuQBSK3wO5hzZMXGs3NegkD6QHvd7jDI1bPkQiqmwBkk5eu3qNTlRVHh-6uWh_2rsooGT0LM1Kk32SIpgWdZz25T2LVDVFtnjXs431ijvmW37HZ-Z4knWwn4T4d9IsoUa88Kb36sx4e_2tm9JFaheYtQTCpD2xSYI8T9jXy8U7AyvAXFjkhzr2aBBL9IfMlHiV4GrFGOa57COloAqiTdbezV7U1nVlGFEpvIi3NBBRjM9J_lsiq5ZFmACI0ju7PT3BEQ'
  },

  // 4. Sophomore Members
  {
    name: 'Tanmay K. Biswal',
    github: 'https://github.com/tanmay-biswal',
    linkedin: 'https://linkedin.com/in/tanmay-biswal',
    email: 'tanmay.cyborg@nitrkl.ac.in',
    subsystem: 'software',
    year: 'sophomore',
    role: 'Computer Vision & SLAM Specialist',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy'
  },
  {
    name: 'Ananya Sharma',
    github: 'https://github.com/ananya-sharma',
    linkedin: 'https://linkedin.com/in/ananya-sharma',
    email: 'ananya.cyborg@nitrkl.ac.in',
    subsystem: 'electronics',
    year: 'sophomore',
    role: 'Firmware & Sensor Fusion Engineer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Ckz5C7n4GUl1lse-toZpg-z2GAkmWLMLFmQmmwTcqIoyS7LIZcpBleyIx_GVdBAQ8576s5feta38P0LuXce0DyXXxFtRpvDiYi44lvEklFTUdTOIy_c9u00MqHUcLtt12L3yd6clZ4ODe6yLsmWF6a51uM5tHSpgLdJg11ZD1AfmworIgTU-h-rIBO1IsS2TcIHMqhclGN-PFi6z26NB6Njofaz5Kxzzo5F2t_7Pfx_rB8ywBeU3q1dduiC_PQWR5WLCR6XW_PZx'
  },
  {
    name: 'Karan Malhotra',
    github: 'https://github.com/karan-cad',
    linkedin: 'https://linkedin.com/in/karan-malhotra',
    email: 'karan.cyborg@nitrkl.ac.in',
    subsystem: 'mechanical',
    year: 'sophomore',
    role: 'Chassis Fabrication & Stress Simulation Associate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQqFxoA5dlsnJndCsZYkMm1Fj2TYHU1vNcSQSRBGsgYdzUu-Woj-xdhvbVdn6JJg6ZQmydoUjJCcImfPnQH8UmzOCgiL1yzE05v7qhwFUyKuueXbMoaq7NXhChf4KOPnhfVvJINLxbfPo8lEKrDr5RHcRvYgcwpMEK1k8DLicvv1MnwwqGJcL-XrSgF3K5y0Uy6g_i5XyPEIzlm4HE3RRXjQIdfRPhzbKlMjX1m7FhllAD7rh6qm0uiPw5K39wAqtz93ShxrIc8YHo'
  }
];

// In-memory fallback array to guarantee response when live DB connection is absent
let memoryStore: IMember[] = [...INITIAL_SEED_MEMBERS];

/**
 * Retrieves all members from MongoDB (or in-memory cache)
 */
export async function getAllMembers(): Promise<IMember[]> {
  const isDbConnected = await connectMongoDB();

  if (isDbConnected) {
    try {
      const count = await MemberModel.countDocuments();
      if (count === 0) {
        await MemberModel.insertMany(INITIAL_SEED_MEMBERS);
        console.log('[MongoDB] Seeded initial members into database collection.');
      }
      const docs = await MemberModel.find().lean();
      return docs as IMember[];
    } catch (error) {
      console.error('[MongoDB Error] Fetching members failed, using memory cache:', error);
    }
  }

  return memoryStore;
}

/**
 * Saves a new member into MongoDB (and memory store)
 */
export async function createNewMember(memberData: IMember): Promise<{ member: IMember; savedToDb: boolean }> {
  const newMemberRecord: IMember = {
    name: memberData.name.trim(),
    github: memberData.github?.trim() || '',
    linkedin: memberData.linkedin?.trim() || '',
    email: memberData.email?.trim() || '',
    subsystem: memberData.subsystem,
    year: memberData.year,
    role: memberData.role?.trim() || `${memberData.subsystem.toUpperCase()} Operator`,
    image: memberData.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy',
    alumniInfo: memberData.alumniInfo,
  };

  // Always update memory store
  memoryStore.unshift(newMemberRecord);

  const isDbConnected = await connectMongoDB();
  let savedToDb = false;

  if (isDbConnected) {
    try {
      const createdDoc = await MemberModel.create(newMemberRecord);
      savedToDb = true;
      console.log('[MongoDB] Member successfully persisted:', createdDoc._id);
    } catch (err) {
      console.error('[MongoDB Error] Could not save member document:', err);
    }
  }

  return { member: newMemberRecord, savedToDb };
}

/**
 * Returns members fully segregated:
 * PRIMARY LEVEL: Year (Alumni -> Final Year -> Pre-Final Year -> Sophomore)
 * SECONDARY LEVEL: Subsystem (Software -> Mechanical -> Electronics -> Embedded -> Autonomous -> Management)
 */
export async function getSegregatedMembers(): Promise<YearGroup<IMember>[]> {
  const members = await getAllMembers();
  return segregateMembersByYearAndSubsystem(members);
}
