'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldCheck, Heart, Cpu } from 'lucide-react';
import InteractiveBg from './components/ui/fragment/InteractiveBg';
import Navbar from './components/navbar/Navbar';
import HomeView from './features/home/HomeView';
import EventsView from './features/events/EventsView';
import ProjectsView from './features/projects/ProjectsView';
import AchievementsView from './features/achievements/AchievementsView';
import TeamView from './features/team/TeamView';
import AuthView from './features/auth/AuthView';
import ItemsManagementView from './features/inventory/ItemsManagementView';
import RoboticArmCursor from './components/ui/fragment/RoboticArmCursor';
import SocialSidebar from './components/ui/fragment/SocialSidebar';
import Footer from './components/Footer';
import { UserSession } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [systemUptime, setSystemUptime] = useState<string>('00:00:00');
  const [session, setSession] = useState<UserSession>({ isLoggedIn: false });

  // Realistic dynamic uptime counter for high-tech aesthetic
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - startTime;
      const hrs = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setSystemUptime(`${hrs}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'items':
        return <ItemsManagementView session={session} onLoginClick={() => setActiveTab('auth')} />;
      case 'events':
        return <EventsView />;
      case 'projects':
        return <ProjectsView />;
      case 'achievements':
        return <AchievementsView />;
      case 'team':
        return <TeamView />;
      case 'auth':
        return <AuthView session={session} setSession={setSession} onNavigateHome={() => setActiveTab('home')} onNavigateItems={() => setActiveTab('items')} />;
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
      <InteractiveBg />

      {/* Cybernetic overlay laser scanline */}
      <div className="scan-line" />

      {/* Global Tactical grid and noise overlays */}
      <div className="fixed inset-0 pointer-events-none z-1 bg-repeat hud-grid opacity-30" />
      <div className="fixed inset-0 pointer-events-none z-1 tactical-bg opacity-[0.03]" />

      {/* Navigation Mainframe */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} session={session} />

      {/* Main Viewport Content Wrapper */}
      <main className="relative z-10 pt-28 pb-20 px-6 md:px-16 max-w-7xl mx-auto min-h-[90vh]">
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
      <Footer systemUptime={systemUptime} onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}
