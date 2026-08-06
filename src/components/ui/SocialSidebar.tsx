import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react';

export interface SocialLink {
  id: string;
  name: string;
  icon: any;
  url: string;
  colorHover: string;
}

export default function SocialSidebar() {
  const socials: SocialLink[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com',
      colorHover: 'hover:text-blue-400 hover:border-blue-400/60'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com',
      colorHover: 'hover:text-pink-400 hover:border-pink-400/60'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com',
      colorHover: 'hover:text-[#00F2FF] hover:border-[#00F2FF]/60'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com',
      colorHover: 'hover:text-[#cfbdff] hover:border-[#cfbdff]/60'
    }
  ];

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-4"
    >


      <div className="neo-card p-2.5 rounded-2xl flex flex-col gap-3.5 border border-[#cfbdff]/25 shadow-[0_10px_25px_rgba(0,0,0,0.8)] backdrop-blur-md relative group">


        {socials.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              whileHover={{ scale: 1.15, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2.5 rounded-xl neo-btn text-[#cac4d2] transition-all duration-300 flex items-center justify-center relative group/icon ${item.colorHover}`}
            >
              <Icon className="w-5 h-5 transition-transform duration-200" />

              <span className="absolute left-14 px-2.5 py-1 rounded-md bg-[#171422] text-[#e6e1e9] text-[10px] font-mono border border-[#cfbdff]/30 shadow-lg opacity-0 pointer-events-none group-hover/icon:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
                {item.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    </motion.aside>
  );
}
