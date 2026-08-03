import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Bell, Menu, X, Cpu } from 'lucide-react';
import { navItems, initialTerminalLogs } from '../../constants';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>(initialTerminalLogs);
  const [terminalInput, setTerminalInput] = useState('');

  const handleTerminalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    // Simulate system command responses for immersive hacker deck feel
    const cmd = terminalInput.toLowerCase().trim();
    let response = `bash: command not found: ${cmd}`;

    if (cmd === 'help') {
      response = 'Available mainframe protocols: diagnostics, system_status, show_members, clear';
    } else if (cmd === 'diagnostics') {
      response = 'Running deep system diagnostics... DB status: CONNECTED. Node server: ACTIVE. HMR: DISABLED.';
    } else if (cmd === 'system_status') {
      response = 'Mainframe uptime: 100% // Core temperature: 42°C // Logic subnets: OPTIMAL';
    } else if (cmd === 'show_members') {
      response = 'Querying live DB records... Found 12 active operators registry.';
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    }

    setTerminalLogs(prev => [...prev, `> ${terminalInput}`, response]);
    setTerminalInput('');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 neo-header font-cyber">
        <nav className="flex justify-between items-center w-full px-6 md:px-12 py-3 max-w-7xl mx-auto">
          {/* Official Cyborg Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group py-1"
          >
            <img 
              src="/cyborg_logo.png" 
              alt="Cyborg Logo" 
              className="h-[52px] w-auto object-contain -my-2 transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="hidden lg:flex flex-col justify-center">
              <span className="text-sm font-bold tracking-[0.2em] text-white group-hover:text-[#00F2FF] transition-colors uppercase">
                CYBORG
              </span>
            </div>
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
            {/* Terminal Access Button */}
            <button
              onClick={() => setTerminalOpen(!terminalOpen)}
              title="System Terminal Diagnostics"
              className={`p-2.5 rounded-xl neo-btn transition-all duration-300 ${terminalOpen ? 'neo-btn-pressed text-[#00F2FF]' : 'text-[#cac4d2]'
                }`}
            >
              <Terminal className="w-4 h-4" />
            </button>

            {/* Notification Alert */}
            <div className="relative group">
              <button className="p-2.5 rounded-xl neo-btn text-[#cac4d2] transition-all duration-300">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00F2FF] rounded-full animate-ping" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-[#1d1b20] border border-[#494551]/50 p-2.5 rounded-xl text-[10px] font-mono text-[#cac4d2] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl neo-btn">
                [SYSTEM LOGS]: ACTIVE_NODE verified. Archival protocols loaded.
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

      {/* Embedded High-Tech Interactive Terminal Panel */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 right-6 z-50 w-full max-w-sm bg-[#0f0d13]/95 border border-[#00F2FF]/30 p-4 rounded-lg font-mono text-xs text-emerald-400 shadow-[0_0_30px_rgba(0,242,255,0.15)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[#00F2FF]/20 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#00F2FF] animate-pulse" />
                <span className="font-bold uppercase text-[#00F2FF]">CYBORG_TERM v4.9</span>
              </div>
              <button
                onClick={() => setTerminalOpen(false)}
                className="text-[#948e9c] hover:text-[#00F2FF] transition-colors"
              >
                [X]
              </button>
            </div>

            <div className="h-48 overflow-y-auto space-y-1 scrollbar-none mb-3 text-[11px] leading-relaxed">
              {terminalLogs.map((log, index) => (
                <div key={index} className={log.startsWith('>') ? 'text-[#cfbdff]' : log.includes('ACCESS') ? 'text-[#00F2FF]' : 'text-emerald-400'}>
                  {log}
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="flex gap-2">
              <span className="text-[#00F2FF]">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="system directive..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[11px] placeholder-emerald-800 focus:ring-0 p-0"
                autoFocus
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
