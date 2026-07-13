import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Heart } from 'lucide-react';

interface FooterSocialLink {
  name: string;
  href: string;
  icon: () => React.ReactElement;
  colorClass: string;
}

const footerSocialLinks: FooterSocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    colorClass: 'hover:bg-blue-600 hover:text-white border-blue-600/25 hover:border-blue-600',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    colorClass: 'hover:bg-pink-600 hover:text-white border-pink-600/25 hover:border-pink-600',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919832194842',
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    colorClass: 'hover:bg-green-600 hover:text-white border-green-600/25 hover:border-green-600',
  },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1200);
  };

  return (
    <footer className="relative w-full bg-[#0A1D37] text-white overflow-hidden pt-20 pb-8 border-t border-primary-hover">
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none" />
      
      {/* Background Blur Accents */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* TOP ROW: Brand and Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Logo and Brand Overview (Col-span 5) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-start gap-5">
            <a href="#home" className="flex items-center gap-3.5 group focus:outline-none">
              {/* Store Brand Logo */}
              <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border border-white/10">
                <img src="/logo.png" alt="Debnath Sanitary & Hardware Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              
              {/* Shop Name Typography */}
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg leading-none text-white tracking-wide">
                  DEBNATH
                </span>
                <span className="font-sans font-bold text-[9px] tracking-[0.18em] text-accent mt-0.5 leading-none">
                  SANITARY & HARDWARE
                </span>
              </div>
            </a>

            <p className="font-sans text-xs text-blue-100/70 leading-relaxed font-light max-w-sm mt-1">
              For over 25 years, we have provided premium bathroom fittings, pipes, smart locks, and water tanks to Durgapur. Built on durability, trust, and quality.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 mt-2">
              {footerSocialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full border bg-white/5 flex items-center justify-center text-blue-100/80 transition-all duration-250 ${social.colorClass}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer Column (Col-span 1) */}
          <div className="hidden lg:block col-span-1" />

          {/* Newsletter Box (Col-span 6) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center gap-4">
            <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
              Subscribe to Newsletter
            </h3>
            <p className="font-sans text-xs text-blue-100/70 font-light max-w-md">
              Receive updates on newly arrived catalogs, luxury bathroom product lines, bulk purchase deals, and plumbing guides.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative flex items-center max-w-md mt-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4.5 py-3.5 pr-14 text-xs text-white placeholder:text-blue-100/40 focus:bg-white/10 focus:border-accent focus:outline-none transition-all duration-200"
              />
              <button
                type="submit"
                disabled={submitting}
                className="absolute right-1.5 w-10.5 h-10.5 rounded-lg bg-accent hover:bg-accent-hover text-white flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-75 cursor-pointer"
                aria-label="Subscribe"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="flex items-center gap-2 text-green-400 text-xs font-semibold mt-1"
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Subscribed successfully! Thank you for joining.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* MIDDLE ROW: Links & Info Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-left">
          
          {/* Col 1: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-extrabold text-[11px] uppercase tracking-widest text-accent">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#home" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#about" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  About Our Legacy
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  Product Catalogue
                </a>
              </li>
              <li>
                <a href="#brands" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  Authorized Brands
                </a>
              </li>
              <li>
                <a href="#contact" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Services / Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-extrabold text-[11px] uppercase tracking-widest text-accent">Our Products</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#products" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  Luxury Bath Fittings
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  Leak-Proof Pipelines
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  Godrej Security Locks
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  LED vanity Mirrors
                </a>
              </li>
              <li>
                <a href="#products" className="text-xs text-blue-100/70 hover:text-white transition-colors font-light">
                  Geysers & Sinks
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div className="col-span-2 flex flex-col gap-4">
            <h4 className="font-display font-extrabold text-[11px] uppercase tracking-widest text-accent">Store Information</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-white font-bold">Showroom Address</span>
                  <span className="text-[11px] text-blue-100/75 leading-relaxed font-light mt-0.5">
                    Debnath Sanitary & Hardware,<br />Durgapur, West Bengal, India
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3.5">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-white font-bold">Contact Number</span>
                  <a href="tel:+919832194842" className="text-[11px] text-blue-100/75 hover:text-white transition-colors font-light mt-0.5">
                    +91 98321 94842
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3.5">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs text-white font-bold">Email Inbox</span>
                  <a href="mailto:debnathhardware22@yahoo.com" className="text-[11px] text-blue-100/75 hover:text-white transition-colors font-light mt-0.5">
                    debnathhardware22@yahoo.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright & Details */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center select-none">
          <span className="text-[10px] text-blue-100/50 font-medium">
            © {new Date().getFullYear()} Debnath Sanitary & Hardware. All rights reserved.
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-blue-100/50 font-medium">
            <span>Built with precision for the future of homes</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </span>
          <div className="flex items-center gap-4 text-[10px] text-blue-100/50">
            <a href="#contact" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <a href="#contact" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
