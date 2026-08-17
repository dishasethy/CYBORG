import Image from 'next/image';
import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Menu, X, Cpu } from 'lucide-react';
import { navItems } from '../../constants';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 neo-header transition-all duration-300 font-cyber ${isScrolled ? 'neo-header-scrolled' : ''}`}>
        <nav className="flex justify-between items-center w-full px-6 md:px-12 py-3 max-w-7xl mx-auto">
          {/* Official Cyborg Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group py-1"
          >
            <Image
              src="/cyborg_logo.png"
              alt="Cyborg Logo"
              className="h-[60px] w-auto object-contain -my-2 transition-transform duration-300 group-hover:scale-105"
              width={120}
              height={52}
              priority
            />

          </div>

          {/* Desktop Navigation - Recessed Neomorphic Track */}
          <div className="hidden md:flex items-center gap-1 neo-nav-container">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`neo-tab-btn font-semibold text-xs tracking-wider uppercase transition-all duration-300 ${isActive ? 'neo-tab-active' : 'text-[#cac4d2] hover:text-[#cfbdff]'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Controls - Elevated Neomorphic Buttons */}
          <div className="flex items-center gap-3.5">


            {/* Notification Alert */}
            <div className="relative group">
              <button className="p-2.5 rounded-xl neo-btn text-[#cac4d2] transition-all duration-300">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FE490D] rounded-full animate-ping" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-[#1d1b20] border border-[#494551]/50 p-2.5 rounded-xl text-[10px] font-mono text-[#cac4d2] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl neo-btn">
                [SYSTEM LOGS]: WE are live with our NEW Website !!!
              </div>
            </div>



            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl neo-btn text-[#cac4d2] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-[#494551]/30 bg-[#141218] overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-2">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left font-semibold text-xs uppercase py-3 px-4 rounded transition-all ${isActive
                        ? 'bg-[#9a83db]/10 text-white border-l-2 border-[#cfbdff]'
                        : 'text-[#cac4d2] hover:bg-[#36343a]/20 hover:text-white'
                        }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


    </>
  );
}
