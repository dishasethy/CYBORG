import { motion } from 'motion/react';
import { Rocket, Mail, MapPin, Phone, Award, Cpu } from 'lucide-react';
import ParticleText from '../../components/ui/fragment/ParticleText';
import { sponsors, divisionOverview, facultyAdvisor, clubPresident } from '../../config/HomeView';
import SectionConnector from '../../components/ui/fragment/SectionConnector';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
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
      className="space-y-24"
    >
      {/* Hero Section */}
      <section id="home-hero-section" className="min-h-[75vh] sm:min-h-[85vh] flex flex-col items-center justify-center text-center relative pt-8 pb-4">
        <motion.div variants={itemVariants} className="max-w-7xl w-full mx-auto space-y-8 px-4">

          {/* Interactive Cinematic Logo Character Split with Particles */}
          <div className="py-2 w-full">
            <ParticleText />
            <p className="font-cyber text-[9px] sm:text-[11px] md:text-xs tracking-[0.2em] sm:tracking-[0.35em] md:tracking-[0.45em] text-[#00F2FF] mt-4 font-semibold uppercase">
              artificial intelligence &amp; autonomous systems lab
            </p>
          </div>

          {/* Core Description Text */}
          <p className="font-sans text-base md:text-xl text-[#cac4d2] max-w-2xl mx-auto leading-relaxed font-light">
            Welcome to <span className="text-white font-bold">CYBORG</span>, where imagination meets innovation! A dynamic ensemble of students at <span className="text-[#cfbdff] font-medium">NIT Rourkela</span>, driven by a shared passion for robotics and cognitive computing.
          </p>

          <h2 className="font-cyber text-[9px] sm:text-xs md:text-sm text-[#9a83db] tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase font-bold text-glow-purple">
            Where every idea sparks a new possibility
          </h2>

          {/* Interactive Actions */}
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-5">
            <button
              id="btn-initiate-protocol"
              onClick={() => onNavigate('events')}
              className="px-8 py-4 rounded-xl font-cyber font-bold text-xs uppercase tracking-widest neo-btn text-[#cfbdff] hover:text-[#00F2FF] flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Initialize Protocol</span>
              <Rocket className="w-4 h-4 animate-bounce text-[#00F2FF] group-hover:scale-110 transition-transform" />
            </button>
            <button
              id="btn-view-projects"
              onClick={() => onNavigate('projects')}
              className="px-8 py-4 rounded-xl font-cyber font-bold text-xs uppercase tracking-widest neo-btn text-[#cac4d2] hover:text-white cursor-pointer"
            >
              View Projects
            </button>
          </div>

        </motion.div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors-section" className="py-12 border-y border-[#494551]/20 bg-[#0f0d13]/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-[#494551]/30"></div>
            <h3 className="font-cyber text-[10px] text-[#948e9c] uppercase tracking-[0.3em]">Our Proud Sponsors</h3>
            <div className="h-[1px] w-12 bg-[#494551]/30"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.id}
                whileHover={{ scale: 1.04 }}
                className="neo-card p-6 md:p-8 rounded-2xl flex items-center justify-center border border-[#494551]/30 hover:border-[#cfbdff]/50 transition-all cursor-pointer"
              >
                <img
                  alt={sponsor.name}
                  className={`${sponsor.heightClass} w-auto object-contain filter opacity-70 hover:opacity-100 transition-opacity drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}
                  src={sponsor.logoUrl}
                />
              </motion.div>
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
                <span className="font-mono text-[10px] tracking-widest text-[#00F2FF] uppercase neo-btn px-3 py-1.5 rounded-lg border border-[#00F2FF]/30 font-semibold shadow-[0_0_12px_rgba(0,242,255,0.15)]">
                  LAB NOTEBOOK
                </span>
              </div>

              <div className="relative pl-4 border-l-2 border-[#cfbdff]/40 my-3 neo-inset rounded-r-xl p-4">
                <p className="font-note text-xl md:text-2xl text-[#e9e1ff] leading-relaxed tracking-wide font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                  {divisionOverview.notebookText}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 mt-6 border-t border-[#494551]/30 relative z-10">
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
            className="md:col-span-5 neo-card neo-card-purple rounded-2xl p-8 flex flex-col justify-between border-l-4 border-l-[#9a83db] hover:border-l-[#cfbdff] relative overflow-hidden group"
            id="card-faculty-advisor"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#9a83db]/5 group-hover:bg-[#9a83db]/15 blur-3xl rounded-full transition-all duration-500 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl neo-btn flex items-center justify-center">
                    <Award className="text-[#cfbdff] group-hover:text-[#00F2FF] w-5 h-5 transition-colors duration-300" />
                  </div>
                  <h4 className="font-cyber text-lg tracking-wider text-white uppercase">Faculty Advisor</h4>
                </div>
                <span className="font-mono text-[9px] tracking-widest text-[#cfbdff] uppercase neo-btn px-2.5 py-1 rounded-md">
                  {facultyAdvisor.department}
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 pt-2">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden neo-inset p-1.5 shrink-0 group-hover:border-[#00F2FF]/60 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all duration-300">
                  <img
                    alt={facultyAdvisor.name}
                    className="w-full h-full object-cover object-top rounded-xl grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    src={facultyAdvisor.image}
                  />
                </div>

                <div className="text-center space-y-1">
                  <h5 className="font-sans font-bold text-base md:text-lg text-white group-hover:text-[#cfbdff] transition-colors">
                    {facultyAdvisor.name}
                  </h5>
                  <p className="text-xs text-[#cac4d2] font-medium">
                    {facultyAdvisor.designation}, ECE Department
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#494551]/30 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 font-mono text-[11px] relative z-10">
              <div className="flex items-center gap-2 text-[#cac4d2]">
                <Phone className="w-3.5 h-3.5 text-[#9a83db]" />
                <span>{facultyAdvisor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#cfbdff]">
                <Mail className="w-3.5 h-3.5" />
                <span>{facultyAdvisor.email}</span>
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
                  <img
                    alt={`Club President ${clubPresident.name}`}
                    className="w-full h-full rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    src={clubPresident.image}
                  />
                </div>
                <div className="absolute inset-0 bg-[#00F2FF]/10 rounded-2xl blur-md pointer-events-none" />
              </div>
              <div>
                <span className="font-cyber text-[9px] tracking-wider text-[#00F2FF] uppercase font-black neo-btn px-2.5 py-1 rounded-md">{clubPresident.title}</span>
                <h5 className="font-sans font-bold text-lg text-white mt-2 group-hover:text-[#cfbdff] transition-colors">{clubPresident.name}</h5>
                <p className="text-xs text-[#cac4d2] font-mono mt-0.5">CYBORG_LEADER // ID: {clubPresident.memberId}</p>
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
