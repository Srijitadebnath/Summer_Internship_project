import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Wrench, CheckCircle2 } from 'lucide-react';

export const Founder: React.FC = () => {
  // Staggered reveal for stats/pillars
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="about" className="relative w-full min-h-[85vh] bg-primary text-white py-20 px-6 md:px-12 lg:px-20 border-b border-primary-hover overflow-hidden z-10 flex items-center scroll-mt-20">
      {/* Background blueprint details mapped to white overlay for visibility */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Founder Card Profile & Vision (Col-span 6) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-6 flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            {/* Square Frame on Desktop, Circular on Mobile */}
            <div className="relative w-40 h-40 sm:w-36 sm:h-36 lg:w-56 lg:h-56 rounded-full lg:rounded-2xl border-4 border-white/20 overflow-hidden flex-shrink-0 bg-neutral-cool shadow-md">
              <img
                src="/assets/images/founder.png"
                alt="Mr. Sujan Debnath, Founder of Debnath Sanitary and Hardware"
                className="w-full h-full object-cover object-center scale-105"
                loading="lazy"
              />
            </div>

            {/* Profile details & vision statement */}
            <div className="text-center sm:text-left flex-grow">
              <div className="flex flex-col">
                <span className="font-sans font-black text-[9px] tracking-[0.2em] text-blue-200 uppercase leading-none mb-1">
                  Founder
                </span>
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-white tracking-wide">
                  Mr. Sujan Debnath
                </h3>
                <span className="font-sans font-bold text-[10px] tracking-wider text-blue-200/85 mt-0.5 uppercase leading-none">
                  Founder & Managing Director
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-end gap-3 mt-4 border-t border-white/10 pt-4">
                <p className="font-sans text-xs md:text-sm text-blue-100/95 leading-relaxed font-light italic">
                  "Our legacy is built on the pillars of absolute durability, technical excellence, and the trust of thousands of homes. We do not just sell hardware; we deliver peace of mind."
                </p>
                {/* SVG Signature representation (white stroke) */}
                <div className="flex-shrink-0 opacity-70 hidden sm:block mb-1" aria-hidden="true">
                  <svg className="w-24 h-6 text-white" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 30c10-15 15-20 25-22s12 18 8 24-15 4-22-2 15-18 35-15 25 15 35 12 12-18 6-12-8 14 5 10c15-4 28-20 35-8s-8 18 10 10 25-16 30-10" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* VERTICAL DIVIDER (Desktop Only) */}
          <div className="hidden lg:block col-span-1 justify-self-center">
            <div className="w-px h-28 bg-white/15" />
          </div>

          {/* RIGHT SIDE: Core Pillars Grid (Col-span 5) */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="col-span-1 lg:col-span-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {/* Pillar 1 */}
            <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
              <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white mb-3 bg-white/5 flex-shrink-0">
                <Award className="w-4 h-4 text-blue-200" />
              </div>
              <h4 className="font-display font-extrabold text-xs md:text-sm text-white uppercase tracking-wider">
                25+ Years of Trust
              </h4>
              <p className="font-sans text-[11px] text-blue-100/70 mt-1.5 leading-relaxed font-light">
                Serving plumbers, contractors, and homeowners with integrity since 2001.
              </p>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
              <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white mb-3 bg-white/5 flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-blue-200" />
              </div>
              <h4 className="font-display font-extrabold text-xs md:text-sm text-white uppercase tracking-wider">
                Durability First
              </h4>
              <p className="font-sans text-[11px] text-blue-100/70 mt-1.5 leading-relaxed font-light">
                Strict sourcing of materials selected to withstand high pressures and corrosion.
              </p>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
              <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white mb-3 bg-white/5 flex-shrink-0">
                <Wrench className="w-4 h-4 text-blue-200" />
              </div>
              <h4 className="font-display font-extrabold text-xs md:text-sm text-white uppercase tracking-wider">
                Expert Guidance
              </h4>
              <p className="font-sans text-[11px] text-blue-100/70 mt-1.5 leading-relaxed font-light">
                Technical support to help you calculate exact schedules and sizing.
              </p>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div variants={itemVariants} className="flex flex-col items-start text-left">
              <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white mb-3 bg-white/5 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-blue-200" />
              </div>
              <h4 className="font-display font-extrabold text-xs md:text-sm text-white uppercase tracking-wider">
                50+ Top Brands
              </h4>
              <p className="font-sans text-[11px] text-blue-100/70 mt-1.5 leading-relaxed font-light">
                Authorized partner for Jaguar, Astral, Godrej, Prince, and more.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
