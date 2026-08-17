import Image from 'next/image';
import { motion } from 'motion/react';
import { Calendar, MapPin, Database, ArrowRight } from 'lucide-react';
import { activeEvents } from '../../config/EventsView';

export default function EventsView() {
  return (
    <div className="space-y-12 pt-2">
      {/* Splitscreen Dual Cinematic Hero Header */}
      <section id="splitscreen-hero-panel" className="relative w-screen left-1/2 -translate-x-1/2 min-h-[45vh] lg:h-[400px] flex flex-col lg:flex-row overflow-hidden bg-black border-y border-[#494551]/20">
        {/* Left Side: Death Race */}
        <div id="hero-left-death-race" className="relative flex-1 group overflow-hidden border-b lg:border-b-0 lg:border-r border-[#494551]/20 min-h-[220px]">
          <div className="absolute inset-0 z-0">
            <Image
              alt="Death Race Banner"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-[2s] ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkXIOyHoyikiaGl7Ub7sv0LmMEkSw3F8fG-E5DslqfKdABVj9TYC7swpHZxZDagkuII2fyv29ZMsiBW4HkPg-xP6ps7X3C74AW4VPugVVCA8foObfEpYEZa6v5JkqqPmLQV0iMCNTBfzUMIxMiUvxlO85EaHx9Yz6JdXm9Q9MHQqQ9cyiIG3rdyoDQgZyVcpSYddEJxzxYcqfDxbRFaI3h-E5udfX_r1-I-hclFaPltgpbIkky_P8GTrvG85b0hgBMolBDXZETCmPp"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0d13] via-[#0f0d13]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d13] to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 lg:pl-16 xl:pl-28 space-y-3">
            <h1 className="font-cyber text-2xl md:text-4xl italic font-black text-glow-purple uppercase tracking-tight text-white">
              DEATH_RACE
            </h1>
            <p className="font-sans text-xs md:text-sm text-[#cac4d2]/80 max-w-sm leading-relaxed">
              Combat-focused high-velocity physical obstacle traversal. Structural integrity is optional. Victory is absolute.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <button 
                onClick={() => {
                  const el = document.getElementById('event-death-race');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl neo-btn text-[#cfbdff] hover:text-[#e4e4e7] font-cyber font-bold text-[10px] tracking-widest uppercase transition-all cursor-pointer"
              >
                DEPLOY_UNIT
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Robo Sumo */}
        <div id="hero-right-robo-sumo" className="relative flex-1 group overflow-hidden min-h-[220px]">
          <div className="absolute inset-0 z-0">
            <Image
              alt="Robo Sumo Banner"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-[2s] ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQqFxoA5dlsnJndCsZYkMm1Fj2TYHU1vNcSQSRBGsgYdzUu-Woj-xdhvbVdn6JJg6ZQmydoUjJCcImfPnQH8UmzOCgiL1yzE05v7qhwFUyKuueXbMoaq7NXhChf4KOPnhfVvJINLxbfPo8lEKrDr5RHcRvYgcwpMEK1k8DLicvv1MnwwqGJcL-XrSgF3K5y0Uy6g_i5XyPEIzlm4HE3RRXjQIdfRPhzbKlMjX1m7FhllAD7rh6qm0uiPw5K39wAqtz93ShxrIc8YHo"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0f0d13] via-[#0f0d13]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d13] to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 lg:pr-16 xl:pr-28 lg:items-end lg:text-right space-y-3">
            <h1 className="font-cyber text-2xl md:text-4xl italic font-black text-glow-cyan uppercase tracking-tight text-white">
              ROBO_SUMO
            </h1>
            <p className="font-sans text-xs md:text-sm text-[#cac4d2]/80 max-w-sm leading-relaxed">
              Pure torque and geometric weight distribution control. Command the perimeter and dominate the circular ring.
            </p>
            <div className="flex items-center gap-4 pt-1 lg:flex-row-reverse">
              <button 
                onClick={() => {
                  const el = document.getElementById('event-robo-sumo');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl neo-btn text-[#d4d4d8] hover:text-white font-cyber font-bold text-[10px] tracking-widest uppercase transition-all cursor-pointer"
              >
                ENTER_ARENA
              </button>
            </div>
          </div>
        </div>

        {/* Central Tactical Grid Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:flex flex-col items-center gap-3 opacity-30">
          <div className="h-20 w-[1px] bg-gradient-to-t from-[#cfbdff] to-transparent" />
          <div className="p-1.5 border border-[#cfbdff]/40 rotate-45">
            <div className="w-1.5 h-1.5 bg-[#cfbdff]" />
          </div>
          <div className="h-20 w-[1px] bg-gradient-to-b from-[#cfbdff] to-transparent" />
        </div>
      </section>

      {/* Active Timeline List Grid */}
      <section id="active-timeline-section" className="w-full px-4">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12">
          <h2 className="font-cyber text-xl md:text-3xl font-black text-white uppercase tracking-tight">Active_Timeline</h2>
          <div className="flex-1 h-[1px] bg-[#494551]/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeEvents.map((evt) => (
            <motion.div
              key={evt.id}
              id={`event-${evt.id}`}
              whileHover={{ y: -6 }}
              className="neo-card rounded-2xl flex flex-col overflow-hidden group"
            >
              <div className="h-44 overflow-hidden relative">
                <Image
                  alt={evt.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  src={evt.image}
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d13] to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-sans font-bold text-base text-white group-hover:text-[#cfbdff] transition-colors mt-0.5">
                    {evt.title}
                  </h3>
                </div>

                  <div className="flex gap-4 text-[10px] font-mono text-[#cac4d2]/80 border-y border-[#494551]/20 py-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#cfbdff]" />
                      {evt.date}
                    </span>
                    {evt.venue && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#26a641]" />
                        {evt.venue}
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-xs text-[#cac4d2] leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>

                  {evt.ps ? (
                    <a
                      href={evt.ps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full py-2.5 neo-btn text-[#cfbdff] hover:text-[#e4e4e7] font-cyber font-bold text-[9px] tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <span>ACCESS_PROBLEM_STATEMENT</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <button className="mt-auto w-full py-2.5 neo-btn text-[#cfbdff]/40 font-cyber font-bold text-[9px] tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-not-allowed">
                      <span>PORTAL_OFFLINE</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Overview Section */}
      <section id="events-overview-section" className="w-full max-w-7xl mx-auto px-4">
        <div className="neo-card rounded-2xl p-8 border border-[#494551]/30 bg-[#0f0d13]/50 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#26a641]/5 group-hover:bg-[#26a641]/10 blur-3xl rounded-full transition-all duration-500 pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="p-4 rounded-2xl neo-btn flex items-center justify-center shrink-0">
              <Database className="text-[#26a641] w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-cyber text-lg tracking-wider text-white uppercase">Our Legacy</h3>
              <p className="font-sans text-sm md:text-base text-[#cac4d2] leading-relaxed">
                We at Cyborg host four exciting events annually, fostering innovation and teamwork. Join us for hands-on workshops, competitions, and networking opportunities to elevate your robotics skills and passion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
