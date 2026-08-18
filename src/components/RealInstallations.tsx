"use client";

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { REAL_INSTALLATIONS, INSTAGRAM_URL } from '@/config/site-data';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function RealInstallations() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2 flex items-center justify-center gap-1.5">
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>@cerradurasinteligentesfcp</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400">Trabajos Realizados</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Explora la variedad de instalaciones reales en residencias, edificios y oficinas de todo el país.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px] max-w-6xl mx-auto">
          {REAL_INSTALLATIONS.map((work) => {
            const hasError = failedImages[work.id];

            return (
              <div 
                key={work.id}
                className={`group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-end ${work.gridSpan}`}
              >
                {!hasError ? (
                  <Image 
                    src={work.image} 
                    alt={work.alt || work.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => handleImageError(work.id)}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-75 group-hover:opacity-90" 
                  />
                ) : (
                  /* Fallback visual gradient when image fails to load */
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-cyan-950/40 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-cyan-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400 mb-1">{work.category}</span>
                    <span className="text-sm font-medium text-zinc-200">{work.title}</span>
                  </div>
                )}

                {/* Overlay with info */}
                <div className="bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent p-5 sm:p-6 flex flex-col justify-end absolute inset-0 z-10">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center text-[10px] font-mono font-medium px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-700/80 text-cyan-300 backdrop-blur-md shadow-sm">
                      {work.badge}
                    </span>
                    <span className="inline-flex items-center text-[10px] font-mono font-medium px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 backdrop-blur-md shadow-sm">
                      {work.category}
                    </span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
                    {work.title}
                  </h3>
                  
                  <div className="flex items-center text-xs text-zinc-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-zinc-500 shrink-0" />
                    <span>Instalación Oficial KEMA · Argentina</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA to Instagram */}
        <div className="mt-10 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-medium bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-pink-500/40 hover:bg-zinc-900 transition-all duration-200 shadow-sm backdrop-blur-md group"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
            <span>Ver más de 40 instalaciones reales en nuestro Instagram @cerradurasinteligentesfcp</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-pink-400 transition-colors" />
          </a>
        </div>

      </div>
    </section>
  );
}
