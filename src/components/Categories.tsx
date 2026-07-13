import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CategoryItem {
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
  accentClass: string;
}

const CategoryCardInner: React.FC<{ category: CategoryItem }> = ({ category }) => {
  return (
    <>
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      {/* Top border highlight glow */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Icon and Category Title Row */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-neutral-cool group-hover:border-accent/20 transition-all duration-300">
            {category.icon}
          </div>
          
          {/* Decorative faint background accent */}
          <span className="text-xs font-black tracking-widest text-neutral-dark/15 select-none uppercase">
            COLLECTION
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-extrabold text-lg text-primary uppercase group-hover:text-accent transition-colors duration-250 mb-2">
          {category.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs text-neutral-dark/65 leading-relaxed font-light mb-6">
          {category.description}
        </p>

        {/* Technical sub-items list */}
        <div className="border-t border-neutral-cool/60 pt-4 mb-6">
          <span className="text-[10px] font-bold text-neutral-dark/40 uppercase tracking-wider block mb-3">
            Featured Subcategories
          </span>
          <ul className="flex flex-col gap-2.5">
            {category.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs font-medium text-primary">
                {/* Bullet SVG Arrow */}
                <svg className="w-3.5 h-3.5 text-accent flex-shrink-0 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span className="text-neutral-dark/80 group-hover:text-neutral-dark transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button at bottom */}
      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider group-hover:text-primary transition-colors">
        <span>Explore Range</span>
        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </>
  );
};

interface ScrollStackCardProps {
  category: CategoryItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onClick?: () => void;
}

const ScrollStackCard: React.FC<ScrollStackCardProps> = ({ category, index, total, scrollYProgress, onClick }) => {
  const targetScale = 0.85 + index * 0.03;
  const targetOpacity = 0.9 + index * 0.02;
  const isLast = index === total - 1;

  const startRange = index / total;
  const endRange = (index + 1) / total;

  const transformedScale = useTransform(scrollYProgress, [startRange, endRange], [1, targetScale], { clamp: true });
  const scale = isLast ? 1 : transformedScale;

  const transformedOpacity = useTransform(scrollYProgress, [startRange, endRange], [1, targetOpacity], { clamp: true });
  const opacity = isLast ? 1 : transformedOpacity;

  return (
    <motion.div
      style={{
        scale,
        opacity,
        top: `calc(100px + ${index * 30}px)`,
      }}
      onClick={onClick}
      className="sticky w-full bg-gradient-to-br from-[#EBF2FC] via-[#E1ECFA] to-[#D4E4F7] border border-primary/25 rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:shadow-primary/15 transition-all duration-300 cursor-pointer overflow-hidden z-10 shadow-md shadow-primary/5 h-[460px] sm:h-[420px]"
    >
      <CategoryCardInner category={category} />
    </motion.div>
  );
};

export const Categories: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      title: 'Bathroom Fittings',
      description: 'Elegant bathroom brassware and accessories built for high aesthetic value and smooth operation.',
      items: ['Premium Mixer Faucets', 'Overhead & Hand Showers', 'Thermostatic Diverters', 'Health Faucets & Taps'],
      accentClass: 'from-blue-500 to-indigo-600',
      icon: (
        <svg className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Shower head motif */}
          <path d="M4 4h7a4 4 0 0 1 4 4v12" />
          <path d="M12 20h6" />
          <path d="M18 17a3 3 0 0 1-3 3" />
          <path d="M14 8h2" />
          <circle cx="15" cy="12" r="1" className="fill-accent" />
          <circle cx="18" cy="11" r="1" className="fill-accent" />
          <circle cx="17" cy="14" r="1" className="fill-accent" />
        </svg>
      ),
    },
    {
      title: 'Pipeline & Fittings',
      description: 'Commercial and residential grade pipes, connectors, and valves designed for zero-leakage plumbing networks.',
      items: ['CPVC & UPVC Pressure Pipes', 'Brass Threaded Fittings', 'Ball Valves & Flow Controls', 'SWR Drainage Pipelines'],
      accentClass: 'from-cyan-500 to-blue-600',
      icon: (
        <svg className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Pipeline T-junction motif */}
          <path d="M3 12h6M15 12h6" />
          <path d="M12 15v6" />
          <path d="M12 9V3" />
          <rect x="9" y="9" width="6" height="6" rx="1.5" className="fill-accent/15" />
          <circle cx="6" cy="12" r="1" className="fill-accent" />
          <circle cx="18" cy="12" r="1" className="fill-accent" />
          <circle cx="12" cy="18" r="1" className="fill-accent" />
        </svg>
      ),
    },
    {
      title: 'Geysers & Water Heaters',
      description: 'Instant and storage water heaters equipped with heavy-duty corrosion-resistant heating elements.',
      items: ['Instant Water Heaters', '5-Star Energy Storage Tanks', 'Corrosion-Resistant Glass-lined', 'Digital Safety Gas Heaters'],
      accentClass: 'from-amber-500 to-red-500',
      icon: (
        <svg className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Heat wave water droplet motif */}
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
          <path d="M9 14h6" className="text-white" />
          <path d="M10 17h4" className="text-white" />
        </svg>
      ),
    },
    {
      title: 'Godrej Material',
      description: 'Ultra-secure locks, heavy cabinet hinges, and architectural fittings by Godrej for complete home safety.',
      items: ['Main Door Locksets', 'Digital Electronic Smartlocks', 'Heavy Duty Brass Padlocks', 'Premium Cabinet & Wardrobe Latches'],
      accentClass: 'from-purple-600 to-indigo-700',
      icon: (
        <svg className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* High security padlock/key motif */}
          <rect x="5" y="11" width="14" height="10" rx="2" className="fill-accent/15" />
          <path d="M12 16v-2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      ),
    },
    {
      title: 'Glass Mirrors',
      description: 'High-definition designer mirrors with option of LED backlighting, touch sensors, and anti-fog systems.',
      items: ['LED Backlit Smart Mirrors', 'Framed Vanity & Bathroom Mirrors', 'Beveled Edge Display Glass', 'Anti-Fog Touch Sensor Mirrors'],
      accentClass: 'from-teal-400 to-emerald-600',
      icon: (
        <svg className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Vanity mirror outline with sparkles */}
          <rect x="4" y="3" width="16" height="18" rx="8" className="fill-accent/15" />
          <path d="M8 7c0-1.5 1.5-2 3-2" />
          <path d="M17 19c-1 1-2 1.5-3 1.5" />
          <path d="M18 6l1-1 1 1-1 1z" className="text-accent fill-accent" />
        </svg>
      ),
    },
    {
      title: 'Basin & Cabinets',
      description: 'Sleek under-counter ceramic basins integrated with custom wooden or steel bathroom vanity cabinets.',
      items: ['Ceramic Tabletop Wash Basins', 'Waterproof Wood Vanity Cabinets', 'Under-counter Quartz Sinks', 'Integrated Wall-hung Cabinets'],
      accentClass: 'from-sky-500 to-blue-700',
      icon: (
        <svg className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Vanity sink cabinet motif */}
          <rect x="3" y="10" width="18" height="11" rx="2" className="fill-accent/15" />
          <path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
          <path d="M12 3v3" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <circle cx="12" cy="18" r="1" className="fill-accent" />
        </svg>
      ),
    },
  ];

  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Grid staggered variants
  const gridVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 90,
        damping: 16,
      },
    },
  };

  return (
    <section id="products" className="relative w-full bg-white py-24 px-6 md:px-12 lg:px-20 border-b border-neutral-cool/60 scroll-mt-20">
      {/* Background visual accents */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.2] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans font-black text-[10px] tracking-[0.25em] text-accent uppercase mb-3">
            Our Curated Collections
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-primary uppercase tracking-tight max-w-xl leading-tight">
            Explore Our <br />
            Product Categories
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mt-4" />
        </div>

        {/* Desktop View (lg:grid) */}
        <motion.div
          variants={gridVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          className="hidden lg:grid grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              onClick={() => {
                if (category.title === 'Pipeline & Fittings') {
                  navigate('/pipeline-catalogue');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (category.title === 'Bathroom Fittings') {
                  navigate('/bathroom-catalogue');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="group relative bg-gradient-to-br from-[#EBF2FC] via-[#E1ECFA] to-[#D4E4F7] border border-primary/25 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1.5 cursor-pointer overflow-hidden z-10 shadow-md shadow-primary/5"
            >
              <CategoryCardInner category={category} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile & Tablet View (lg:hidden) - Scroll Stack */}
        <div
          ref={containerRef}
          className="lg:hidden flex flex-col gap-12 pb-24 relative"
        >
          {categories.map((category, idx) => (
            <ScrollStackCard
              key={category.title}
              category={category}
              index={idx}
              total={categories.length}
              scrollYProgress={scrollYProgress}
              onClick={() => {
                if (category.title === 'Pipeline & Fittings') {
                  navigate('/pipeline-catalogue');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (category.title === 'Bathroom Fittings') {
                  navigate('/bathroom-catalogue');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
