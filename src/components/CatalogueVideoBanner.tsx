import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface VideoBannerProps {
  title: string;
  subtitle: string;
  videoSrc: string;
  category: string;
}

export const CatalogueVideoBanner: React.FC<VideoBannerProps> = ({
  title,
  subtitle,
  videoSrc,
  category,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Trigger play on mount to ensure autoplay works (even with browser restrictions)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPaused(false);
      }).catch(err => {
        console.log("Video autoplay blocked by browser or failed:", err);
        // Autoplay failed, but we still keep state synced
        setIsPaused(true);
      });
    }
  }, [videoSrc]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsPaused(false);
        }).catch(err => console.log(err));
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full bg-gradient-to-r from-cyan-50 to-blue-50 rounded-none md:rounded-3xl overflow-hidden my-4 md:my-6 border-y md:border border-cyan-200/50 shadow-md group"
    >
      <div className="relative aspect-video w-full bg-black">
        {/* Autoplay Video Frame */}
        <video
          ref={videoRef}
          src={`${videoSrc}?v=1.0.0`}
          className="w-full h-full object-cover select-none pointer-events-none"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="auto"
        />

        {/* Text Overlay (Always visible on top of video, clean, dark gradient) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent sm:from-black/80 sm:via-black/25 flex flex-col justify-end p-6 sm:p-8 md:p-12 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest sm:mb-2 block">
              {category}
            </span>
            <h2 className="hidden sm:block font-display font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white mb-2 uppercase tracking-tight leading-tight">
              {title}
            </h2>
            <p className="hidden sm:block font-sans text-[10px] sm:text-xs md:text-sm text-white/90 max-w-2xl font-light leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Interactive Floating Video Control Widgets in the corner (Mute & Play) */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          {/* Play/Pause control */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer shadow-md"
            aria-label={isPaused ? "Play Video" : "Pause Video"}
          >
            {isPaused ? <Play className="w-4.5 h-4.5 fill-white ml-0.5" /> : <Pause className="w-4.5 h-4.5" />}
          </button>

          {/* Volume control */}
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer shadow-md"
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
          </button>
        </div>

        {/* Live indicator tag at top-right */}
        <div className="absolute top-4 right-4 z-20 bg-red-600/90 text-white text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md border border-red-500/30 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>PROMO VIDEO</span>
        </div>
      </div>
    </motion.section>
  );
};
