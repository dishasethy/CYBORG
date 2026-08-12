import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Rocket, Mail, MapPin, Phone, Award, Cpu } from 'lucide-react';
import ParticleText from '../ui/fragment/ParticleText';
import { sponsors, divisionOverview, facultyAdvisor, clubPresident } from '../../config/HomeView';
import SectionConnector from '../ui/fragment/SectionConnector';
import { Qwigley } from 'next/font/google';

const qwigley = Qwigley({
  subsets: ['latin'],
  weight: ['400'],
});

interface HomeViewProps {
  onNavigate: (tab: string) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const [activeDomain, setActiveDomain] = useState<number>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-14 sm:space-y-16"
    >
      {/* Hero Section */}
      <section id="home-hero-section" className="min-h-[75vh] sm:min-h-[85vh] flex flex-col items-center justify-center text-center relative -pt-6 pb-4">
        <motion.div variants={itemVariants} className="max-w-7xl w-full mx-auto space-y-8 px-4">

          {/* Interactive Cinematic Logo Character Split with Particles */}
          <div className="py-2 w-full">
            <ParticleText />
            <p className="font-cyber text-[9px] sm:text-[11px] md:text-xs tracking-[0.2em] sm:tracking-[0.35em] md:tracking-[0.45em] text-[#00F2FF] mt-4 font-semibold uppercase">
              The Official Robotics &amp; automation club of NITR
            </p>
          </div>

          {/* Core Description Text */}
          <p className="font-sans text-base md:text-xl text-[#cac4d2] max-w-2xl mx-auto leading-relaxed font-light">
            Welcome to <span className="text-white font-bold">CYBORG</span>, where imagination meets innovation! A dynamic ensemble of students at <span className="text-[#cfbdff] font-medium">NIT Rourkela</span>, driven by a shared passion for robotics and cognitive computing.
          </p>

          <h2 className={`${qwigley.className} text-2xl sm:text-3xl md:text-4xl text-[#9a83db] text-glow-purple normal-case`}>
            " Where every idea sparks a new possibility "
          </h2>



        </motion.div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors-section" className="py-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#494551]/30"></div>
            <h3 className="font-cyber text-[10px] text-[#948e9c] uppercase tracking-[0.3em]">Our Proud Sponsors</h3>
            <div className="h-[1px] w-12 bg-[#494551]/30"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.id}
                whileHover={{ scale: 1.08 }}
                className="flex items-center justify-center cursor-pointer transition-all duration-300"
              >
                <Image
                  alt={sponsor.name}
                  className={`${sponsor.heightClass} w-auto object-contain filter opacity-85 hover:opacity-100 transition-opacity`}
                  src={sponsor.logoUrl}
                  width={400}
                  height={120}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Domains Section */}
      <section id="club-domains" className="py-8 max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col space-y-8">
          <div>
            <span className="font-cyber text-[10px] tracking-[0.25em] text-[#cfbdff] uppercase font-bold">
              DEPARTMENT_DIRECTIVES
            </span>
            <h3 className="font-cyber font-black text-3xl md:text-4xl text-white uppercase tracking-tight mt-2">
              OUR DOMAINS
            </h3>
          </div>

          {/* Desktop Accordion Grid (Vertical Tab Hover Layout with Liquid Glass and Color Images) */}
          <div className="w-full h-[500px] hidden md:flex rounded-3xl overflow-hidden border border-[#494551]/30 bg-[#0c0a12]/50 backdrop-blur-md">
            {[
              {
                name: 'Robotics',
                caption: 'Push the boundaries of physical kinematics and control systems.',
                desc: 'Embedded systems, kinematics, path planning, and autonomous navigation architectures.',
                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=cover&w=800&q=80'
              },
              {
                name: 'Electronics',
                caption: 'Architecting high-frequency micro-current control systems.',
                desc: 'PCB design, microcontrollers, sensor integration, and signal conditioning arrays.',
                image: 'https://images.unsplash.com/photo-1517055727180-d5a0c797fb9a?auto=format&fit=cover&w=800&q=80'
              },
              {
                name: 'Mechanical',
                caption: 'Crafting structural frameworks with sub-millimeter errors.',
                desc: 'CAD design, 3D fabrication, stress analysis, and physical chassis assembly.',
                image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=cover&w=800&q=80'
              },
              {
                name: 'Web & Automation',
                caption: 'Pioneering physical-cyber control networks and UI panels.',
                desc: 'Next-gen interfaces, control systems routing, and software-hardware bridging.',
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=cover&w=800&q=80'
              },
              {
                name: 'Management',
                caption: 'Driving strategic resource optimization and sponsor relations.',
                desc: 'Strategic planning, sponsor outreach, logistics mainframe, and public relations.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=cover&w=800&q=80'
              }
            ].map((domain, index) => {
              const isActive = activeDomain === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveDomain(index)}
                  className={`relative h-full flex flex-col justify-between p-8 border-r border-[#494551]/30 cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden select-none last:border-r-0
                    ${isActive ? 'flex-[3.5] bg-gradient-to-br from-white/8 to-black/45 border-t border-t-white/20 border-l border-l-white/15' : 'flex-1 bg-gradient-to-br from-white/3 to-black/20'}
                    backdrop-blur-[20px] saturate-[180%] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.12),_0_8px_24px_rgba(0,0,0,0.35)]
                  `}
                >
                  {/* Absolute Background Image with Vignette */}
                  <div
                    className={`absolute inset-0 z-0 transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none
                      ${isActive ? 'opacity-45' : 'opacity-0'}
                    `}
                  >
                    <Image
                      src={domain.image}
                      alt={domain.name}
                      fill
                      className="object-cover transition-all duration-400"
                      sizes="600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a12] via-transparent to-black/30" />
                  </div>

                  {/* Top Caption (Visible only when active) */}
                  <div className={`relative z-10 w-full transition-all duration-400 delay-75
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
                  `}>
                    <span className="font-cyber text-[8px] tracking-[0.25em] text-[#cfbdff] font-bold block mb-1">
                      DIRECTIVE_0{index + 1}
                    </span>
                    <p className="font-sans text-[10px] text-white/90 leading-relaxed uppercase tracking-wider">
                      {domain.caption}
                    </p>
                  </div>

                  {/* Middle Title */}
                  <div className="relative z-10 w-full flex flex-col items-start mt-auto">
                    <h4 className="font-cyber font-black text-2xl transition-all duration-300 text-white uppercase tracking-tight">
                      {domain.name}
                    </h4>

                    {/* Active description */}
                    <div className={`transition-all duration-400 overflow-hidden
                      ${isActive ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0'}
                    `}>
                      <p className="font-sans text-xs text-[#cac4d2]/90 leading-relaxed">
                        {domain.desc}
                      </p>
                    </div>
                  </div>

                  {/* Big Number watermark (Bottom Right) */}
                  <div className="absolute bottom-4 right-4 z-1 select-none pointer-events-none opacity-10 transition-all">
                    <span className="font-cyber font-black text-8xl text-white leading-none block">
                      {index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Accordion Stack Layout */}
          <div className="flex flex-col space-y-4 md:hidden">
            {[
              { name: 'Robotics', desc: 'Embedded systems, kinematics, path planning, and autonomous navigation architectures.' },
              { name: 'Electronics', desc: 'PCB design, microcontrollers, sensor integration, and signal conditioning arrays.' },
              { name: 'Mechanical', desc: 'CAD design, 3D fabrication, stress analysis, and physical chassis assembly.' },
              { name: 'Web & Automation', desc: 'Next-gen interfaces, control systems routing, and software-hardware bridging.' },
              { name: 'Management', desc: 'Strategic planning, sponsor outreach, logistics mainframe, and public relations.' }
            ].map((domain, index) => (
              <div
                key={index}
                className="relative flex flex-col p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-black/40 backdrop-blur-[20px] saturate-[180%] overflow-hidden shadow-[inset_1px_1px_2px_rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-cyber font-bold text-lg text-white uppercase">{domain.name}</h4>
                  <span className="font-mono text-xs text-[#cfbdff]">0{index + 1}</span>
                </div>
                <p className="font-sans text-xs text-[#cac4d2]/90 mt-2 leading-relaxed">
                  {domain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Bento Grid */}
      <section id="info-bento-grid" className="pt-12 pb-7 max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Division Overview Card (7 columns) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-7 neo-card neo-card-cyan rounded-2xl p-8 flex flex-col justify-between border-l-4 border-l-[#cfbdff] hover:border-l-[#00F2FF] relative overflow-hidden group"
            id="card-division-overview"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00F2FF]/5 group-hover:bg-[#00F2FF]/15 blur-3xl rounded-full transition-all duration-500 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl neo-btn flex items-center justify-center">
                    <Cpu className="text-[#cfbdff] group-hover:text-[#00F2FF] w-5 h-5 transition-colors duration-300" />
                  </div>
                  <h4 className="font-cyber text-lg tracking-wider text-white uppercase">{divisionOverview.title}</h4>
                </div>
              </div>

              <div className="relative pl-4 border-l-2 border-[#cfbdff]/40 my-3 neo-inset rounded-r-xl p-4">
                <p className="font-note text-xl md:text-2xl text-[#e9e1ff] leading-relaxed tracking-wide font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                  {divisionOverview.notebookText}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#494551]/20 mt-4 relative z-10">
              <div className="space-y-1">
                <span className="font-cyber text-[9px] tracking-wider text-[#948e9c] uppercase block">LOCATION</span>
                <p className="text-xs font-semibold text-white flex items-center gap-2 group-hover:text-[#cfbdff] transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#00F2FF]" />
                  {divisionOverview.location}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-cyber text-[9px] tracking-wider text-[#948e9c] uppercase block">DIRECT EMAIL</span>
                <p className="text-xs font-semibold text-[#cfbdff] flex items-center gap-2 group-hover:text-[#00F2FF] transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  {divisionOverview.email}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Faculty Advisor Card (5 columns) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 neo-card rounded-2xl p-8 flex flex-col justify-between border-l-4 border-l-purple-500 relative overflow-hidden group"
            id="card-faculty-advisor"
          >
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/5 group-hover:bg-purple-500/15 blur-3xl rounded-full transition-all duration-500 pointer-events-none" />

            <div className="space-y-4 relative z-10 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl neo-btn flex items-center justify-center">
                    <Award className="text-[#cfbdff] group-hover:text-[#00F2FF] w-5 h-5 transition-colors duration-300" />
                  </div>
                  <h4 className="font-cyber text-lg tracking-wider text-white uppercase">Faculty Advisor</h4>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 pt-2">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden neo-inset p-1.5 shrink-0 group-hover:border-[#00F2FF]/60 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300">
                  <Image
                    alt={facultyAdvisor.name}
                    className="w-full h-full object-cover object-top rounded-xl grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    src={facultyAdvisor.image}
                    width={150}
                    height={150}
                  />
                </div>
                <div className="space-y-1">
                  <h5 className="font-sans font-bold text-base text-white group-hover:text-[#cfbdff] transition-colors">{facultyAdvisor.name}</h5>
                  <p className="text-[10px] text-[#948e9c] font-mono tracking-wider uppercase">{facultyAdvisor.designation}</p>
                  <p className="text-[9px] text-[#cac4d2] font-mono uppercase bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/30 inline-block">{facultyAdvisor.department}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* President Details Card (Full Row, 12 columns) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-12 neo-card neo-card-cyan rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-[#00F2FF] relative overflow-hidden group"
            id="card-club-president"
          >
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00F2FF]/5 group-hover:bg-[#00F2FF]/15 blur-3xl rounded-full transition-all duration-500 pointer-events-none" />

            <div className="flex items-center gap-6 w-full md:w-auto relative z-10">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl neo-inset p-1 bg-black overflow-hidden relative z-10">
                  <Image
                    alt={`Club President ${clubPresident.name}`}
                    className="w-full h-full rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    src={clubPresident.image}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="absolute inset-0 bg-[#00F2FF]/10 rounded-2xl blur-md pointer-events-none" />
              </div>
              <div>
                <span className="font-cyber text-[9px] tracking-wider text-[#00F2FF] uppercase font-black neo-btn px-2.5 py-1 rounded-md">{clubPresident.title}</span>
                <h5 className="font-sans font-bold text-lg text-white mt-2 group-hover:text-[#cfbdff] transition-colors">{clubPresident.name}</h5>
                <p className="text-xs text-[#cac4d2] font-mono mt-0.5">CYBORG_LEAD {clubPresident.memberId}</p>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-8 w-full md:w-auto border-t md:border-t-0 border-[#494551]/30 pt-4 md:pt-0 relative z-10">
              <div className="space-y-1">
                <span className="font-cyber text-[9px] tracking-wider text-[#948e9c] uppercase block">CONTACT SECURE</span>
                <p className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#00F2FF]" />
                  {clubPresident.phone}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-cyber text-[9px] tracking-wider text-[#948e9c] uppercase block">UPLINK EMAIL</span>
                <p className="text-xs font-bold text-[#cfbdff] flex items-center gap-1.5 font-mono">
                  <Mail className="w-3.5 h-3.5" />
                  {clubPresident.email}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}





















