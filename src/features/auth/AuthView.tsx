import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, Mail, User, KeyRound, Cpu, CheckCircle2, ArrowRight, Github, Fingerprint, LogOut, AlertCircle, Building2, Hash, Box } from 'lucide-react';
import { UserSession } from '../../types';

interface AuthViewProps {
  session: UserSession;
  setSession: React.Dispatch<React.SetStateAction<UserSession>>;
  onNavigateHome: () => void;
}

export default function AuthView({ session, setSession, onNavigateHome }: AuthViewProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Login Form state
  const [loginRoll, setLoginRoll] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup Form state
  const [signupName, setSignupName] = useState('');
  const [signupRoll, setSignupRoll] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupDept, setSignupDept] = useState('Autonomous Systems');
  const [signupPass, setSignupPass] = useState('');
  const [signupConfirmPass, setSignupConfirmPass] = useState('');

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);

    if (!loginRoll.trim() || !loginPassword.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Roll number and password are required for uplink.' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSession({
        isLoggedIn: true,
        name: loginRoll.toUpperCase() === 'CYB-001' ? 'Major Alex Mercer' : `Operator ${loginRoll.toUpperCase()}`,
        email: `${loginRoll.toLowerCase()}@cybernetics.lab`,
        rollNumber: loginRoll.toUpperCase(),
        department: 'Autonomous Systems & Cybernetics',
        role: 'Field Robotics Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
      });
      setFeedbackMsg({ type: 'success', text: 'UPLINK ESTABLISHED: Welcome to Cyborg Mainframe.' });
    }, 1200);
  };

  // Handle Signup Submit
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);

    if (!signupName || !signupRoll || !signupEmail || !signupPass) {
      setFeedbackMsg({ type: 'error', text: 'Please complete all required fields.' });
      return;
    }

    if (signupPass !== signupConfirmPass) {
      setFeedbackMsg({ type: 'error', text: 'Security Passcodes do not match.' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSession({
        isLoggedIn: true,
        name: signupName,
        email: signupEmail,
        rollNumber: signupRoll.toUpperCase(),
        department: signupDept,
        role: 'Junior Cadet // Subsystem Trainee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
      });
      setFeedbackMsg({ type: 'success', text: 'CADET CREDENTIALS CREATED: Logged into Cyborg System.' });
    }, 1400);
  };

  const handleLogout = () => {
    setSession({ isLoggedIn: false });
    setFeedbackMsg({ type: 'success', text: 'DISCONNECTED: Uplink session terminated securely.' });
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-10">
      {/* Already logged in view */}
      {session.isLoggedIn ? (
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-card rounded-3xl p-6 sm:p-8 md:p-10 border border-[#00F2FF]/40 space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#494551]/30">
              <div className="flex items-center gap-5">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl neo-btn p-1 overflow-hidden border border-[#00F2FF]/50 shrink-0">
                  <img 
                    src={session.avatar} 
                    alt={session.name}
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#14111d] status-ping" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-[#00F2FF] tracking-widest uppercase block font-semibold">
                    ACTIVE OPERATOR // UPLINK_ONLINE
                  </span>
                  <h3 className="font-cyber font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                    {session.name}
                  </h3>
                  <p className="font-mono text-xs text-[#cfbdff] mt-0.5">
                    {session.role}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="neo-btn px-5 py-3 rounded-xl font-mono text-xs text-rose-400 hover:text-rose-300 flex items-center gap-2 border border-rose-500/30 transition-all hover:bg-rose-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>DISCONNECT UPLINK</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="neo-inset p-4 rounded-2xl space-y-1">
                <span className="font-mono text-[10px] text-[#948e9c] uppercase block">ROLL_NUMBER</span>
                <p className="font-cyber font-bold text-sm text-[#00F2FF]">{session.rollNumber}</p>
              </div>
              <div className="neo-inset p-4 rounded-2xl space-y-1">
                <span className="font-mono text-[10px] text-[#948e9c] uppercase block">INSTITUTE_EMAIL</span>
                <p className="font-mono text-xs text-white truncate">{session.email}</p>
              </div>
              <div className="neo-inset p-4 rounded-2xl space-y-1">
                <span className="font-mono text-[10px] text-[#948e9c] uppercase block">DIVISION / DEPT</span>
                <p className="font-sans text-xs text-[#cfbdff] font-semibold">{session.department}</p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Unauthenticated Auth Container */
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-card rounded-3xl p-6 sm:p-10 border border-[#00F2FF]/30 space-y-8 max-w-xl mx-auto"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neo-btn border border-[#00F2FF]/30 text-[#00F2FF] font-mono text-[10px] uppercase font-bold tracking-widest mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>MAINFRAME ACCESS GATEWAY</span>
            </div>
            <h2 className="font-cyber font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              CYBORG OPERATOR AUTH
            </h2>
            <p className="font-mono text-xs text-[#cac4d2]">
              Authenticate credentials to unlock hardware telemetry, sub-system controls, and CAD archives.
            </p>
          </div>

          {/* Auth Mode Toggle Tabs */}
          <div className="flex neo-inset p-1.5 rounded-2xl">
            <button
              onClick={() => { setAuthMode('login'); setFeedbackMsg(null); }}
              className={`flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all ${
                authMode === 'login' ? 'neo-tab-active text-[#00F2FF]' : 'text-[#948e9c] hover:text-white'
              }`}
            >
              Sign In (Roll No)
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setFeedbackMsg(null); }}
              className={`flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all ${
                authMode === 'signup' ? 'neo-tab-active text-[#00F2FF]' : 'text-[#948e9c] hover:text-white'
              }`}
            >
              Register Cadet
            </button>
          </div>

          {/* Feedback Message Banner */}
          <AnimatePresence mode="wait">
            {feedbackMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-xl border font-mono text-xs flex items-center gap-3 ${
                  feedbackMsg.type === 'success' 
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' 
                    : 'border-rose-500/40 bg-rose-950/40 text-rose-300'
                }`}
              >
                {feedbackMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{feedbackMsg.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="font-mono text-xs text-[#cfbdff] uppercase flex items-center justify-between">
                  <span>Institute Roll Number</span>
                  <span className="text-[10px] text-[#948e9c]">e.g. 21BME042</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-[#948e9c] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={loginRoll}
                    onChange={(e) => setLoginRoll(e.target.value)}
                    placeholder="Enter Roll Number..."
                    className="w-full neo-inset pl-11 pr-4 py-3 rounded-xl font-mono text-sm text-white placeholder-[#605a6e] focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-[#cfbdff] uppercase flex items-center justify-between">
                  <span>Passcode</span>
                  <span className="text-[10px] text-[#00F2FF] hover:underline cursor-pointer">Forgot key?</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#948e9c] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full neo-inset pl-11 pr-4 py-3 rounded-xl font-mono text-sm text-white placeholder-[#605a6e] focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-[#948e9c]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#1c1827] border-[#494551] text-[#00F2FF] focus:ring-0"
                  />
                  <span>Persist Auth Key</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl neo-btn font-cyber font-bold text-sm text-[#00F2FF] hover:text-white uppercase tracking-wider border border-[#00F2FF]/40 hover:border-[#00F2FF] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="font-mono text-xs text-[#00F2FF] animate-pulse">CONNECTING MAINFRAME...</span>
                ) : (
                  <>
                    <span>AUTHENTICATE OPERATOR</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#cfbdff] uppercase">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#948e9c] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Cadet Name..."
                    className="w-full neo-inset pl-11 pr-4 py-2.5 rounded-xl font-mono text-xs text-white placeholder-[#605a6e] focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#cfbdff] uppercase">Roll Number</label>
                  <input
                    type="text"
                    value={signupRoll}
                    onChange={(e) => setSignupRoll(e.target.value)}
                    placeholder="22BME011"
                    className="w-full neo-inset px-4 py-2.5 rounded-xl font-mono text-xs text-white placeholder-[#605a6e] focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#cfbdff] uppercase">Subsystem Division</label>
                  <select
                    value={signupDept}
                    onChange={(e) => setSignupDept(e.target.value)}
                    className="w-full neo-inset px-3 py-2.5 rounded-xl font-mono text-xs text-[#cac4d2] bg-[#0b0a11] focus:outline-none focus:border-[#00F2FF]/60 border border-[#494551]/20"
                  >
                    <option value="Autonomous Systems">Autonomous Systems</option>
                    <option value="Mechanical & CAD">Mechanical & CAD</option>
                    <option value="Embedded Systems">Embedded Systems</option>
                    <option value="Power Electronics">Power Electronics</option>
                    <option value="Computer Vision AI">Computer Vision AI</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-[#cfbdff] uppercase">Institute Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#948e9c] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="cadet@inst.ac.in"
                    className="w-full neo-inset pl-11 pr-4 py-2.5 rounded-xl font-mono text-xs text-white placeholder-[#605a6e] focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#cfbdff] uppercase">Passcode</label>
                  <input
                    type="password"
                    value={signupPass}
                    onChange={(e) => setSignupPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full neo-inset px-4 py-2.5 rounded-xl font-mono text-xs text-white placeholder-[#605a6e] focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#cfbdff] uppercase">Confirm Passcode</label>
                  <input
                    type="password"
                    value={signupConfirmPass}
                    onChange={(e) => setSignupConfirmPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full neo-inset px-4 py-2.5 rounded-xl font-mono text-xs text-white placeholder-[#605a6e] focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl neo-btn font-cyber font-bold text-xs text-[#00F2FF] hover:text-white uppercase tracking-wider border border-[#00F2FF]/40 hover:border-[#00F2FF] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="font-mono text-xs text-[#00F2FF] animate-pulse">CREATING CADET PROFILE...</span>
                ) : (
                  <>
                    <span>REGISTER CADET PROFILE</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      )}
    </div>
  );
}
