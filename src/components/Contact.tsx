import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, ArrowRight, ExternalLink } from 'lucide-react';

// Custom WhatsApp SVG icon path for a premium look
const WhatsAppIcon = () => (
  <svg className="w-4.5 h-4.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

export const Contact: React.FC = () => {
  const [isStoreOpen, setIsStoreOpen] = useState<boolean>(false);

  // Check if store is open
  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeDecimal = hours + minutes / 60;

      // Monday to Sunday, except Friday (day 5 is Friday). Open 9:00 AM to 8:00 PM (9.00 to 20.00)
      if (day !== 5 && timeDecimal >= 9.00 && timeDecimal <= 20.00) {
        setIsStoreOpen(true);
      } else {
        setIsStoreOpen(false);
      }
    };

    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // WhatsApp connection link helper
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      "Hello Debnath Sanitary & Hardware! I visited your website and would like to enquire about your products."
    );
    return `https://wa.me/919832194842?text=${text}`;
  };

  return (
    <section id="contact" className="relative w-full bg-white py-24 px-6 md:px-12 lg:px-20 border-b border-neutral-cool/60 scroll-mt-20">
      {/* Background blueprint details mapped to soft blue tint */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.2] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans font-black text-[10px] tracking-[0.25em] text-accent uppercase mb-3">
            Visit Our Store
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-primary uppercase tracking-tight max-w-xl leading-tight">
            Find Us & <br />
            Visit Our Showroom
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-dark/65 max-w-lg mt-3 leading-relaxed font-light">
            Need hardware consultation, bulk pricing, or product catalog checks? Drop by our showroom or get in touch instantly.
          </p>
          <div className="w-16 h-1 bg-accent rounded-full mt-5" />
        </div>

        {/* 1. TOP CARDS ROW: Key Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: Phone & WhatsApp */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-[#EBF2FC] to-[#D4E4F7]/40 border border-primary/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-accent/20 transition-all duration-300 group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wide mb-1">Call & WhatsApp</h3>
              <p className="font-sans text-xs text-neutral-dark/70 font-light mb-4">Direct store line for sales & support.</p>
            </div>
            <div>
              <a href="tel:+919832194842" className="text-sm font-extrabold text-primary hover:text-accent block transition-colors mb-2">
                +91 98321 94842
              </a>
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <WhatsAppIcon />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2: Physical Location */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-[#EBF2FC] to-[#D4E4F7]/40 border border-primary/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-accent/20 transition-all duration-300 group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wide mb-1">Our Location</h3>
              <p className="font-sans text-xs text-neutral-dark/70 font-light mb-4">Durgapur, West Bengal, India.</p>
            </div>
            <div>
              <span className="text-xs font-bold text-primary block leading-relaxed mb-2">
                Debnath Sanitary & Hardware,<br />Durgapur, West Bengal
              </span>
              <a 
                href="https://maps.google.com/?q=Debnath+Sanitary+&+Hardware,+Durgapur,+West+Bengal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Card 3: Business Hours */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gradient-to-br from-[#EBF2FC] to-[#D4E4F7]/40 border border-primary/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-accent/20 transition-all duration-300 group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wide mb-1">Business Hours</h3>
              <p className="font-sans text-xs text-neutral-dark/70 font-light mb-4">Weekly opening hours schedule.</p>
            </div>
            <div>
              <span className="text-xs font-bold text-primary block mb-2">
                Mon - Sun: 9:00 AM - 8:00 PM <br className="hidden sm:inline" />(Friday Closed)
              </span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-dark/60">
                  {isStoreOpen ? 'Store is Open Now' : 'Store is Closed Now'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Email Address */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-gradient-to-br from-[#EBF2FC] to-[#D4E4F7]/40 border border-primary/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:border-accent/20 transition-all duration-300 group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-sm text-primary uppercase tracking-wide mb-1">Email Enquiries</h3>
              <p className="font-sans text-xs text-neutral-dark/70 font-light mb-4">Send us your requirements directly.</p>
            </div>
            <div>
              <a href="mailto:debnathhardware22@yahoo.com" className="text-xs font-extrabold text-primary hover:text-accent block truncate transition-colors mb-2">
                debnathhardware22@yahoo.com
              </a>
              <a 
                href="mailto:debnathhardware22@yahoo.com?subject=Product%20Enquiry"
                className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
              >
                <span>Compose Mail</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* 2. FULL WIDTH LOCATION MAP & CONNECT ROW */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col gap-6"
        >
          {/* Map & Directions Container */}
          <div className="bg-white border border-neutral-cool rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            
            {/* Header of Map area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-neutral-cool/60 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary">Store Showroom Navigation</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-primary uppercase tracking-wide mt-1">Our Location in Durgapur</h3>
              </div>
              
              {/* Connect Instantly buttons row */}
              <div className="flex flex-wrap items-center gap-3.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-dark/50 hidden lg:inline">
                  Connect Instantly:
                </span>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs tracking-wider uppercase px-4 py-3 rounded-xl active:scale-95 transition-all duration-200 shadow-md shadow-green-500/10"
                >
                  <WhatsAppIcon />
                  <span>WhatsApp Chat</span>
                </a>
                <a 
                  href="mailto:debnathhardware22@yahoo.com?subject=Website%20Direct%20Inquiry"
                  className="flex items-center gap-2 bg-neutral-cool hover:bg-neutral-cool/80 text-primary font-bold text-xs tracking-wider uppercase px-4 py-3 rounded-xl active:scale-95 transition-all duration-200"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  <span>Direct Email</span>
                </a>
                <a 
                  href="https://maps.google.com/?q=Debnath+Sanitary+&+Hardware,+Durgapur,+West+Bengal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold text-xs tracking-wider uppercase px-4 py-3 rounded-xl active:scale-95 transition-all duration-200 shadow-md shadow-primary/10"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Google Maps embed iframe */}
            <div className="relative flex-grow rounded-2xl overflow-hidden border border-neutral-cool min-h-[350px] md:min-h-[400px]">
              <iframe 
                title="Debnath Store Map"
                src="https://maps.google.com/maps?q=Debnath%20Sanitary%20%26%20Hardware%2C%20Durgapur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0 select-none pointer-events-auto" 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Footer advice block */}
            <div className="mt-5 bg-neutral-cool/60 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs text-neutral-dark/80 font-medium text-center sm:text-left">
                <strong className="text-primary font-extrabold uppercase tracking-wide text-[10px] block sm:inline mr-1">Visitor Tip:</strong> We are located centrally in Durgapur, West Bengal. Convenient parking is available for loading pipes, geysers, or bulk sanitaries.
              </div>
              <a 
                href="https://maps.google.com/?q=Debnath+Sanitary+&+Hardware,+Durgapur,+West+Bengal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-accent hover:text-accent-hover flex items-center gap-1 transition-colors flex-shrink-0"
              >
                <span>Navigate in maps</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
