"use client";

import { useState, useEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, Wrench, Battery, Smartphone, Key, Fingerprint, 
  ChevronDown, ChevronUp, CheckCircle, ArrowRight, Star,
  Menu, X, MessageCircle, MapPin
} from 'lucide-react';
import type { DoorType, AccessMethod, ProductModel, FAQItem, QuoteWizardState } from '@/types';

export const WHATSAPP_PHONE = '5493425546013';
export const WHATSAPP_DISPLAY = '+54 9 342 554-6013';
export const INSTAGRAM_URL = 'https://www.instagram.com/cerradurasinteligentesfcp/';
export const DEFAULT_WA_MESSAGE = '¡Hola KEMA Locks! 👋 Vi la web con Envío + Colocación GRATIS y quisiera consultar por modelos e instalación a domicilio.';

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 animate-pulse text-cyan-500" />
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
    <div className="min-h-screen flex flex-col font-sans bg-zinc-950 text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-x-hidden bg-gradient-to-tr from-cyan-950/30 via-zinc-950 to-indigo-950/20">
      
      {/* Background Ambient Lights & Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/25 via-transparent to-transparent blur-[100px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/15 via-transparent to-transparent blur-[130px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
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
      <div className={`flex justify-between items-center h-16 px-6 rounded-full border transition-all duration-300 ${
        isScrolled 
        ? 'bg-zinc-900/80 backdrop-blur-xl border-zinc-800/80 shadow-lg shadow-black/50' 
        : 'bg-zinc-900/40 backdrop-blur-md border-zinc-800/40'
      }`}>
        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={(e) => scrollTo(e, 'cotizador')}>
          <ShieldCheck className="h-6 w-6 text-cyan-500 mr-2" />
          <span className="font-bold text-lg tracking-tight text-white">KEMA <span className="text-zinc-400 font-medium">Locks</span></span>
        </div>
        
        <nav className="hidden md:flex space-x-6 items-center">
          <button type="button" onClick={(e) => scrollTo(e, 'modelos')} className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors">Modelos</button>
          <button type="button" onClick={(e) => scrollTo(e, 'como-funciona')} className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors">Beneficios</button>
          <button type="button" onClick={(e) => scrollTo(e, 'faq')} className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors">FAQ</button>
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram KEMA Locks"
            className="text-zinc-400 hover:text-pink-400 transition-colors p-1"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <button type="button" onClick={handleNavWhatsApp} className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold px-5 py-2 rounded-full transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 scale-100 hover:scale-105 active:scale-95 text-sm flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" />
            <span>Contacto Directo</span>
          </button>
        </nav>
        
        <div className="md:hidden flex items-center">
          <button 
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-zinc-300 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`md:hidden absolute top-20 left-4 right-4 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/80 overflow-hidden transition-all duration-300 origin-top ${
        isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
      }`}>
        <div className="px-4 py-5 space-y-4 flex flex-col text-left">
          <button type="button" onClick={(e) => { setIsMenuOpen(false); scrollTo(e, 'modelos'); }} className="text-left text-zinc-300 hover:text-white font-medium">Modelos</button>
          <button type="button" onClick={(e) => { setIsMenuOpen(false); scrollTo(e, 'como-funciona'); }} className="text-left text-zinc-300 hover:text-white font-medium">Beneficios</button>
          <button type="button" onClick={(e) => { setIsMenuOpen(false); scrollTo(e, 'faq'); }} className="text-left text-zinc-300 hover:text-white font-medium">FAQ</button>
          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => setIsMenuOpen(false)}
            className="text-left text-zinc-300 hover:text-pink-400 font-medium flex items-center gap-2"
          >
            <InstagramIcon className="w-5 h-5 text-pink-400" /> Instagram
          </a>
          <button type="button" onClick={() => { setIsMenuOpen(false); handleNavWhatsApp(); }} className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold py-3 rounded-xl mt-2 w-full text-center flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative">
      {/* Ambient Blur */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-auto relative z-10">
        
        {/* Main Title Block */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 backdrop-blur-md bg-zinc-900/40 border border-zinc-800/60 rounded-3xl p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden group hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 backdrop-blur-sm">
              🤝 Distribuidor Oficial
            </div>
            <div className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold text-amber-400 bg-amber-950/50 border border-amber-800/50 backdrop-blur-sm">
              📦 Stock disponible inmediato
            </div>
            <div className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-extrabold text-emerald-300 bg-emerald-950/70 border border-emerald-500/60 backdrop-blur-sm shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-pulse">
              🚚 Envío + Colocación GRATIS
            </div>
          </div>
          
          <div className="inline-flex items-center text-sm font-semibold text-cyan-400 mb-2">
            🔐 Convertí tu puerta en inteligente
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Seguridad inteligente, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-300">sin complicaciones.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
            Distribuidor oficial KEMA en Argentina. Instalación impecable, asesoramiento personalizado y garantía directa en cerraduras digitales para puertas de madera, aluminio, chapa y blindex.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={(e) => scrollTo(e, 'cotizador')} className="inline-flex justify-center items-center px-8 py-3.5 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors">
              Calcular Presupuesto <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button type="button" onClick={(e) => scrollTo(e, 'modelos')} className="inline-flex justify-center items-center px-8 py-3.5 rounded-xl bg-zinc-800/50 text-white font-medium border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
              Ver Catálogo KEMA
            </button>
          </div>
        </div>

        {/* Metric Block */}
        <div className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-8 flex flex-col justify-center items-center text-center hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500 group">
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 mb-2 group-hover:scale-110 transition-transform duration-500">+500</div>
          <div className="text-zinc-400 font-medium">Instalaciones Exitosas</div>
        </div>

        {/* Feature Block 1 */}
        <div className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 flex items-start space-x-4 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500">
          <div className="bg-zinc-800/80 p-3 rounded-2xl border border-zinc-700">
            <Wrench className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-1">Sin Daños</h3>
            <p className="text-sm text-zinc-400">Perforación milimétrica y prolija.</p>
          </div>
        </div>

        {/* Feature Block 2 */}
        <div className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 flex items-start space-x-4 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500">
          <div className="bg-zinc-800/80 p-3 rounded-2xl border border-zinc-700">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-bold mb-1">Garantía Real</h3>
            <p className="text-sm text-zinc-400">Soporte técnico y repuestos.</p>
          </div>
        </div>

        {/* Image/Visual Block */}
        <div className="col-span-1 md:col-span-2 backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-2 relative overflow-hidden min-h-[200px] group hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 rounded-3xl"></div>
          <Image src="/hero.png" alt="Instalación Premium KEMA" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-2xl opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
          <div className="absolute bottom-6 left-6 z-20">
            <div className="flex items-center space-x-2 text-white font-medium bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
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
interface DoorOption {
  label: string;
  value: DoorType;
}

interface AccessOption {
  label: string;
  value: AccessMethod;
  icon: React.ReactNode;
}

function LeadWizard() {
  const [wizardState, setWizardState] = useState<QuoteWizardState>({
    step: 1,
    doorType: null,
    accessMethod: null,
    city: '',
    selectedModel: null,
  });

  const doorOptions: DoorOption[] = [
    { label: 'Madera', value: 'madera' },
    { label: 'Chapa / Metal', value: 'metal' },
    { label: 'Aluminio (Perfil)', value: 'aluminio' },
    { label: 'Vidrio / Blindex', value: 'blindex' },
  ];

  const accessOptions: AccessOption[] = [
    { label: 'Huella Digital', value: 'huella', icon: <Fingerprint className="w-5 h-5" /> },
    { label: 'Código PIN', value: 'pin', icon: <Key className="w-5 h-5" /> },
    { label: 'App WiFi / Bluetooth', value: 'app', icon: <Smartphone className="w-5 h-5" /> },
    { label: 'Tarjeta RFID', value: 'tarjeta', icon: <ShieldCheck className="w-5 h-5" /> },
  ];

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

  return (
    <section id="cotizador" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center rounded-full px-3.5 py-1 text-xs font-extrabold text-emerald-300 bg-emerald-950/70 border border-emerald-500/50 mb-4 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            🚚 Envío + Colocación GRATIS
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">Descubre tu modelo ideal en 3 pasos</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Selecciona las opciones para armar tu presupuesto personalizado de equipo KEMA + envío e instalación en todo el país.</p>
        </div>

        <div className="backdrop-blur-xl bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500">
          {/* Progress Bar */}
          <div className="flex justify-between items-center mb-10 relative px-2">
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-zinc-800 -z-10 -translate-y-1/2 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-4 h-1 bg-gradient-to-r from-cyan-600 to-cyan-400 -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: wizardState.step === 1 ? '0%' : wizardState.step === 2 ? '48%' : 'calc(100% - 2rem)' }}
            ></div>
            
            {[1, 2, 3].map(i => (
              <button 
                key={i} 
                type="button"
                onClick={() => handleStepClick(i)}
                disabled={i > wizardState.step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  wizardState.step === i ? 'bg-cyan-500 border-cyan-400 text-zinc-950 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 
                  wizardState.step > i ? 'bg-cyan-900/50 border-cyan-500 text-cyan-400 cursor-pointer hover:bg-cyan-800/50' : 
                  'bg-zinc-900 border-zinc-700 text-zinc-600 cursor-not-allowed'
                }`}
              >
                {wizardState.step > i ? <CheckCircle className="w-5 h-5" /> : i}
              </button>
            ))}
          </div>

          <div className="min-h-[260px] flex flex-col justify-center relative">
            {wizardState.step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h3 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center">
                  ¿De qué material es tu puerta principal?
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {doorOptions.map(option => (
                    <button 
                      key={option.value} 
                      type="button"
                      onClick={() => selectDoorType(option.value)} 
                      className={`p-4 md:p-5 rounded-2xl border transition-all duration-200 text-sm md:text-base font-medium flex items-center justify-between group ${
                        wizardState.doorType === option.value 
                        ? 'bg-cyan-950/40 border-cyan-500 text-white ring-1 ring-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                        : 'bg-zinc-800/40 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800 hover:border-cyan-500/50 hover:text-white'
                      }`}
                    >
                      {option.label}
                      <div className={`w-4 h-4 rounded-full border flex-shrink-0 transition-colors ${wizardState.doorType === option.value ? 'border-cyan-400 bg-cyan-500' : 'border-zinc-500 group-hover:border-cyan-500/50'}`}></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {wizardState.step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h3 className="text-xl font-bold text-white mb-6 text-center">¿Cómo te gustaría abrir la puerta principalmente?</h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {accessOptions.map(option => (
                    <button 
                      key={option.value} 
                      type="button"
                      onClick={() => selectAccessMethod(option.value)} 
                      className={`p-4 md:p-5 rounded-2xl border transition-all duration-200 text-sm md:text-base font-medium flex flex-col sm:flex-row items-center sm:justify-start gap-3 group ${
                        wizardState.accessMethod === option.value 
                        ? 'bg-cyan-950/40 border-cyan-500 text-white ring-1 ring-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                        : 'bg-zinc-800/40 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800 hover:border-cyan-500/50 hover:text-white'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${wizardState.accessMethod === option.value ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-700/50 text-zinc-400 group-hover:text-cyan-400'}`}>
                        {option.icon}
                      </div>
                      <span className="text-center sm:text-left">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {wizardState.step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h3 className="text-xl font-bold text-white mb-6 text-center">¿En qué ciudad / provincia te encuentras?</h3>
                <form onSubmit={handleQuoteSubmit} className="max-w-md mx-auto w-full">
                  <div className="relative mb-6">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input 
                      type="text" 
                      placeholder="Ej: Córdoba, Rosario, Buenos Aires..." 
                      value={wizardState.city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-zinc-600"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={wizardState.city.trim().length < 2}
                    className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                      wizardState.city.trim().length >= 2 
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-100 hover:scale-[1.02] active:scale-95 cursor-pointer' 
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                    }`}
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Cotizar ahora por WhatsApp
                  </button>
                  <p className="text-center text-xs text-zinc-500 mt-4">
                    Al cotizar serás redirigido a WhatsApp con un mensaje pre-armado. No te pedimos datos sensibles.
                  </p>
                </form>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-center h-8">
            {wizardState.step > 1 && (
              <button 
                type="button"
                onClick={() => setWizardState((prev) => ({ ...prev, step: prev.step - 1 }))} 
                className="text-sm font-medium text-zinc-500 hover:text-white flex items-center transition-colors px-4 py-2 rounded-lg hover:bg-zinc-800/50"
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
  const models: (ProductModel & { badgeColor: string })[] = [
    {
      id: 'kema-one',
      badge: 'Más Vendido',
      badgeColor: 'bg-cyan-500',
      name: 'KEMA-One Pro',
      image: '/app.png',
      features: ['Huella 3D ultra rápida', 'Batería: 8-12 meses', 'App WiFi & Bluetooth'],
      priceReference: 'Consultar',
      doorCompatibility: ['madera', 'metal', 'aluminio'],
    },
    {
      id: 'slim-glass-pro',
      badge: 'Especial Blindex',
      badgeColor: 'bg-indigo-500',
      name: 'KEMA Slim-Glass Pro',
      image: '/hero.png',
      features: ['Instalación sin perforar', 'Historial de accesos', 'Cierre automático'],
      priceReference: 'Consultar',
      doorCompatibility: ['blindex'],
    },
    {
      id: 'titanium-x',
      badge: 'Exterior Resistente',
      badgeColor: 'bg-emerald-500',
      name: 'KEMA Titanium X',
      image: '/app.png',
      features: ['IP65 contra lluvia', 'Chasis reforzado', 'Ideal casas y portones'],
      priceReference: 'Consultar',
      doorCompatibility: ['madera', 'metal'],
    }
  ];

  const handleStockConsult = (modelName: string) => {
    const message = `¡Hola KEMA Locks! 👋 Vi la web con Envío + Colocación GRATIS y me interesa consultar disponibilidad y precio del modelo ${modelName}`;
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="modelos" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Catálogo de Equipos KEMA</h2>
            <p className="mt-2 text-zinc-400 max-w-2xl">Modelos de alta confiabilidad testeados en campo. Incluyen garantía oficial KEMA y soporte técnico.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((product) => (
            <div key={product.id} className="backdrop-blur-md bg-zinc-900/40 border border-zinc-800/80 rounded-3xl overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500 group flex flex-col">
              <div className="relative h-64 w-full bg-zinc-800/50 overflow-hidden p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent z-10"></div>
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover object-center opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                {product.badge && (
                  <div className={`absolute top-4 left-4 z-20 ${product.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide shadow-lg`}>
                    {product.badge}
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-grow flex flex-col relative z-20 bg-zinc-900/60">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{product.name}</h3>
                <ul className="space-y-3 mb-8 flex-grow text-sm text-zinc-400 font-medium">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-3"></div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-5 border-t border-zinc-800/80">
                  <p className="text-xs text-emerald-400 mb-3 uppercase tracking-wider font-extrabold flex items-center gap-1">
                    <span>🚚 Envío + Colocación GRATIS</span>
                  </p>
                  <button 
                    type="button"
                    onClick={() => handleStockConsult(product.name)}
                    className="w-full flex justify-between items-center bg-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 text-white px-5 py-3.5 rounded-xl font-bold transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    <span>Consultar Stock</span>
                    <ArrowRight className="w-5 h-5" />
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
interface ValuePropItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function ValueProposition() {
  const valueProps: ValuePropItem[] = [
    {
      icon: <Wrench className="h-7 w-7 text-cyan-400" />,
      title: 'Cero Daños',
      desc: 'Herramientas específicas para no astillar madera ni rallar aluminio. Ajuste milimétrico garantizado.'
    },
    {
      icon: <Smartphone className="h-7 w-7 text-indigo-400" />,
      title: 'App Configurada',
      desc: 'Registro de administrador, alta de huellas y prueba de tarjetas en el acto. Lista para usar.'
    },
    {
      icon: <Battery className="h-7 w-7 text-emerald-400" />,
      title: 'Capacitación Total',
      desc: 'Te explico cómo cargarla, usar la llave de emergencia y mantenerla óptima por años.'
    }
  ];

  return (
    <section id="como-funciona" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white">Por qué elegir un instalador oficial KEMA</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((item, idx) => (
            <div key={idx} className="backdrop-blur-md bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500 group">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 inline-flex mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
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
interface TestimonialItem {
  name: string;
  role: string;
  text: string;
}

function Gallery() {
  const testimonials: TestimonialItem[] = [
    { name: 'Marcos R.', role: 'Consorcio Residencial', text: 'Impecable. Vino en horario, no ensució nada y nos dejó la cerradura KEMA funcionando con clave para cada vecino.' },
    { name: 'Luciana G.', role: 'Airbnb Host & Departamentos', text: 'Me resolvió el tema de las llaves perdidas. Ahora genero un código por reserva desde mi celular y listo. Servicio de 10.' }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-3xl font-extrabold text-white mb-8">Tranquilidad para dueños y huéspedes en todo el país</h2>
            {testimonials.map((review, idx) => (
              <div key={idx} className="backdrop-blur-md bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 relative hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500">
                <div className="absolute top-6 right-6 flex text-cyan-500">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-zinc-300 text-lg italic mb-6 w-11/12">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center text-cyan-400 font-bold border border-zinc-700">{review.name.charAt(0)}</div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-white">{review.name}</p>
                    <p className="text-xs text-zinc-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-2 relative h-64 overflow-hidden hover:border-cyan-400/50 transition-all duration-500">
               <Image src="/hero.png" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-2xl opacity-80" alt="Instalación KEMA 1" />
            </div>
            <div className="backdrop-blur-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-2 relative h-64 mt-12 overflow-hidden hover:border-cyan-400/50 transition-all duration-500">
               <Image src="/app.png" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover rounded-2xl opacity-80" alt="Instalación KEMA 2" />
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
    const wholesaleMsg = "¡Hola KEMA Locks! 👋 Quisiera consultar la lista de Precios Mayoristas (desde 10 unidades) para obras/profesionales.";
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(wholesaleMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-xl bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-cyan-950/40 border border-cyan-500/30 rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-500">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/50 backdrop-blur-sm mb-2">
              🏗️ Venta Mayorista & Obras
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">💰 Precio Mayorista desde 10 unidades</h3>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl">
              Ideal para constructoras, arquitectos, cerrajerías y desarrollos inmobiliarios. Asesoramiento directo y lista de precios por volumen.
            </p>
          </div>

          <button
            type="button"
            onClick={handleWholesaleConsult}
            className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-zinc-950 font-extrabold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 scale-100 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Consultar lista mayorista</span>
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
  const faqs: FAQItem[] = [
    {
      question: "¿Qué sucede si se agotan las baterías?",
      answer: "La cerradura KEMA te avisa semanas antes vía voz y en la App. Si ignoras los avisos, todas traen un puerto USB exterior de emergencia para conectar un PowerBank, o bien una llave física oculta de seguridad."
    },
    {
      question: "¿Se puede instalar en puertas de exteriores?",
      answer: "Sí, pero requiere un modelo específico con certificación IP65 resistente a lluvia y polvo. Asegúrate de aclararlo en la cotización."
    },
    {
      question: "¿Cómo configuro nuevas huellas o códigos?",
      answer: "Todo se gestiona muy fácilmente desde la App móvil (en español) vía Bluetooth o WiFi. Puedes agregar o borrar usuarios, ver el historial y crear pines temporales."
    }
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Preguntas Frecuentes</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`border transition-all duration-300 rounded-2xl overflow-hidden ${isOpen ? 'bg-zinc-800/50 border-cyan-500/50' : 'backdrop-blur-md bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'}`}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset rounded-2xl"
      >
        <span className={`font-semibold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-zinc-300'}`}>{question}</span>
        <div className={`p-1 rounded-full transition-colors duration-300 ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-800 text-zinc-500'}`}>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="p-6 pt-0 text-zinc-400 leading-relaxed border-t border-zinc-800/50 mx-6 mt-2">{answer}</p>
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
      <div className="absolute inset-0 bg-emerald-500 rounded-full blur opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500"></div>
      <div className="relative bg-emerald-500 text-white p-4 rounded-full shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-300 border border-emerald-400">
        <MessageCircle className="w-7 h-7" />
      </div>
      {/* Badge Notification */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-emerald-500"></span>
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
    <footer className="border-t border-zinc-800/80 bg-zinc-950 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <span className="font-bold text-2xl tracking-tight text-white mb-2 block">
              KEMA <span className="text-cyan-400 font-medium">Cerraduras Inteligentes</span>
            </span>
            <p className="text-cyan-500 text-xs font-semibold uppercase tracking-wider mb-4">
              Distribuidor Oficial • Cobertura e Instalaciones en Toda Argentina
            </p>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Profesionalismo, estética y máxima seguridad. Llevamos la tecnología de accesos inteligentes KEMA a tu hogar u obra con instalación profesional y soporte técnico en todo el país.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Enlaces</h4>
            <ul className="text-zinc-400 text-sm space-y-3">
              <li><button type="button" onClick={(e) => scrollTo(e, 'modelos')} className="hover:text-cyan-400 transition-colors">Catálogo KEMA</button></li>
              <li><button type="button" onClick={(e) => scrollTo(e, 'cotizador')} className="hover:text-cyan-400 transition-colors">Cotizador Rápido</button></li>
              <li><button type="button" onClick={(e) => scrollTo(e, 'faq')} className="hover:text-cyan-400 transition-colors">Preguntas Frecuentes</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contacto Oficial</h4>
            <a 
              href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(DEFAULT_WA_MESSAGE)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-sm text-zinc-400 hover:text-emerald-400 transition-colors mb-3"
            >
              <MessageCircle className="mr-2 w-4 h-4 text-emerald-400" /> {WHATSAPP_DISPLAY}
            </a>
            <br/>
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-zinc-400 hover:text-pink-400 text-sm inline-flex items-center transition-colors mb-3"
            >
              <InstagramIcon className="mr-2 w-4 h-4 text-pink-500" /> @cerradurasinteligentesfcp
            </a>
            <br/>
            <span className="inline-flex items-center text-xs text-zinc-500">
              <MapPin className="mr-1.5 w-3.5 h-3.5 text-zinc-400" /> Envíos e Instalaciones en Todo el País
            </span>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} KEMA Cerraduras Inteligentes Argentina. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">Distribuidor Oficial KEMA</p>
        </div>
      </div>
    </footer>
  );
}
