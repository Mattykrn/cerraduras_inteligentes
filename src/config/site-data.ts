import type { DoorType, AccessMethod, ProductModel, FAQItem } from '@/types';

export const WHATSAPP_PHONE = '5493425546013';
export const WHATSAPP_DISPLAY = '+54 9 342 554-6013';
export const INSTAGRAM_URL = 'https://www.instagram.com/cerradurasinteligentesfcp/';
export const DEFAULT_WA_MESSAGE = '¡Hola KEMA Locks! 👋 Vi la web con Envío + Colocación GRATIS y quisiera consultar por modelos e instalación a domicilio.';
export const WHOLESALE_WA_MESSAGE = '¡Hola KEMA Locks! 👋 Quisiera consultar la lista de Precios Mayoristas (desde 10 unidades) para obras/profesionales.';

export interface CatalogProduct extends ProductModel {
  badgeColor: string;
}

export const CATALOG_MODELS: CatalogProduct[] = [
  {
    id: 'kema-one',
    badge: 'Más Vendido',
    badgeColor: 'bg-zinc-900 border border-cyan-500/40 text-cyan-300',
    name: 'KEMA-One Pro',
    image: '/app.png',
    features: ['Huella 3D ultra rápida', 'Batería: 8-12 meses', 'App WiFi & Bluetooth'],
    priceReference: 'Consultar',
    doorCompatibility: ['madera', 'metal', 'aluminio'],
  },
  {
    id: 'slim-glass-pro',
    badge: 'Especial Blindex',
    badgeColor: 'bg-zinc-900 border border-indigo-500/40 text-indigo-300',
    name: 'KEMA Slim-Glass Pro',
    image: '/hero.png',
    features: ['Instalación sin perforar', 'Historial de accesos', 'Cierre automático'],
    priceReference: 'Consultar',
    doorCompatibility: ['blindex'],
  },
  {
    id: 'titanium-x',
    badge: 'Exterior Resistente',
    badgeColor: 'bg-zinc-900 border border-emerald-500/40 text-emerald-300',
    name: 'KEMA Titanium X',
    image: '/app.png',
    features: ['IP65 contra lluvia', 'Chasis reforzado', 'Ideal casas y portones'],
    priceReference: 'Consultar',
    doorCompatibility: ['madera', 'metal'],
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
  value: DoorType;
}

export const DOOR_OPTIONS: DoorOptionConfig[] = [
  { label: 'Madera', value: 'madera' },
  { label: 'Chapa / Metal', value: 'metal' },
  { label: 'Aluminio (Perfil)', value: 'aluminio' },
  { label: 'Vidrio / Blindex', value: 'blindex' },
];

export interface AccessOptionConfig {
  label: string;
  value: AccessMethod;
  iconName: 'fingerprint' | 'key' | 'smartphone' | 'shield';
}

export const ACCESS_OPTIONS_META: AccessOptionConfig[] = [
  { label: 'Huella Digital', value: 'huella', iconName: 'fingerprint' },
  { label: 'Código PIN', value: 'pin', iconName: 'key' },
  { label: 'App WiFi / Bluetooth', value: 'app', iconName: 'smartphone' },
  { label: 'Tarjeta RFID', value: 'tarjeta', iconName: 'shield' },
];
