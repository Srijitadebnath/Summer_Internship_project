import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Award, CheckCircle2 } from 'lucide-react';

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 25 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 110,
      damping: 18,
    },
  },
};

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative w-full bg-neutral-light overflow-hidden min-h-[550px] lg:min-h-[600px] flex items-center scroll-mt-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: Texts & Call to Actions (Col-span 5) */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="col-span-1 lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center px-6 md:px-12 py-12 lg:py-20 z-10 bg-white blueprint-grid border-r border-neutral-cool/40"
        >
          {/* Subtle Trust Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 self-start bg-neutral-cool px-3.5 py-1.5 rounded-full border border-neutral-cool/80 mb-6 text-[10px] font-extrabold text-primary tracking-wider uppercase"
          >
            <Award className="w-3.5 h-3.5 text-accent" />
            <span>Debnath Trust Assured</span>
          </motion.div>

          {/* Heading with Display Font (Syne) */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold text-3xl md:text-4xl lg:text-5.5xl text-primary leading-[1.12] tracking-tight mb-4 uppercase"
          >
            Quality Hardware <br className="hidden md:inline" />
            <span className="text-accent">& Sanitary Solutions</span>
          </motion.h1>

          {/* Description (Sora) */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-sm md:text-base text-neutral-dark/70 leading-relaxed mb-8 max-w-lg font-light"
          >
            Reliable products for every need – Quality, Durability & Trust. Explore our curated range of bathroom fittings, pipes, hardware components, and building essentials.
          </motion.p>

          {/* CTA Buttons Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
          >
            {/* View Catalogue Button */}
            <a
              href="#products"
              className="group flex justify-center items-center gap-2 bg-primary text-white font-bold text-xs tracking-wider uppercase px-6 py-4 rounded-xl hover:bg-primary-hover active:scale-98 transition-all duration-200 shadow-md shadow-primary/10 hover:shadow-lg focus:outline-none border border-primary"
            >
              <span>View Catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Contact Us Button */}
            <a
              href="#contact"
              className="group flex justify-center items-center gap-2 bg-white text-primary border-2 border-primary/20 hover:border-primary/40 font-bold text-xs tracking-wider uppercase px-6 py-3.8 rounded-xl hover:bg-neutral-cool/40 active:scale-98 transition-all duration-200 focus:outline-none"
            >
              <span>Contact Us</span>
              <MessageSquare className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
            </a>
          </motion.div>

          {/* Quick trust metrics under buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 mt-10 border-t border-neutral-cool/80 pt-6"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Premium Quality Brands</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Lifetime Durability</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Video Showcase (Col-span 7) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 lg:col-span-7 order-1 lg:order-2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-0 bg-neutral-cool overflow-hidden"
        >
          {/* Slanted Container Mask (Desktop only) */}
          <div className="absolute inset-0 w-full h-full lg:slanted-mask overflow-hidden bg-neutral-cool">
            {/* Visual overlay gradient for premium cinematic touch */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-black/35 z-10 pointer-events-none" />
            
            {/* Showroom Video element */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-[1.01]"
              poster="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
            >
              {/* High-quality modern sanitary showroom / bath design loop */}
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-modern-bathroom-interior-with-bathtub-41484-large.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Video overlay floating card */}
            <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-3 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/40 shadow-lg max-w-[280px]">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold tracking-wider text-accent uppercase leading-none mb-1">
                  Virtual Tour
                </span>
                <span className="text-[11px] font-bold text-primary leading-tight font-sans">
                  Debnath Premium Showroom Ongoing
                </span>
              </div>
            </div>

            {/* Slanted Accent Border Overlay (matches slant edge) */}
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b from-accent to-secondary opacity-70 z-20 hidden lg:block pointer-events-none transform -skew-x-[8.5deg] origin-top" />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};
