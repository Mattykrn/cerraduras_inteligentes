"use client";

import { useState, useEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, Wrench, Battery, Smartphone, Key, Fingerprint, 
  ChevronDown, CheckCircle, ArrowRight, Star,
  Menu, X, MessageCircle, MapPin
} from 'lucide-react';
import type { DoorType, AccessMethod, QuoteWizardState } from '@/types';
import { 
  WHATSAPP_PHONE, 
  WHATSAPP_DISPLAY, 
  INSTAGRAM_URL, 
  DEFAULT_WA_MESSAGE, 
  WHOLESALE_WA_MESSAGE,
  CATALOG_MODELS, 
  FAQS_DATA, 
  TESTIMONIALS_DATA, 
  DOOR_OPTIONS, 
  ACCESS_OPTIONS_META 
} from '@/config/site-data';

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
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function LandingPage() {
  const mounted = useHasMounted();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500 font-sans">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 animate-pulse text-cyan-500" />
          <span className="text-sm font-medium">Cargando KEMA Locks...</span>
        </div>
      </div>
    );
  }

  const scrollTo = (e?: React.MouseEvent, id?: string) => {
    e?.preventDefault();
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-zinc-950 text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* Subtle Ambient Mask */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-950/15 blur-[140px] rounded-full"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a08_1px,transparent_1px),linear-gradient(to_bottom,#27272a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <Navbar isScrolled={isScrolled} scrollTo={scrollTo} />
      
      <main className="flex-grow relative z-10 pt-28">
        <HeroBento scrollTo={scrollTo} />
        <LeadWizard />
        <Catalog />
        <ValueProposition />
        <Gallery />
        <WholesaleBanner />
        <FAQ />
      </main>

      <Footer scrollTo={scrollTo} />
      <FloatingWhatsApp />
    </div>
  );
}

// ==========================================
// NAVBAR
// ==========================================
interface NavbarProps {
  isScrolled: boolean;
  scrollTo: (e?: React.MouseEvent, id?: string) => void;
}

function Navbar({ isScrolled, scrollTo }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleNavWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(DEFAULT_WA_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className={`fixed top-4 inset-x-0 mx-auto max-w-5xl z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${isScrolled ? 'w-[95%]' : 'w-full'}`}>
      <div className={`flex justify-between items-center h-14 px-5 rounded-full border transition-all duration-200 ${
        isScrolled 
        ? 'bg-zinc-900/80 backdrop-blur-xl border-zinc-800/80 shadow-lg shadow-black/40' 
        : 'bg-zinc-900/40 backdrop-blur-md border-zinc-800/40'
      }`}>
        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={(e) => scrollTo(e, 'cotizador')}>
          <ShieldCheck className="h-5 w-5 text-cyan-400 mr-2" />
          <span className="font-semibold text-base tracking-tight text-zinc-100">KEMA <span className="text-zinc-500 font-normal">Locks</span></span>
        </div>
        
        <nav className="hidden md:flex space-x-6 items-center">
          <button type="button" onClick={(e) => scrollTo(e, 'modelos')} className="text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">Modelos</button>
          <button type="button" onClick={(e) => scrollTo(e, 'como-funciona')} className="text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">Beneficios</button>
          <button type="button" onClick={(e) => scrollTo(e, 'faq')} className="text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">FAQ</button>
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram KEMA Locks"
            className="text-zinc-400 hover:text-pink-400 transition-colors p-1"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <button 
            type="button" 
            onClick={handleNavWhatsApp} 
            className="bg-zinc-100 hover:bg-white text-zinc-950 font-medium px-4 py-1.5 rounded-full transition-all duration-150 active:scale-[0.98] text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Contacto Directo</span>
          </button>
        </nav>
        
        <div className="md:hidden flex items-center">
          <button 
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-zinc-400 hover:text-zinc-100 p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`md:hidden absolute top-16 left-4 right-4 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/80 overflow-hidden transition-all duration-200 origin-top ${
        isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
      }`}>
        <div className="px-4 py-5 space-y-4 flex flex-col text-left">
          <button type="button" onClick={(e) => { setIsMenuOpen(false); scrollTo(e, 'modelos'); }} className="text-left text-zinc-300 hover:text-white text-sm font-medium">Modelos</button>
          <button type="button" onClick={(e) => { setIsMenuOpen(false); scrollTo(e, 'como-funciona'); }} className="text-left text-zinc-300 hover:text-white text-sm font-medium">Beneficios</button>
          <button type="button" onClick={(e) => { setIsMenuOpen(false); scrollTo(e, 'faq'); }} className="text-left text-zinc-300 hover:text-white text-sm font-medium">FAQ</button>
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => setIsMenuOpen(false)}
            className="text-left text-zinc-300 hover:text-pink-400 text-sm font-medium flex items-center gap-2"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400" /> Instagram
          </a>
          <button type="button" onClick={() => { setIsMenuOpen(false); handleNavWhatsApp(); }} className="bg-zinc-100 text-zinc-950 font-medium py-2.5 rounded-xl mt-2 w-full text-center flex items-center justify-center gap-2 text-xs shadow-sm">
            <MessageCircle className="w-4 h-4" />
            Contacto Directo WhatsApp
          </button>
        </div>
      </div>
    </header>
  );
}

// ==========================================
// HERO & BENTO GRID
// ==========================================
interface HeroBentoProps {
  scrollTo: (e?: React.MouseEvent, id?: string) => void;
}

function HeroBento({ scrollTo }: HeroBentoProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-auto relative z-10">
        
        {/* Main Title Block */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-8 lg:p-11 flex flex-col justify-center relative overflow-hidden group hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-200">
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
              🤝 Distribuidor Oficial
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
              📦 Stock disponible inmediato
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
              🚚 Envío + Colocación GRATIS
            </span>
          </div>
          
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Convertí tu puerta en inteligente
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-zinc-100">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400">Seguridad inteligente,</span> <br />
            <span className="text-zinc-400 font-normal">sin complicaciones.</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
            Distribuidor oficial KEMA en Argentina. Instalación impecable, asesoramiento personalizado y garantía directa en cerraduras digitales para puertas de madera, aluminio, chapa y blindex.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              type="button" 
              onClick={(e) => scrollTo(e, 'cotizador')} 
              className="bg-zinc-100 hover:bg-white text-zinc-950 font-medium px-6 py-3 rounded-xl transition-all duration-150 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Calcular Presupuesto <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              type="button" 
              onClick={(e) => scrollTo(e, 'modelos')} 
              className="bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl px-6 py-3 text-sm transition-colors cursor-pointer font-medium"
            >
              Ver Catálogo KEMA
            </button>
          </div>
        </div>

        {/* Metric Block */}
        <div className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-8 flex flex-col justify-center items-center text-center hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-200 group">
          <div className="text-4xl font-bold tracking-tight text-zinc-100 mb-1 group-hover:scale-105 transition-transform duration-300">+500</div>
          <div className="text-zinc-400 text-xs font-medium">Instalaciones Exitosas</div>
        </div>

        {/* Feature Block 1 */}
        <div className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-6 flex items-start space-x-4 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-200">
          <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 text-cyan-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-zinc-200 font-medium text-sm mb-0.5">Sin Daños</h3>
            <p className="text-xs text-zinc-400">Perforación milimétrica y prolija.</p>
          </div>
        </div>

        {/* Feature Block 2 */}
        <div className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-6 flex items-start space-x-4 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-200">
          <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-zinc-200 font-medium text-sm mb-0.5">Garantía Real</h3>
            <p className="text-xs text-zinc-400">Soporte técnico y repuestos.</p>
          </div>
        </div>

        {/* Image/Visual Block */}
        <div className="col-span-1 md:col-span-2 border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-2 relative overflow-hidden min-h-[190px] group hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-200">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 rounded-3xl"></div>
          <Image src="/hero.png" alt="Instalación Premium KEMA" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-2xl opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500" />
          <div className="absolute bottom-5 left-5 z-20">
            <div className="flex items-center space-x-2 text-xs text-zinc-300 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>App Lista para Usar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// LEAD WIZARD
// ==========================================
function LeadWizard() {
  const [wizardState, setWizardState] = useState<QuoteWizardState>({
    step: 1,
    doorType: null,
    accessMethod: null,
    city: '',
    selectedModel: null,
  });

  const selectDoorType = (value: DoorType) => {
    setWizardState((prev) => ({
      ...prev,
      doorType: value,
      step: prev.step < 3 ? prev.step + 1 : prev.step,
    }));
  };

  const selectAccessMethod = (value: AccessMethod) => {
    setWizardState((prev) => ({
      ...prev,
      accessMethod: value,
      step: prev.step < 3 ? prev.step + 1 : prev.step,
    }));
  };

  const setCity = (city: string) => {
    setWizardState((prev) => ({ ...prev, city }));
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep < wizardState.step) {
      setWizardState((prev) => ({ ...prev, step: targetStep }));
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDoor = wizardState.doorType;
    const selectedMethod = wizardState.accessMethod;
    const location = wizardState.city;
    const selectedModel = wizardState.selectedModel;

    const doorLabel = {
      madera: 'Madera',
      metal: 'Chapa / Metal',
      aluminio: 'Aluminio (Perfil)',
      blindex: 'Vidrio / Blindex',
    }[selectedDoor || 'madera'];

    const methodLabel = {
      huella: 'Huella Digital',
      pin: 'Código PIN',
      app: 'App WiFi / Bluetooth',
      tarjeta: 'Tarjeta RFID',
    }[selectedMethod || 'huella'];

    const modelInfo = selectedModel ? `• Modelo de interés: ${selectedModel}\n` : '';

    const message = `¡Hola KEMA Locks! 👋 Vi la web con Envío + Colocación GRATIS y quiero cotizar:\n\n` +
      `${modelInfo}` +
      `• Material de la puerta: ${doorLabel}\n` +
      `• Método de apertura: ${methodLabel}\n` +
      `• Ubicación / Ciudad: ${location.trim() || 'Argentina'}\n\n` +
      `¿Podrían confirmarme disponibilidad para coordinar?`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderAccessIcon = (iconName: string, active: boolean) => {
    const cls = active ? "w-5 h-5 text-cyan-400" : "w-5 h-5 text-zinc-400 group-hover:text-zinc-200";
    switch (iconName) {
      case 'fingerprint': return <Fingerprint className={cls} />;
      case 'key': return <Key className={cls} />;
      case 'smartphone': return <Smartphone className={cls} />;
      case 'shield': return <ShieldCheck className={cls} />;
      default: return <Key className={cls} />;
    }
  };

  return (
    <section id="cotizador" className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-9">
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Filtro Rápido</div>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400">Descubre tu modelo ideal en 3 pasos</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto">Selecciona las opciones para armar tu presupuesto personalizado con Envío + Colocación GRATIS en todo el país.</p>
        </div>

        <div className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-6 md:p-10 relative overflow-hidden">
          {/* Progress Bar */}
          <div className="flex justify-between items-center mb-10 relative px-2">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-zinc-800 -z-10 -translate-y-1/2 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-4 h-0.5 bg-cyan-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-300 ease-out" 
              style={{ width: wizardState.step === 1 ? '0%' : wizardState.step === 2 ? '48%' : 'calc(100% - 2rem)' }}
            ></div>
            
            {[1, 2, 3].map(i => (
              <button 
                key={i} 
                type="button"
                onClick={() => handleStepClick(i)}
                disabled={i > wizardState.step}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs border transition-all duration-200 ${
                  wizardState.step === i ? 'bg-cyan-500 border-cyan-400 text-zinc-950 shadow-sm' : 
                  wizardState.step > i ? 'bg-zinc-900 border-cyan-500/60 text-cyan-400 cursor-pointer hover:bg-zinc-800' : 
                  'bg-zinc-950 border-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                {wizardState.step > i ? <CheckCircle className="w-4 h-4" /> : i}
              </button>
            ))}
          </div>

          <div className="min-h-[240px] flex flex-col justify-center relative">
            {wizardState.step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-200">
                <h3 className="text-lg font-medium text-zinc-100 mb-6 text-center">
                  ¿De qué material es tu puerta principal?
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {DOOR_OPTIONS.map(option => {
                    const isSelected = wizardState.doorType === option.value;
                    return (
                      <button 
                        key={option.value} 
                        type="button"
                        onClick={() => selectDoorType(option.value)} 
                        className={`p-4 md:p-5 rounded-2xl border transition-all duration-150 text-sm font-medium flex items-center justify-between group cursor-pointer ${
                          isSelected 
                          ? 'bg-cyan-950/20 border-cyan-500/60 text-cyan-200 shadow-[inset_0_0_12px_rgba(6,182,212,0.1)]' 
                          : 'bg-zinc-900/20 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                        }`}
                      >
                        {option.label}
                        <div className={`w-3.5 h-3.5 rounded-full border transition-colors ${isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-zinc-700 group-hover:border-zinc-500'}`}></div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {wizardState.step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-200">
                <h3 className="text-lg font-medium text-zinc-100 mb-6 text-center">¿Cómo te gustaría abrir la puerta principalmente?</h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {ACCESS_OPTIONS_META.map(option => {
                    const isSelected = wizardState.accessMethod === option.value;
                    return (
                      <button 
                        key={option.value} 
                        type="button"
                        onClick={() => selectAccessMethod(option.value)} 
                        className={`p-4 md:p-5 rounded-2xl border transition-all duration-150 text-sm font-medium flex flex-col sm:flex-row items-center sm:justify-start gap-3 group cursor-pointer ${
                          isSelected 
                          ? 'bg-cyan-950/20 border-cyan-500/60 text-cyan-200 shadow-[inset_0_0_12px_rgba(6,182,212,0.1)]' 
                          : 'bg-zinc-900/20 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                        }`}
                      >
                        <div className="p-1.5 rounded-lg">
                          {renderAccessIcon(option.iconName, isSelected)}
                        </div>
                        <span className="text-center sm:text-left">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {wizardState.step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-200">
                <h3 className="text-lg font-medium text-zinc-100 mb-6 text-center">¿En qué ciudad / provincia te encuentras?</h3>
                <form onSubmit={handleQuoteSubmit} className="max-w-md mx-auto w-full">
                  <div className="relative mb-5">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input 
                      type="text" 
                      placeholder="Ej: Córdoba, Rosario, Buenos Aires..." 
                      value={wizardState.city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 rounded-xl pl-11 pr-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none transition-all text-sm w-full"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={wizardState.city.trim().length < 2}
                    className={`w-full flex items-center justify-center px-5 py-3 rounded-xl font-medium transition-all duration-150 active:scale-[0.98] shadow-sm text-sm gap-2 ${
                      wizardState.city.trim().length >= 2 
                      ? 'bg-zinc-100 hover:bg-white text-zinc-950 cursor-pointer' 
                      : 'bg-zinc-900/50 text-zinc-600 border border-zinc-800/80 cursor-not-allowed'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Cotizar ahora por WhatsApp
                  </button>
                  <p className="text-center text-xs text-zinc-500 mt-4">
                    Al cotizar serás redirigido a WhatsApp con un mensaje pre-armado. No te pedimos datos sensibles.
                  </p>
                </form>
              </div>
            )}
          </div>
          
          <div className="mt-5 flex justify-center h-7">
            {wizardState.step > 1 && (
              <button 
                type="button"
                onClick={() => setWizardState((prev) => ({ ...prev, step: prev.step - 1 }))} 
                className="text-xs font-medium text-zinc-500 hover:text-zinc-200 flex items-center transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-900 cursor-pointer"
              >
                ← Volver al paso anterior
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CATALOG BENTO
// ==========================================
function Catalog() {
  const handleStockConsult = (modelName: string) => {
    const message = `¡Hola KEMA Locks! 👋 Vi la web con Envío + Colocación GRATIS y me interesa consultar disponibilidad y precio del modelo ${modelName}`;
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="modelos" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Garantía Directa</div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400">Catálogo de Equipos KEMA</span>
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-2xl">Modelos de alta confiabilidad testeados en campo. Incluyen garantía oficial KEMA y soporte técnico.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATALOG_MODELS.map((product) => (
            <div key={product.id} className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-200 group flex flex-col">
              <div className="relative h-60 w-full bg-zinc-900/50 overflow-hidden p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover object-center opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500" />
                {product.badge && (
                  <div className={`absolute top-4 left-4 z-20 ${product.badgeColor} text-xs font-medium px-2.5 py-1 rounded-md shadow-sm`}>
                    {product.badge}
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-grow flex flex-col relative z-20 bg-zinc-900/40">
                <h3 className="text-xl font-semibold text-zinc-100 mb-3 group-hover:text-cyan-400 transition-colors">{product.name}</h3>
                <ul className="space-y-2.5 mb-6 flex-grow text-xs text-zinc-400 font-medium">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2.5"></div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-zinc-800/80">
                  <p className="text-[11px] font-mono text-emerald-400 mb-3 uppercase tracking-wider font-semibold">
                    🚚 Envío + Colocación GRATIS
                  </p>
                  <button 
                    type="button"
                    onClick={() => handleStockConsult(product.name)}
                    className="w-full flex justify-between items-center bg-zinc-900 hover:bg-zinc-100 hover:text-zinc-950 text-zinc-200 border border-zinc-800 hover:border-zinc-100 px-4 py-2.5 rounded-xl font-medium transition-all duration-150 text-xs cursor-pointer"
                  >
                    <span>Consultar Stock</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// VALUE PROPOSITION
// ==========================================
function ValueProposition() {
  const valueProps = [
    {
      icon: <Wrench className="h-6 w-6 text-cyan-400" />,
      title: 'Cero Daños',
      desc: 'Herramientas específicas para no astillar madera ni rallar aluminio. Ajuste milimétrico garantizado.'
    },
    {
      icon: <Smartphone className="h-6 w-6 text-indigo-400" />,
      title: 'App Configurada',
      desc: 'Registro de administrador, alta de huellas y prueba de tarjetas en el acto. Lista para usar.'
    },
    {
      icon: <Battery className="h-6 w-6 text-emerald-400" />,
      title: 'Capacitación Total',
      desc: 'Te explico cómo cargarla, usar la llave de emergencia y mantenerla óptima por años.'
    }
  ];

  return (
    <section id="como-funciona" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400">Por qué elegir un instalador oficial KEMA</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {valueProps.map((item, idx) => (
            <div key={idx} className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-7 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors duration-200 group">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 inline-flex mb-5 group-hover:scale-105 transition-transform duration-200">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium text-zinc-100 mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// GALLERY & TESTIMONIALS
// ==========================================
function Gallery() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="order-2 lg:order-1 space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400">Tranquilidad para dueños y huéspedes en todo el país</span>
            </h2>
            {TESTIMONIALS_DATA.map((review, idx) => (
              <div key={idx} className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-6 relative hover:border-zinc-700 transition-colors duration-200">
                <div className="absolute top-6 right-6 flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <p className="text-zinc-300 text-sm italic mb-5 w-11/12">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center">
                  <div className="h-9 w-9 bg-zinc-900 rounded-full flex items-center justify-center text-cyan-400 font-semibold text-xs border border-zinc-800">{review.name.charAt(0)}</div>
                  <div className="ml-3">
                    <p className="text-xs font-semibold text-zinc-200">{review.name}</p>
                    <p className="text-[11px] text-zinc-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-2 relative h-60 overflow-hidden hover:border-zinc-700 transition-colors duration-200">
               <Image src="/hero.png" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-2xl opacity-70" alt="Instalación KEMA 1" />
            </div>
            <div className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-2 relative h-60 mt-10 overflow-hidden hover:border-zinc-700 transition-colors duration-200">
               <Image src="/app.png" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-2xl opacity-70" alt="Instalación KEMA 2" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// WHOLESALE BANNER
// ==========================================
function WholesaleBanner() {
  const handleWholesaleConsult = () => {
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(WHOLESALE_WA_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-3xl p-7 lg:p-9 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden hover:border-zinc-700 transition-colors duration-200">
          
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-amber-400 mb-2">
              🏗️ Venta Mayorista & Obras
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">💰 Precio Mayorista desde 10 unidades</h3>
            <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
              Ideal para constructoras, arquitectos, cerrajerías y desarrollos inmobiliarios. Asesoramiento directo y lista de precios por volumen.
            </p>
          </div>

          <button
            type="button"
            onClick={handleWholesaleConsult}
            className="flex-shrink-0 bg-zinc-100 hover:bg-white text-zinc-950 font-medium px-5 py-3 rounded-xl transition-all duration-150 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 cursor-pointer text-xs"
          >
            <span>Consultar lista mayorista</span>
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// FAQ ACCORDION
// ==========================================
function FAQ() {
  return (
    <section id="faq" className="py-16 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400">Preguntas Frecuentes</span>
          </h2>
        </div>
        
        <div className="space-y-3">
          {FAQS_DATA.map((faq, idx) => (
            <FaqItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`border transition-colors duration-200 rounded-2xl overflow-hidden ${
      isOpen 
      ? 'border-cyan-500/40 bg-zinc-900/60' 
      : 'border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-zinc-700 hover:bg-zinc-900/50'
    }`}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none rounded-2xl cursor-pointer group"
      >
        <span className={`font-medium text-base transition-colors duration-150 ${isOpen ? 'text-cyan-300' : 'text-zinc-200 group-hover:text-zinc-100'}`}>{question}</span>
        <div className={`p-1.5 rounded-full transition-colors duration-150 ${isOpen ? 'bg-cyan-950 text-cyan-400' : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-300'}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="p-5 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/50 mx-5 mt-1">{answer}</p>
      </div>
    </div>
  );
}

// ==========================================
// FLOATING WHATSAPP CTA
// ==========================================
function FloatingWhatsApp() {
  const openWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(DEFAULT_WA_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button 
      type="button"
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 group flex items-center justify-center cursor-pointer"
      aria-label="Contactar por WhatsApp KEMA Locks"
    >
      <div className="relative bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-lg scale-100 group-hover:scale-105 transition-transform duration-150 border border-emerald-500">
        <MessageCircle className="w-6 h-6" />
      </div>
      {/* Badge Notification */}
      <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-emerald-600"></span>
      </span>
    </button>
  );
}

// ==========================================
// FOOTER
// ==========================================
interface FooterProps {
  scrollTo: (e?: React.MouseEvent, id?: string) => void;
}

function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 pt-14 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="lg:col-span-2">
            <span className="font-semibold text-xl tracking-tight text-zinc-100 mb-2 block">
              KEMA <span className="text-cyan-400 font-normal">Cerraduras Inteligentes</span>
            </span>
            <p className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              Distribuidor Oficial • Cobertura e Instalaciones en Toda Argentina
            </p>
            <p className="text-zinc-400 text-xs max-w-sm leading-relaxed">
              Profesionalismo, estética y máxima seguridad. Llevamos la tecnología de accesos inteligentes KEMA a tu hogar u obra con instalación profesional y soporte técnico en todo el país.
            </p>
          </div>
          <div>
            <h4 className="text-zinc-200 font-semibold mb-3 uppercase text-xs font-mono tracking-wider">Enlaces</h4>
            <ul className="text-zinc-400 text-xs space-y-2.5">
              <li><button type="button" onClick={(e) => scrollTo(e, 'modelos')} className="hover:text-zinc-200 transition-colors">Catálogo KEMA</button></li>
              <li><button type="button" onClick={(e) => scrollTo(e, 'cotizador')} className="hover:text-zinc-200 transition-colors">Cotizador Rápido</button></li>
              <li><button type="button" onClick={(e) => scrollTo(e, 'faq')} className="hover:text-zinc-200 transition-colors">Preguntas Frecuentes</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-zinc-200 font-semibold mb-3 uppercase text-xs font-mono tracking-wider">Contacto Oficial</h4>
            <a 
              href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(DEFAULT_WA_MESSAGE)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-xs text-zinc-400 hover:text-emerald-400 transition-colors mb-2.5"
            >
              <MessageCircle className="mr-2 w-3.5 h-3.5 text-emerald-400" /> {WHATSAPP_DISPLAY}
            </a>
            <br/>
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-pink-400 text-xs inline-flex items-center transition-colors mb-2.5"
            >
              <InstagramIcon className="mr-2 w-3.5 h-3.5 text-pink-500" /> @cerradurasinteligentesfcp
            </a>
            <br/>
            <span className="inline-flex items-center text-xs text-zinc-500">
              <MapPin className="mr-1.5 w-3.5 h-3.5 text-zinc-400" /> Envíos e Instalaciones en Todo el País
            </span>
          </div>
        </div>
        <div className="pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} KEMA Cerraduras Inteligentes Argentina. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0 font-mono text-[11px]">Distribuidor Oficial KEMA</p>
        </div>
      </div>
    </footer>
  );
}
