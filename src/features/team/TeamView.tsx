import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Plus, X, Cpu, Terminal, Layers, Database, CheckCircle2, User, Building, MapPin, Award } from 'lucide-react';
import { YearGroup, segregateMembersByYearAndSubsystem } from '../../utils/memberSegregation';
import { IMember, AcademicYearType, SubsystemType } from '../../models/Member';
import { teamMembers, DEFAULT_MEMBER_AVATAR } from '../../constants';

// Local fallback using teamMembers converted to IMember
const mappedStatic: IMember[] = teamMembers.map(m => ({
  name: m.name,
  github: m.github || '',
  linkedin: m.linkedin || '',
  email: m.email || '',
  subsystem: (m.subsystem as SubsystemType) || 'software',
  year: (m.category === 'alumni' ? 'alumni' : m.category === 'final-year' ? 'final year' : m.category === 'pre-final-year' ? 'pre-final year' : 'sophomore') as AcademicYearType,
  role: m.role,
  image: m.image,
  projects: m.projects || '',
  alumniInfo: m.category === 'alumni' ? {
    company: m.work_degree || '',
    designation: m.subsystem || 'Alumnus',
    graduationYear: parseInt(m.batch || '2025') || 2025
  } : undefined
}));

const initialSegregatedGroups = segregateMembersByYearAndSubsystem(mappedStatic);

export default function TeamView() {
  const [viewMode, setViewMode] = useState<'segregated' | 'flat'>('segregated');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('final year');
  const [memberList, setMemberList] = useState<IMember[]>(mappedStatic);
  const [segregatedGroups, setSegregatedGroups] = useState<YearGroup<IMember>[]>(initialSegregatedGroups);
  const [isAddingMember, setIsAddingMember] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form state for creating new member record
  const [formData, setFormData] = useState<{
    name: string;
    github: string;
    linkedin: string;
    email: string;
    subsystem: SubsystemType;
    year: AcademicYearType;
    role: string;
    image: string;
    alumniCompany: string;
    alumniDesignation: string;
    alumniGradYear: string;
    alumniLocation: string;
  }>({
    name: '',
    github: '',
    linkedin: '',
    email: '',
    subsystem: 'software',
    year: 'sophomore',
    role: '',
    image: '',
    alumniCompany: '',
    alumniDesignation: '',
    alumniGradYear: '2023',
    alumniLocation: ''
  });

  // Fetch or load initial members in the background
  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch('/api/members/segregated');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setSegregatedGroups(json.data);
            // Flatten for flat view
            const allFetched: IMember[] = [];
            json.data.forEach((yG: YearGroup<IMember>) => {
              yG.subsystems.forEach(sG => {
                allFetched.push(...sG.members);
              });
            });
            setMemberList(allFetched);
          }
        }
      } catch (err) {
        console.warn('API fetch deferred, using static fallback seed records');
      }
    }

    loadMembers();
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newRecord: IMember = {
      name: formData.name.trim(),
      github: formData.github.trim(),
      linkedin: formData.linkedin.trim(),
      email: formData.email.trim(),
      subsystem: formData.subsystem,
      year: formData.year,
      role: formData.role.trim() || `${formData.subsystem.toUpperCase()} Operator`,
      image: formData.image.trim() || DEFAULT_MEMBER_AVATAR,
      ...(formData.year === 'alumni' && {
        alumniInfo: {
          company: formData.alumniCompany,
          designation: formData.alumniDesignation,
          graduationYear: parseInt(formData.alumniGradYear) || 2023,
          currentLocation: formData.alumniLocation,
        }
      })
    };

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });

      if (response.ok) {
        const json = await response.json();
        setSuccessToast(`Member "${formData.name}" saved in MongoDB schema successfully!`);
      } else {
        setSuccessToast(`Member "${formData.name}" added to local memory!`);
      }
    } catch (err) {
      setSuccessToast(`Member "${formData.name}" added to local registry!`);
    }

    // Update local state and re-segregate immediately
    const updatedList = [newRecord, ...memberList];
    setMemberList(updatedList);
    setSegregatedGroups(segregateMembersByYearAndSubsystem(updatedList));

    setIsAddingMember(false);
    setFormData({
      name: '',
      github: '',
      linkedin: '',
      email: '',
      subsystem: 'software',
      year: 'sophomore',
      role: '',
      image: '',
      alumniCompany: '',
      alumniDesignation: '',
      alumniGradYear: '2023',
      alumniLocation: ''
    });

    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Page Header */}
      <section id="team-header-panel" className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#494551]/20 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00F2FF] rounded-full animate-ping" />
            <span className="font-mono text-[9px] text-[#00F2FF] tracking-widest uppercase">MONGO_DB SCHEMA STRUCTURE // LIVE</span>
          </div>
          <h2 className="font-cyber text-xl md:text-3xl font-black text-white uppercase tracking-tight mt-1">
            CYBORG_ROSTER_SEGREGATION
          </h2>
          <p className="font-mono text-[10px] text-[#948e9c] mt-1">
            SORTED HIERARCHICALLY :: ACADEMIC YEAR → SUBSYSTEM
          </p>
        </div>

        {/* Action controls */}

      </section>

      {/* Success Notification Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="neo-card p-4 rounded-xl border border-emerald-500/50 bg-emerald-950/30 text-emerald-300 font-mono text-xs flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Year Level Quick Navigation Filter Tabs */}
      {viewMode === 'segregated' && (
        <div className="flex flex-wrap items-center gap-2 border-b border-[#494551]/20 pb-4 font-mono text-xs">
          <span className="text-[#948e9c] text-[10px] uppercase font-bold mr-2">FILTER YEAR:</span>
          {[
            { id: 'final year', label: 'FINAL YEAR' },
            { id: 'pre-final year', label: 'PRE-FINAL YEAR' },
            { id: 'sophomore', label: 'SOPHOMORE' },
            { id: 'alumni', label: 'ALUMNI' },
          ].map((yearTab) => {
            const isActive = selectedYearFilter === yearTab.id;
            return (
              <button
                key={yearTab.id}
                onClick={() => setSelectedYearFilter(yearTab.id)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase transition-all cursor-pointer neo-btn ${isActive
                  ? 'bg-[#00F2FF]/20 text-[#00F2FF] border border-[#00F2FF]/60'
                  : 'text-[#cac4d2] border border-[#494551]/30 hover:border-[#00F2FF]/30'
                  }`}
              >
                {yearTab.label}
              </button>
            );
          })}
        </div>
      )}

      {viewMode === 'segregated' ? (
        /* HIERARCHICAL SEGREGATION VIEW: YEAR -> SUBSYSTEM -> MEMBERS */
        <div className="space-y-16">
          {segregatedGroups
            .filter(g => g.yearKey === selectedYearFilter)
            .map((yearGroup) => (
              <div key={yearGroup.yearKey} className="space-y-8 py-2">
                {/* LEVEL 1: ACADEMIC YEAR HEADER */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#00F2FF]/30 pb-4 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#00F2FF]" />
                      <h3 className="font-cyber font-black text-lg md:text-2xl text-white uppercase tracking-tight">
                        {yearGroup.yearLabel}
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-[#cac4d2] mt-1">{yearGroup.description}</p>
                  </div>

                  <div className="neo-btn px-3 py-1.5 rounded-xl border border-[#00F2FF]/40 font-mono text-xs text-[#00F2FF] font-bold">
                    {yearGroup.totalCount} {yearGroup.totalCount === 1 ? 'MEMBER' : 'MEMBERS'}
                  </div>
                </div>

                {/* YEAR MEMBERS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                  {[...yearGroup.subsystems.flatMap((subGroup) => subGroup.members)]
                    .sort((a, b) => {
                      const findIndex = (member: IMember) => memberList.findIndex(m => 
                        m.name.toLowerCase().trim() === member.name.toLowerCase().trim() &&
                        (m.email?.toLowerCase().trim() === member.email?.toLowerCase().trim() ||
                         m.github?.toLowerCase().trim() === member.github?.toLowerCase().trim())
                      );
                      return findIndex(a) - findIndex(b);
                    })
                    .map((member, idx) => (
                      <motion.div
                        key={`${member.name}-${idx}`}
                        whileHover={{ y: -4 }}
                        className="neo-card rounded-2xl overflow-hidden flex flex-col justify-between border border-[#494551]/30 hover:border-[#00F2FF]/60 transition-all p-3 space-y-3 group h-full"
                      >
                        <div className="space-y-3">
                          {/* Avatar Header */}
                          <div className="relative h-60 bg-[#0b0a11] rounded-xl overflow-hidden neo-inset">
                            <img
                              alt={member.name}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                              referrerPolicy="no-referrer"
                              src={member.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy'}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d13] via-transparent to-transparent pointer-events-none" />
                          </div>

                          {/* Name & Role */}
                          <div>
                            <h4 className="font-cyber font-bold text-sm text-white group-hover:text-[#00F2FF] transition-colors leading-tight">
                              {member.name}
                            </h4>
                            <p className="font-sans text-xs text-[#cac4d2] mt-1 leading-relaxed line-clamp-2">
                              {member.role || `${member.subsystem.toUpperCase()} Engineer`}
                            </p>
                          </div>

                          {/* Alumni Details Card */}
                          {member.year === 'alumni' && member.alumniInfo && (
                            <div className="neo-inset p-2.5 rounded-xl border border-amber-500/20 space-y-1 font-mono text-[10px] text-amber-200">
                              <div className="flex items-center gap-1 font-bold">
                                <Building className="w-3 h-3 text-amber-400" />
                                <span>{member.alumniInfo.company || 'Alumni Tech Lab'}</span>
                              </div>
                              <div className="text-[#cac4d2]">
                                {member.alumniInfo.designation || 'Engineer'} ({member.alumniInfo.graduationYear || '2023'})
                              </div>
                              {member.alumniInfo.currentLocation && (
                                <div className="flex items-center gap-1 text-[#948e9c]">
                                  <MapPin className="w-2.5 h-2.5" />
                                  <span>{member.alumniInfo.currentLocation}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Social Links Bar */}
                        <div className="pt-3 border-t border-[#494551]/20 flex items-center justify-between font-mono text-[10px]">
                          <div className="flex gap-2">
                            {member.github && (
                              <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 neo-btn rounded-lg text-[#cac4d2] hover:text-[#00F2FF] transition-colors"
                                title="GitHub"
                              >
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 neo-btn rounded-lg text-[#cac4d2] hover:text-[#00F2FF] transition-colors"
                                title="LinkedIn"
                              >
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="p-1.5 neo-btn rounded-lg text-[#cac4d2] hover:text-white transition-colors"
                                title="Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <span className="text-[#948e9c] text-[9px] font-mono uppercase tracking-wider">{member.subsystem}</span>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        /* FLAT GRID VIEW OF ALL OPERATORS */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-5">
          {memberList.map((member, idx) => (
            <div key={idx} className="neo-card p-3 rounded-2xl space-y-3 flex flex-col justify-between border border-[#494551]/30 h-full">
              <div className="space-y-3">
                <div className="h-60 bg-black rounded-xl overflow-hidden neo-inset relative">
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    src={member.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy'}
                  />
                </div>
                <div className="flex justify-between items-start">
                  <h4 className="font-cyber font-bold text-sm text-white">{member.name}</h4>
                  <span className="neo-btn text-[8px] font-mono px-2 py-0.5 rounded text-[#00F2FF] border border-[#00F2FF]/30 uppercase">
                    {member.year}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#cac4d2]">{member.role}</p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#494551]/20 font-mono text-[9px]">
                <div className="flex gap-2">
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-[#cac4d2] hover:text-[#00F2FF]">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#cac4d2] hover:text-[#00F2FF]">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <span className="text-[#cfbdff] uppercase tracking-wider">{member.subsystem}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM: SAVE NEW MEMBER DATA TO MONGO DB */}
      <AnimatePresence>
        {isAddingMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl neo-card rounded-2xl p-6 md:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsAddingMember(false)}
                className="absolute top-4 right-4 p-2 rounded-xl neo-btn text-[#cac4d2] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#00F2FF] font-mono text-xs">
                  <Database className="w-4 h-4" />
                  <span>LOCAL REGISTRY STORAGE WRITER</span>
                </div>
                <h3 className="font-cyber font-bold text-xl text-white uppercase tracking-tight">
                  REGISTER MEMBER RECORD
                </h3>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
                {/* Name */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-[#cac4d2] uppercase block">
                    FULL NAME <span className="text-[#00F2FF]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshi S. Mohanty"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full neo-inset px-4 py-3 rounded-xl bg-black/40 text-white border border-[#494551]/40 focus:border-[#00F2FF] outline-none"
                  />
                </div>

                {/* Subsystem & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#cac4d2] uppercase block">
                      SUBSYSTEM <span className="text-[#00F2FF]">*</span>
                    </label>
                    <select
                      value={formData.subsystem}
                      onChange={e => setFormData({ ...formData, subsystem: e.target.value as SubsystemType })}
                      className="w-full neo-inset px-4 py-3 rounded-xl bg-black text-white border border-[#494551]/40 focus:border-[#00F2FF] outline-none font-mono"
                    >
                      <option value="software">Software &amp; AI</option>
                      <option value="mechanical">Mechanical &amp; CAD</option>
                      <option value="electronics">Electronics &amp; PCB</option>
                      <option value="embedded">Embedded &amp; ROS2</option>
                      <option value="autonomous">Autonomous &amp; SLAM</option>
                      <option value="management">Management &amp; PR</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#cac4d2] uppercase block">
                      ACADEMIC YEAR / STATUS <span className="text-[#00F2FF]">*</span>
                    </label>
                    <select
                      value={formData.year}
                      onChange={e => setFormData({ ...formData, year: e.target.value as AcademicYearType })}
                      className="w-full neo-inset px-4 py-3 rounded-xl bg-black text-white border border-[#494551]/40 focus:border-[#00F2FF] outline-none font-mono"
                    >
                      <option value="sophomore">Sophomore</option>
                      <option value="pre-final year">Pre-Final Year</option>
                      <option value="final year">Final Year</option>
                      <option value="alumni">Alumni</option>
                    </select>
                  </div>
                </div>

                {/* Social links: GitHub & LinkedIn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#cac4d2] uppercase block">
                      GITHUB PROFILE URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.github}
                      onChange={e => setFormData({ ...formData, github: e.target.value })}
                      className="w-full neo-inset px-4 py-3 rounded-xl bg-black/40 text-white border border-[#494551]/40 focus:border-[#00F2FF] outline-none font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#cac4d2] uppercase block">
                      LINKEDIN PROFILE URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin}
                      onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full neo-inset px-4 py-3 rounded-xl bg-black/40 text-white border border-[#494551]/40 focus:border-[#00F2FF] outline-none font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* Role description & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#cac4d2] uppercase block">
                      ROLE / SPECIALIZATION
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ROS2 DDS Architect"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="w-full neo-inset px-4 py-3 rounded-xl bg-black/40 text-white border border-[#494551]/40 focus:border-[#00F2FF] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-[#cac4d2] uppercase block">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      placeholder="operator@nitrkl.ac.in"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full neo-inset px-4 py-3 rounded-xl bg-black/40 text-white border border-[#494551]/40 focus:border-[#00F2FF] outline-none font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* Conditional Alumni Fields */}
                {formData.year === 'alumni' && (
                  <div className="p-4 rounded-xl neo-card bg-amber-950/20 border border-amber-500/30 space-y-3">
                    <span className="font-mono text-[10px] text-amber-300 font-bold uppercase block">
                      ALUMNI PLACEMENT DETAILS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Current Company (e.g. Google)"
                        value={formData.alumniCompany}
                        onChange={e => setFormData({ ...formData, alumniCompany: e.target.value })}
                        className="w-full neo-inset p-2.5 rounded-lg bg-black text-white border border-amber-500/30 font-mono text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Designation (e.g. AI Staff Scientist)"
                        value={formData.alumniDesignation}
                        onChange={e => setFormData({ ...formData, alumniDesignation: e.target.value })}
                        className="w-full neo-inset p-2.5 rounded-lg bg-black text-white border border-amber-500/30 font-mono text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Graduation Year (e.g. 2022)"
                        value={formData.alumniGradYear}
                        onChange={e => setFormData({ ...formData, alumniGradYear: e.target.value })}
                        className="w-full neo-inset p-2.5 rounded-lg bg-black text-white border border-amber-500/30 font-mono text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Current Location (e.g. California)"
                        value={formData.alumniLocation}
                        onChange={e => setFormData({ ...formData, alumniLocation: e.target.value })}
                        className="w-full neo-inset p-2.5 rounded-lg bg-black text-white border border-amber-500/30 font-mono text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingMember(false)}
                    className="px-5 py-2.5 rounded-xl neo-btn font-mono text-xs text-[#cac4d2] hover:text-white cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-mono text-xs text-white bg-[#00F2FF]/20 border border-[#00F2FF]/60 hover:bg-[#00F2FF]/40 font-bold flex items-center gap-2 neo-btn cursor-pointer"
                  >
                    <Database className="w-4 h-4 text-[#00F2FF]" />
                    <span>SAVE TO MONGO DB</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
