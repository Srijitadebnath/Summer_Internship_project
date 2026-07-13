import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Mail, Search, Menu, X, Home, Users, Wrench, BookOpen, ShoppingBag } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface NavLink {
  name: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SocialLink {
  name: string;
  href: string;
  icon: () => React.ReactElement;
  colorClass: string;
}

const links: NavLink[] = [
  { name: 'HOME', href: '#home', description: 'Store homepage & overview', icon: Home },
  { name: 'ABOUT US', href: '#about', description: 'Our legacy and commitment', icon: Users },
  { name: 'PRODUCTS', href: '#products', description: 'Premium bathroom & fittings', icon: Wrench },
  { name: 'BRANDS', href: '#brands', description: 'Authorized brand partners', icon: BookOpen },
  { name: 'CONTACT US', href: '#contact', description: 'Get in touch & directions', icon: Mail },
];

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    colorClass: 'hover:bg-blue-600 hover:text-white',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    colorClass: 'hover:bg-pink-600 hover:text-white',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919832194842',
    icon: () => (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    colorClass: 'hover:bg-green-600 hover:text-white',
  },
];

export const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { cartCount, setCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, idx: number) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollTarget', href);
      navigate('/');
    } else {
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setActiveIndex(idx);
    }
  };

  useEffect(() => {
    const sectionIds = ['home', 'about', 'products', 'brands', 'contact'];

    const handleScrollSpy = () => {
      let currentActiveIndex = 0;
      const threshold = 200; // Highlight section when its top is within 200px of viewport top

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActiveIndex = i;
          }
        }
      }
      setActiveIndex(currentActiveIndex);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy(); // Run once initially

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // 1. Layer 1 (Bottom Underlay - Steel/Accent Blue)
  const layer1Variants = {
    initial: { x: '100%' },
    open: {
      x: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
    closed: {
      x: '100%',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.16 },
    },
  };

  // 2. Layer 2 (Middle Underlay - Deep Navy Blue)
  const layer2Variants = {
    initial: { x: '100%' },
    open: {
      x: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.08 },
    },
    closed: {
      x: '100%',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.08 },
    },
  };

  // 3. Layer 3 (Main Content Panel - White)
  const mainPanelVariants = {
    initial: { x: '100%' },
    open: {
      x: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.16 },
    },
    closed: {
      x: '100%',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0 },
    },
  };

  // 4. Staggered Menu Item (numbered lists)
  const menuItemVariants = {
    initial: { opacity: 0, y: 15 },
    open: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.35 + idx * 0.06, // Animates in sequence once panel slides in
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    }),
    closed: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.15,
      },
    },
  };

  // 5. Social & Logo details stagger in
  const footerVariants = {
    initial: { opacity: 0, y: 15 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7, // Appears after all links are rendered
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.15 },
    },
  };

  return (
    <>
      {/* 1. TOP INFORMATION STRIP (Desktop Only) */}
      <div className="hidden lg:block bg-neutral-light border-b border-neutral-cool py-2.5 text-xs text-neutral-dark/80 select-none">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919832194842" className="flex items-center gap-2 hover:text-accent transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>+91 98321 94842</span>
            </a>
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Durgapur, West Bengal</span>
            </div>
            <a href="mailto:debnathhardware22@yahoo.com" className="flex items-center gap-2 hover:text-accent transition-colors font-medium">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span>debnathhardware22@yahoo.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4 font-semibold text-primary">
            <span>Working Hours: Mon - Sun: 9:00 AM - 8:00 PM (Fri Closed)</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVBAR */}
      <nav className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-neutral-cool/60 py-4 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-3.5 group focus:outline-none">
            {/* Store Brand Logo */}
            <div className="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border border-neutral-cool">
              <img src="/logo.png" alt="Debnath Sanitary & Hardware Logo" className="w-full h-full object-contain p-0.5" />
            </div>
            {/* Shop Name Typography */}
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl md:text-2xl leading-none text-primary tracking-wide">
                DEBNATH
              </span>
              <span className="font-sans font-bold text-[10px] md:text-[11px] tracking-[0.18em] text-accent mt-0.5 leading-none">
                SANITARY & HARDWARE
              </span>
            </div>
          </a>

          {/* DESKTOP VIEW: Pill-shaped Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-neutral-cool/60 px-2 py-1.5 rounded-full border border-neutral-cool/40">
            {links.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(e) => handleLinkClick(e, link.href, idx)}
                className={`relative px-4.5 py-1.5 text-xs font-bold tracking-wider rounded-full transition-colors duration-200 z-10 focus:outline-none ${
                  activeIndex === idx ? 'text-white' : 'text-primary'
                }`}
              >
                {/* Active Sliding Pill Background */}
                {activeIndex === idx && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                {/* Hover Sliding Pill Background */}
                {hoveredIndex === idx && activeIndex !== idx && (
                  <motion.div
                    layoutId="hoverPill"
                    className="absolute inset-0 bg-neutral-cool rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                {link.name}
              </a>
            ))}
          </div>

          {/* DESKTOP VIEW: Actions (Search + Cart + CTA) */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-cool text-primary/80 hover:text-primary transition-colors focus:outline-none cursor-pointer" aria-label="Search">
              <Search className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-cool text-primary/80 hover:text-primary transition-colors focus:outline-none cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact', 4)}
              className="relative overflow-hidden bg-primary text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md shadow-primary/10 hover:shadow-lg focus:outline-none"
            >
              Enquire Now
            </a>
          </div>

        {/* MOBILE VIEW: Quick Cart + Quick Call + Hamburger toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-10 h-10 rounded-full border border-neutral-cool/80 flex items-center justify-center text-primary/80 hover:text-accent transition-colors bg-white shadow-sm cursor-pointer"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href="tel:+919832194842"
            className="w-10 h-10 rounded-full border border-neutral-cool/80 flex items-center justify-center text-primary/80 hover:text-accent transition-colors bg-white shadow-sm"
            aria-label="Call Store"
          >
            <Phone className="w-4.5 h-4.5" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-neutral-cool flex items-center justify-center text-primary hover:bg-neutral-cool/80 transition-colors focus:outline-none cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>

      {/* MOBILE VIEW: Staggered Drawer Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            
            {/* 1. Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-neutral-dark/30 backdrop-blur-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* 2. Layer 1 (Bottom Underlay - Steel/Accent Blue) */}
            <motion.div
              variants={layer1Variants}
              initial="initial"
              animate="open"
              exit="closed"
              className="fixed inset-0 w-full h-full bg-accent z-20 pointer-events-none"
            />

            {/* 3. Layer 2 (Middle Underlay - Deep Navy Blue) */}
            <motion.div
              variants={layer2Variants}
              initial="initial"
              animate="open"
              exit="closed"
              className="fixed inset-0 w-full h-full bg-primary z-30 pointer-events-none"
            />

            {/* 4. Layer 3 (Main Content Panel - White) */}
            <motion.div
              variants={mainPanelVariants}
              initial="initial"
              animate="open"
              exit="closed"
              className="fixed inset-0 w-full h-full bg-white z-40 shadow-2xl flex flex-col p-8 justify-between overflow-y-auto"
            >
              {/* Upper Content wrapper */}
              <div>
                {/* Panel Header (staggered in) */}
                <motion.div
                  variants={menuItemVariants}
                  custom={0}
                  className="flex justify-between items-center border-b border-neutral-cool pb-4"
                >
                  {/* Logo in drawer */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm border border-neutral-cool overflow-hidden">
                      <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-0.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-black text-base tracking-wide text-primary leading-none">DEBNATH</span>
                      <span className="font-sans font-bold text-[9px] tracking-[0.15em] text-accent mt-0.5 leading-none">SANITARY & HARDWARE</span>
                    </div>
                  </div>

                  {/* Close Action */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8.5 h-8.5 rounded-full bg-neutral-cool flex items-center justify-center text-primary hover:bg-neutral-cool/80 transition-colors focus:outline-none cursor-pointer"
                    aria-label="Close Menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>

                {/* Staggered Numbered Navigation Links */}
                <div className="flex flex-col gap-8 mt-14 items-center text-center">
                  {links.map((link, idx) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      custom={idx + 1}
                      variants={menuItemVariants}
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        handleLinkClick(e, link.href, idx);
                      }}
                      className="group flex flex-col items-center gap-1.5 focus:outline-none"
                    >
                      <span className="font-sans font-extrabold text-[10px] tracking-widest text-accent group-hover:text-primary transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="font-display font-extrabold text-2xl md:text-3xl text-primary tracking-wide group-hover:text-accent group-hover:scale-105 transition-all duration-200">
                        {link.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Footer Content wrapper (staggered in) */}
              <motion.div
                variants={footerVariants}
                className="border-t border-neutral-cool pt-6 mt-8 flex flex-col items-center gap-5"
              >
                {/* Contact info list */}
                <div className="flex flex-col items-center gap-2.5 text-xs text-neutral-dark/70 font-semibold text-center">
                  <a href="tel:+919832194842" className="flex items-center gap-2 hover:text-accent transition-colors">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span>+91 98321 94842</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>Durgapur, West Bengal</span>
                  </div>
                </div>

                {/* Social Buttons Row */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-9 h-9 rounded-full bg-neutral-cool flex items-center justify-center text-primary/80 transition-all duration-200 ${social.colorClass}`}
                      aria-label={social.name}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
