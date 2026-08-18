import type { DoorType, AccessMethod, ProductModel, FAQItem } from '@/types';

export const WHATSAPP_PHONE = '5493425546013';
export const WHATSAPP_DISPLAY = '+54 9 342 554-6013';
export const INSTAGRAM_URL = 'https://www.instagram.com/cerradurasinteligentesfcp/';
export const DEFAULT_WA_MESSAGE = '¡Hola KEMA Locks! 👋 Vi la web con Envío + Colocación GRATIS y quisiera consultar por modelos e instalación a domicilio.';
export const WHOLESALE_WA_MESSAGE = '¡Hola KEMA Locks! 👋 Quisiera consultar la lista de Precios Mayoristas (desde 10 unidades) para obras/profesionales.';

export interface CatalogProduct extends ProductModel {
  badgeColor: string;
  sub: string;
}

export const CATALOG_MODELS: CatalogProduct[] = [
  {
    id: 'kema-one',
    badge: 'Más Vendido',
    badgeColor: 'bg-zinc-900 border border-cyan-500/40 text-cyan-300',
    name: 'KEMA-One Pro',
    sub: 'Madera · Chapa · Universal',
    image: '/app.png',
    features: ['Huella 3D ultra rápida', 'Batería: 8-12 meses', 'App WiFi & Bluetooth', 'Alarma anti-tamper'],
    priceReference: 'Consultar',
    doorCompatibility: ['madera', 'metal', 'aluminio'],
  },
  {
    id: 'slim-glass-pro',
    badge: 'Especial Blindex',
    badgeColor: 'bg-zinc-900 border border-indigo-500/40 text-indigo-300',
    name: 'KEMA Slim-Glass Pro',
    sub: 'Vidrio · Aluminio perfil',
    image: '/hero.png',
    features: ['Instalación sin perforar', 'Historial de accesos', 'Cierre automático', 'WiFi + Bluetooth 5.0'],
    priceReference: 'Consultar',
    doorCompatibility: ['blindex'],
  },
  {
    id: 'titanium-x',
    badge: 'Exterior Resistente IP65',
    badgeColor: 'bg-zinc-900 border border-emerald-500/40 text-emerald-300',
    name: 'KEMA Titanium X',
    sub: 'Exterior · Alta seguridad',
    image: '/app.png',
    features: ['IP65 contra lluvia', 'Chasis reforzado', 'Ideal casas y portones', '18 meses de batería'],
    priceReference: 'Consultar',
    doorCompatibility: ['madera', 'metal'],
  }
];

export const HERO_STATS = [
  { value: '+1.200', label: 'instalaciones' },
  { value: '5 años', label: 'de garantía' },
  { value: '48 hs', label: 'tiempo entrega' },
];

export interface InstallationItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  image: string;
  alt: string;
  gridSpan: string;
}

export const REAL_INSTALLATIONS: InstallationItem[] = [
  {
    id: 'inst-1',
    title: 'Puerta Pivotante de Madera Maciza con Sensor 3D',
    category: 'Residencial Premium',
    badge: '✨ Proyecto Destacado',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Instalación de cerradura inteligente en puerta pivotante de madera',
    gridSpan: 'md:col-span-2 md:row-span-1'
  },
  {
    id: 'inst-2',
    title: 'Teclado Táctil y Biometría de Precisión',
    category: 'Detalle Técnico',
    badge: '🔍 Macro Detalle',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    alt: 'Primer plano del teclado numérico y lector de huella digital de cerradura inteligente',
    gridSpan: 'md:col-span-1 md:row-span-2'
  },
  {
    id: 'inst-3',
    title: 'Portón Metálico y Acceso Exterior',
    category: 'Apto Intemperie',
    badge: '🌧️ Protección IP65',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    alt: 'Cerradura reforzada instalada en portón exterior metálico',
    gridSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'inst-4',
    title: 'Perfilería Fina de Aluminio Negro y Vidrio',
    category: 'Línea Slim',
    badge: '🏢 Minimalismo',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    alt: 'Cerradura digital slim en puerta de aluminio y vidrio',
    gridSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'inst-5',
    title: 'Control de Accesos Remoto y Apertura por App',
    category: 'Smart Home',
    badge: '📲 Conectividad Total',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    alt: 'Apertura y monitoreo remoto de cerradura inteligente mediante app móvil',
    gridSpan: 'md:col-span-1 md:row-span-1'
  }
];

export const FAQS_DATA: FAQItem[] = [
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

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  { 
    name: 'Marcos R.', 
    role: 'Consorcio Residencial', 
    text: 'Impecable. Vino en horario, no ensució nada y nos dejó la cerradura KEMA funcionando con clave para cada vecino.' 
  },
  { 
    name: 'Luciana G.', 
    role: 'Airbnb Host & Departamentos', 
    text: 'Me resolvió el tema de las llaves perdidas. Ahora genero un código por reserva desde mi celular y listo. Servicio de 10.' 
  }
];

export interface DoorOptionConfig {
  label: string;
  sub: string;
  value: DoorType;
}

export const DOOR_OPTIONS: DoorOptionConfig[] = [
  { label: 'Madera', sub: 'Sólida · enchapada', value: 'madera' },
  { label: 'Chapa / Metal', sub: 'Acero · HDF', value: 'metal' },
  { label: 'Aluminio Perfil', sub: 'Marco tubular', value: 'aluminio' },
  { label: 'Vidrio / Blindex', sub: 'Pivotante · corrediza', value: 'blindex' },
];

export interface AccessOptionConfig {
  label: string;
  sub: string;
  value: AccessMethod;
  iconName: 'fingerprint' | 'key' | 'smartphone' | 'shield';
}

export const ACCESS_OPTIONS_META: AccessOptionConfig[] = [
  { label: 'Huella Dactilar', sub: '3D biométrico · 0.3s', value: 'huella', iconName: 'fingerprint' },
  { label: 'Código PIN', sub: 'Teclado retroiluminado', value: 'pin', iconName: 'key' },
  { label: 'App WiFi / Bluetooth', sub: 'Control remoto 24/7', value: 'app', iconName: 'smartphone' },
  { label: 'Tarjeta RFID', sub: 'Llave de proximidad', value: 'tarjeta', iconName: 'shield' },
];
