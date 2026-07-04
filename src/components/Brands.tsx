import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2 } from 'lucide-react';

interface BrandItem {
  name: string;
  type: string;
  desc: string;
  accent: string;
  logoFile: string;
  websiteUrl: string;
}

const getBrandLogoFallback = (name: string) => {
  switch (name) {
    case 'PARRYWARE':
      return (
        <svg viewBox="0 0 100 30" className="w-24 h-auto select-none pointer-events-none">
          <text x="5" y="20" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="#005FA4" fontStyle="italic">Parryware</text>
          <text x="5" y="28" fontFamily="sans-serif" fontWeight="700" fontSize="6" fill="#E11B22" letterSpacing="0.05em">always in fashion</text>
        </svg>
      );
    case 'ESS ESS':
      return (
        <svg viewBox="0 0 120 40" className="w-24 h-auto select-none pointer-events-none">
          <defs>
            <linearGradient id="ap-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11B22" />
              <stop offset="50%" stopColor="#FF5E62" />
              <stop offset="100%" stopColor="#FF9E00" />
            </linearGradient>
          </defs>
          <path d="M12,22 C12,12 20,10 24,14 C28,18 22,24 18,24 C14,24 12,18 16,12 Q24,2 32,15" stroke="url(#ap-grad2)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <text x="38" y="20" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="#E11B22">ess ess</text>
          <text x="38" y="28" fontFamily="sans-serif" fontWeight="700" fontSize="6" fill="#666" letterSpacing="0.05em">BY ASIAN PAINTS</text>
        </svg>
      );
    case 'GODREJ':
      return (
        <svg viewBox="0 0 100 40" className="w-20 h-auto select-none pointer-events-none">
          <text x="50%" y="65%" textAnchor="middle" fontFamily="Georgia, cursive, sans-serif" fontWeight="bold" fontSize="22" fill="#7B2CBF" fontStyle="italic">
            Godrej
          </text>
        </svg>
      );
    case 'HINDWARE':
      return (
        <svg viewBox="0 0 100 30" className="w-20 h-auto select-none pointer-events-none">
          <text x="10" y="20" fontFamily="sans-serif" fontWeight="800" fontSize="16" fill="#008080" letterSpacing="-0.02em">hindware</text>
          <rect x="88" y="10" width="5" height="5" fill="#EF233C" />
        </svg>
      );
    case 'SINTEX':
      return (
        <svg viewBox="0 0 100 30" className="w-20 h-auto select-none pointer-events-none">
          <rect x="0" y="0" width="100" height="30" rx="4" fill="#005FA4" />
          <text x="50%" y="65%" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="#FFFFFF" letterSpacing="0.1em">SINTEX</text>
        </svg>
      );
    case 'V-GUARD':
      return (
        <svg viewBox="0 0 120 40" className="w-24 h-auto select-none pointer-events-none">
          <rect x="0" y="0" width="120" height="40" rx="3" fill="#111111" />
          <path d="M35,15 Q65,10 85,20 Q80,24 88,27 M82,21 L85,23" stroke="#FF9E00" strokeWidth="1.5" fill="none" />
          <text x="15" y="24" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#FF9E00">V-GUARD</text>
          <text x="15" y="32" fontFamily="sans-serif" fontWeight="700" fontSize="5" fill="#FFFFFF" letterSpacing="0.05em">Bring home a better tomorrow</text>
        </svg>
      );
    case 'BATHSENSE':
      return (
        <svg viewBox="0 0 120 40" className="w-24 h-auto select-none pointer-events-none">
          <defs>
            <linearGradient id="ap-grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11B22" />
              <stop offset="50%" stopColor="#FF5E62" />
              <stop offset="100%" stopColor="#FF9E00" />
            </linearGradient>
          </defs>
          <path d="M12,22 C12,12 20,10 24,14 C28,18 22,24 18,24 C14,24 12,18 16,12 Q24,2 32,15" stroke="url(#ap-grad3)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <text x="38" y="20" fontFamily="sans-serif" fontWeight="900" fontSize="12" fill="#E11B22">bathsense</text>
          <text x="38" y="28" fontFamily="sans-serif" fontWeight="700" fontSize="6" fill="#666" letterSpacing="0.05em">BY ASIAN PAINTS</text>
        </svg>
      );
    case 'PENGUIN':
      return (
        <svg viewBox="0 0 120 35" className="w-24 h-auto select-none pointer-events-none">
          <path d="M15,5 Q10,12 12,20 Q10,24 15,28 Q20,24 18,20 Q20,12 15,5 Z" fill="#0077B6" />
          <circle cx="15" cy="10" r="1.5" fill="#FFFFFF" />
          <path d="M13,12 Q15,15 17,12" stroke="#FFFFFF" strokeWidth="1" fill="none" />
          <text x="32" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="#0077B6" letterSpacing="0.05em">PENGUIN</text>
          <text x="32" y="30" fontFamily="sans-serif" fontWeight="700" fontSize="6" fill="#666" letterSpacing="0.1em">WATER TANKS</text>
        </svg>
      );
    case 'FINOLEX':
      return (
        <svg viewBox="0 0 100 30" className="w-24 h-auto select-none pointer-events-none">
          <rect x="0" y="0" width="100" height="30" rx="3" fill="#FFEB3B" />
          <text x="50%" y="50%" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#005FA4">FINOLEX</text>
          <text x="50%" y="80%" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="6" fill="#005FA4" letterSpacing="0.05em">PIPES & FITTINGS</text>
        </svg>
      );
    case 'ROCA':
      return (
        <svg viewBox="0 0 100 30" className="w-20 h-auto select-none pointer-events-none">
          <rect x="0" y="0" width="100" height="30" rx="3" fill="#111111" />
          <text x="50%" y="55%" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="bold" fontSize="15" fill="#FFFFFF" letterSpacing="0.05em">Roca</text>
          <path d="M 20 22 Q 50 18, 80 22" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'SUPREME':
      return (
        <svg viewBox="0 0 100 30" className="w-24 h-auto select-none pointer-events-none">
          <text x="5" y="20" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="#D90429" fontStyle="italic">Supreme</text>
          <text x="5" y="28" fontFamily="sans-serif" fontWeight="700" fontSize="5.5" fill="#333" letterSpacing="0.02em">PEOPLE WHO KNOW PLASTICS BEST</text>
        </svg>
      );
    default:
      return (
        <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export const Brands: React.FC = () => {
  const brandPartners: BrandItem[] = [
    { name: 'PARRYWARE', type: 'Sanitaryware & Wellness', desc: 'Official Partner', accent: 'from-[#005FA4] to-[#0091FF]', logoFile: 'parryware.png', websiteUrl: 'https://www.parryware.in' },
    { name: 'ROCA', type: 'Luxury Sanitaryware', desc: 'Premium Partner', accent: 'from-[#111111] to-[#333333]', logoFile: 'roca.png', websiteUrl: 'https://www.roca.in' },
    { name: 'SUPREME', type: 'CPVC & SWR Pipelines', desc: 'Official Distributor', accent: 'from-[#D90429] to-[#EF233C]', logoFile: 'supreme.png', websiteUrl: 'https://www.supreme.co.in' },
    { name: 'FINOLEX', type: 'Plumbing & Pipe Networks', desc: 'Official Distributor', accent: 'from-[#FFEB3B] to-[#005FA4]', logoFile: 'finolex.png', websiteUrl: 'https://www.finolexpipes.com' },
    { name: 'V-GUARD', type: 'Instant Water Heaters', desc: 'Official Partner', accent: 'from-[#FF9E00] to-[#FF6000]', logoFile: 'vguard.png', websiteUrl: 'https://www.vguard.in' },
    { name: 'ESS ESS', type: 'Bath Fittings & Accessories', desc: 'Authorized Partner', accent: 'from-[#E11B22] to-[#FF5E62]', logoFile: 'essess.png', websiteUrl: 'https://www.asianpaints.com/products/bath-fittings.html' },
    { name: 'GODREJ', type: 'Smart Security & Locks', desc: 'Authorized Retailer', accent: 'from-[#7B2CBF] to-[#9D4EDD]', logoFile: 'godrej.png', websiteUrl: 'https://www.godrejlocks.com' },
    { name: 'SINTEX', type: 'Water Storage Solutions', desc: 'Authorized Dealer', accent: 'from-[#242424] to-[#454545]', logoFile: 'sintex.png', websiteUrl: 'https://www.sintexonline.com' },
    { name: 'BATHSENSE', type: 'Sanitary & Bath Fittings', desc: 'Authorized Partner', accent: 'from-[#1A936F] to-[#118AB2]', logoFile: 'bathsense.png', websiteUrl: 'https://www.asianpaints.com/products/bath-fittings/bathsense.html' },
    { name: 'PENGUIN', type: 'Water Storage Tanks', desc: 'Official Partner', accent: 'from-[#0077B6] to-[#00B4D8]', logoFile: 'penguin.png', websiteUrl: 'https://penguintank.com' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.8;

    const scroll = () => {
      if (!isHovered && !isDragging) {
        container.scrollLeft += scrollSpeed;
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const halfWidth = container.scrollWidth / 2;
    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += halfWidth;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    setIsDragging(true);
    const startX = e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - container.offsetLeft;
      const walk = (moveEvent.type === 'touchmove') 
        ? 0 
        : (x - startX) * 1.5;
      
      container.scrollLeft = scrollLeft - walk;

      const halfWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += halfWidth;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleImageError = (brandName: string) => {
    setLogoErrors(prev => ({
      ...prev,
      [brandName]: true
    }));
  };

  return (
    <section id="brands" className="relative w-full bg-neutral-cool/20 py-24 px-6 md:px-12 lg:px-20 border-b border-neutral-cool/60 overflow-hidden">
      {/* Background blueprint detail */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.3] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-neutral-cool shadow-sm mb-4">
            <Shield className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span className="text-[9px] font-black tracking-widest text-primary uppercase">Guaranteed Authenticity</span>
          </div>
          
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-primary uppercase tracking-tight max-w-xl leading-tight">
            Our Authorized <br />
            Premium Brands
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-dark/65 max-w-lg mt-3 leading-relaxed font-light">
            We partner with the nation's most trusted manufacturers to deliver plumbing and sanitary products that stand the test of time.
          </p>
          <div className="w-16 h-1 bg-accent rounded-full mt-5" />
        </div>

        {/* Infinite Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsDragging(false);
          }}
          className="flex overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing snap-x select-none gap-6 pb-6"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Double list of brands for seamless looping */}
          {[...brandPartners, ...brandPartners].map((brand, index) => {
            const hasError = logoErrors[brand.name];
              return (
                <a
                  key={`${brand.name}-${index}`}
                  href={brand.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-[280px] group relative bg-gradient-to-br from-[#EBF2FC] via-[#E1ECFA] to-[#D4E4F7] border border-primary/25 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1.5 cursor-pointer block select-none"
                >
                  {/* Outer decorative gradient border line */}
                  <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${brand.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />

                  <div>
                    {/* Brand Logo Card Header */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[9px] font-black tracking-widest text-accent group-hover:text-primary transition-colors">
                        {brand.desc}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 opacity-80" />
                    </div>

                    {/* Brand Graphic Icon (Official Logo / SVG Fallback) */}
                    <div className="w-full h-18 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-neutral-cool group-hover:border-accent/20 transition-all duration-300 mb-5 mx-auto px-5 py-2">
                      {!hasError ? (
                        <img
                          src={`/brands/${brand.logoFile}`}
                          alt={`${brand.name} official logo`}
                          onError={() => handleImageError(brand.name)}
                          className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                        />
                      ) : (
                        getBrandLogoFallback(brand.name)
                      )}
                    </div>

                    {/* Bold Typographic Brand Name */}
                    <h3 className="font-display font-black text-xl text-primary tracking-tight uppercase text-center mb-1">
                      <span className={`bg-gradient-to-r ${brand.accent} bg-clip-text text-transparent`}>
                        {brand.name === 'ESS ESS' ? 'ESS ESS' : brand.name}
                      </span>
                      {brand.name === 'ESS ESS' && (
                        <span className="text-[10px] block text-neutral-dark/45 font-bold tracking-wider mt-0.5 font-sans">
                          ASIAN PAINTS
                        </span>
                      )}
                      {brand.name === 'BATHSENSE' && (
                        <span className="text-[10px] block text-neutral-dark/45 font-bold tracking-wider mt-0.5 font-sans">
                          ASIAN PAINTS
                        </span>
                      )}
                    </h3>

                    {/* Brand Segment type */}
                    <p className="font-sans text-[10px] font-semibold text-neutral-dark/50 uppercase tracking-wider text-center">
                      {brand.type}
                    </p>
                  </div>

                  {/* Status footer inside card */}
                  <div className="mt-6 border-t border-neutral-cool/60 pt-4 flex items-center justify-between text-[9px] font-bold text-neutral-dark/60">
                    <span>Genuine Warranty</span>
                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">Official Partner</span>
                  </div>
                </a>
              );
          })}
        </div>

        {/* Brand guarantee banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 bg-white border border-neutral-cool rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md shadow-primary/2"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-primary uppercase">Official Manufacturer Warranty</h4>
              <p className="font-sans text-xs text-neutral-dark/65 mt-0.5 leading-relaxed font-light">
                All purchased brand products carry direct manufacturer guarantees and full local dealer support.
              </p>
            </div>
          </div>
          
          <a
            href="#contact"
            className="w-full sm:w-auto bg-primary text-white font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-xl hover:bg-primary-hover active:scale-98 transition-all duration-200 text-center shadow-sm"
          >
            Enquire About Brands
          </a>
        </motion.div>

      </div>
    </section>
  );
};
