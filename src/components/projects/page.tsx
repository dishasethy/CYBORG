import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Cpu, Database, X, Activity, HardDrive } from 'lucide-react';
import { Project } from '../../types';
import { projects, projectCategories as categories } from '../../config/ProjectsView';

export default function ProjectsView() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAnvritExpanded, setIsAnvritExpanded] = useState<boolean>(false);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  // Extract ANVRIT project as a featured full-width block if it matches the current category filter
  const anvritProject = filteredProjects.find(p => p.title.toLowerCase().includes('anvrit'));
  const masonryProjects = filteredProjects.filter(p => p.id !== anvritProject?.id);

  return (
    <div className="space-y-12">
      {/* Category Selection Filter Bar */}
      <section id="projects-filter-bar" className="flex flex-col md:flex-row justify-between items-baseline md:items-center gap-6 border-b border-[#494551]/20 pb-6">
        <div>
          <h2 className="font-cyber text-xl md:text-3xl font-black text-white uppercase tracking-tight">Mainframe Projects</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl font-mono text-[10px] tracking-wider uppercase transition-all neo-btn ${filter === cat.id
                  ? 'neo-tab-active text-white'
                  : 'text-[#cac4d2] hover:text-white'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured ANVRIT Project Full Div Layout */}
      {anvritProject && (
        <motion.div
          key={anvritProject.id}
          id={`project-card-${anvritProject.id}`}
          layoutId={`project-container-${anvritProject.id}`}
          whileHover={{ y: -4 }}
          className={`w-full max-w-7xl mx-auto neo-card neo-card-cyan rounded-2xl overflow-hidden group flex flex-col md:flex-row border border-[#d4d4d8]/30 hover:border-[#e4e4e7] transition-all bg-[#0f0d13] mb-8 ${isAnvritExpanded ? 'md:h-auto' : 'md:h-[450px]'}`}
        >
          {/* Media Container (Stretches on desktop, height-capped based on state) */}
          <div className={`relative w-full md:w-1/2 overflow-hidden bg-black flex-shrink-0 ${isAnvritExpanded ? 'min-h-[300px] md:min-h-full h-80 md:h-auto' : 'h-80 md:h-full'}`}>
            <Image
              alt={anvritProject.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s]"
              src={anvritProject.image}
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#141218] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Text Information Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow md:w-1/2 overflow-hidden space-y-4">
            <div className="space-y-2">
              <h3 className="font-cyber font-black text-xl md:text-2xl text-white group-hover:text-[#cfbdff] transition-colors uppercase tracking-tight">
                {anvritProject.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#cac4d2] leading-relaxed">
                {isAnvritExpanded ? (
                  <>
                    {anvritProject.description}{' '}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAnvritExpanded(false);
                      }}
                      className="text-[#9a83db] hover:underline cursor-pointer font-semibold ml-1 inline-block bg-transparent border-none p-0"
                    >
                      Read Less
                    </button>
                  </>
                ) : (
                  <>
                    {anvritProject.description.slice(0, 160)}...{' '}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAnvritExpanded(true);
                      }}
                      className="text-[#9a83db] hover:underline cursor-pointer font-semibold ml-1 inline-block bg-transparent border-none p-0"
                    >
                      Read More
                    </button>
                  </>
                )}
              </p>
            </div>

            {/* Tags and Action Bar */}
            <div className="pt-4 border-t border-[#494551]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {anvritProject.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="neo-inset text-[#cac4d2] font-mono text-[9px] px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                id={`btn-access-${anvritProject.id}`}
                onClick={() => setSelectedProject(anvritProject)}
                className="px-4 py-2 neo-btn text-[#cfbdff] hover:text-[#e4e4e7] font-cyber font-bold text-[9px] tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ACCESS_SYSTEM_CORE</span>
                <Eye className="w-3.5 h-3.5 text-[#9a83db]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Structured Symmetric Grid Layout for rest of the project cards */}
      <section id="grid-projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
        {masonryProjects.map((proj) => {
          return (
            <motion.div
              key={proj.id}
              id={`project-card-${proj.id}`}
              layoutId={`project-container-${proj.id}`}
              whileHover={{ y: -4 }}
              className={`flex flex-col h-full neo-card ${proj.flagship ? 'neo-card-cyan' : 'neo-card-purple'} rounded-2xl overflow-hidden group border border-[#494551]/30 hover:border-[#cfbdff] transition-all bg-[#0f0d13]`}
            >
              {/* Media Container */}
              <div className="relative w-full h-48 md:h-56 overflow-hidden bg-black flex-shrink-0">
                <Image
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s]"
                  src={proj.image}
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141218] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Text Information Details */}
              <div className="p-5 md:p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-3">
                  <h3 className="font-cyber font-bold text-lg md:text-xl text-white group-hover:text-[#cfbdff] transition-colors uppercase tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#cac4d2] leading-relaxed">
                    {proj.description.length > 160 ? (
                      <>
                        {proj.description.slice(0, 140)}...{' '}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(proj);
                          }}
                          className="text-[#9a83db] hover:underline cursor-pointer font-semibold ml-1 inline-block bg-transparent border-none p-0"
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      proj.description
                    )}
                  </p>
                </div>

                {/* Tags and Action Bar */}
                <div className="pt-4 border-t border-[#494551]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="neo-inset text-[#cac4d2] font-mono text-[9px] px-2.5 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    id={`btn-access-${proj.id}`}
                    onClick={() => setSelectedProject(proj)}
                    className="px-4 py-2 neo-btn text-[#cfbdff] hover:text-[#e4e4e7] font-cyber font-bold text-[9px] tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>ACCESS_CORE</span>
                    <Eye className="w-3 h-3 text-[#9a83db]" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Telemetry Core Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl neo-card rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-xl neo-btn text-[#cac4d2] hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className="font-cyber font-black text-2xl text-white uppercase tracking-tight mt-1">{selectedProject.title}</h3>
                </div>

                <div className="h-48 rounded-xl neo-inset p-4 font-mono text-[10px] text-emerald-400 overflow-y-auto space-y-1.5 leading-relaxed">
                  <div className="text-[#9a83db]">// SIMULATED ACTUATOR DATA DUMP</div>
                  <div>[STABLE] Handshake: complete.</div>
                  <div>[ACTIVE] Port 8080 routing to core ROS2 telemetry layer.</div>
                  <div>[OK] Sensor arrays active. Thread counts: 16.</div>
                  <div>[INFO] {selectedProject.meta}</div>
                  <div className="text-[#9a83db]">[HARDWARE] Frame structure calibrated to 0.05% error margin.</div>
                  <div>[SYS] Calibration matrix refreshed. Autonomous decisions: ENABLED.</div>
                  <div className="text-glow-cyan animate-pulse">[OK] System operation cycle status: NOMINAL</div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#494551]/20">
                  <div className="p-3 neo-inset rounded-xl text-center">
                    <Cpu className="w-4 h-4 text-[#cfbdff] mx-auto mb-1" />
                    <span className="font-mono text-[8px] text-[#948e9c] block uppercase">CO-PROCESSOR</span>
                    <span className="text-xs font-bold text-white uppercase">Cortex-M7</span>
                  </div>
                  <div className="p-3 neo-inset rounded-xl text-center">
                    <Database className="w-4 h-4 text-[#9a83db] mx-auto mb-1" />
                    <span className="font-mono text-[8px] text-[#948e9c] block uppercase">NETWORK LAYER</span>
                    <span className="text-xs font-bold text-white uppercase">DDS / ROS2</span>
                  </div>
                  <div className="p-3 neo-inset rounded-xl text-center">
                    <Activity className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <span className="font-mono text-[8px] text-[#948e9c] block uppercase">UPLINK RATE</span>
                    <span className="text-xs font-bold text-white uppercase">500 Hz</span>
                  </div>
                  <div className="p-3 neo-inset rounded-xl text-center">
                    <HardDrive className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <span className="font-mono text-[8px] text-[#948e9c] block uppercase">COMPILER</span>
                    <span className="text-xs font-bold text-white uppercase">GCC 12.2</span>
                  </div>
                </div>

                {selectedProject.contributors && selectedProject.contributors.length > 0 && (
                  <div className="pt-4 border-t border-[#494551]/20 space-y-3">
                    <span className="font-mono text-[8px] text-[#cfbdff] tracking-widest uppercase block">Core_Contributors</span>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
                      {selectedProject.contributors.map((contrib, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 p-1 pr-2.5 neo-inset rounded-lg bg-black/40 border border-[#494551]/20">
                          <Image
                            src={contrib.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDImuv0sDGm_33jDgjjlB_zPwbs9kJfF4dI1WQ-3EWcBh_ieWi5FxnG9PKrL0banm7Dl6rKDuHMwDVNCFigpk26svsLwNsrU_szG57GEQU501t2kN091t6-0Ki7uX3BVEEmkkansGu8vQP3bWtNnIP5auHalGHz5i0-NwPUBn468vqlkHXlp5LxpftIls28Lv9ltRyIQRWoTuLRP7xwpMMDNOgQi38DX4UNjwYpVJSo5rqv71KLuCowg8ymZyIOKPTpOejMKZdK2Vuy'}
                            alt={contrib.name}
                            className="w-5 h-5 rounded object-cover"
                            width={20}
                            height={20}
                          />
                          <span className="font-sans text-[9px] text-[#cac4d2] font-semibold">{contrib.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 neo-btn text-[#cfbdff] hover:text-[#e4e4e7] font-cyber font-bold text-[10px] tracking-widest uppercase rounded-xl transition-all cursor-pointer"
                  >
                    CLOSE_LINK
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
