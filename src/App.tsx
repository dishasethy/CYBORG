'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import InteractiveBg from './components/ui/fragment/InteractiveBg';
import Navbar from './components/navbar/Navbar';
import HomeView from './components/home/page';
import EventsView from './components/events/page';
import ProjectsView from './components/projects/page';
import AchievementsView from './components/achievements/page';
import TeamView from './components/team/page';
import RoboticArmCursor from './components/ui/fragment/RoboticArmCursor';
import SocialSidebar from './components/ui/fragment/SocialSidebar';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'events':
        return <EventsView />;
      case 'projects':
        return <ProjectsView />;
      case 'achievements':
        return <AchievementsView />;
      case 'team':
        return <TeamView />;
      default:
        return <HomeView onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="relative min-h-screen text-[#e6e1e9] font-sans antialiased overflow-x-hidden selection:bg-[#9a83db]/40 selection:text-white">
      {/* Movable Robotic Arm Custom Cursor */}
      <RoboticArmCursor />

      {/* Social Media Left Sidebar Rail */}
      <SocialSidebar />

      {/* Interactive Network Particle Background */}
      {activeTab !== 'events' ? (
        <InteractiveBg />
      ) : (
        <>
          <div className="fixed inset-0 pointer-events-none z-0 bg-[#fffae5]" />
          {/* Dense tactical dots matrix (grain/pores) */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.7]" 
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 61, 0, 0.22) 0.6px, transparent 0), radial-gradient(rgba(9, 9, 10, 0.1) 0.5px, transparent 0)',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 4px 4px',
            }}
          />
          {/* Large scale grid lines */}
          <div 
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.22]" 
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 61, 0, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 61, 0, 0.06) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </>
      )}

      {/* Global Tactical grid and noise overlays */}
      {activeTab !== 'events' && (
        <div className="fixed inset-0 pointer-events-none z-1 bg-repeat hud-grid opacity-[0.45]" />
      )}
      <div className="fixed inset-0 pointer-events-none z-1 tactical-bg opacity-[0.07]" />

      {/* Navigation Mainframe */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Viewport Content Wrapper */}
      <main className={`relative z-10 pt-24 md:pt-28 px-6 md:px-16 mx-auto min-h-[90vh] ${activeTab === 'home' ? 'pb-2' : 'pb-12'} ${(activeTab === 'team' || activeTab === 'achievements' || activeTab === 'events' || activeTab === 'projects') ? 'max-w-[92vw]' : 'max-w-7xl'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Creative High-Impact Cybernetic Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}
