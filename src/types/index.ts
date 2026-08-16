export type DoorType = 'madera' | 'metal' | 'aluminio' | 'blindex';
export type AccessMethod = 'huella' | 'pin' | 'app' | 'tarjeta';

export interface ProductModel {
  id: string;
  name: string;
  badge?: string;
  priceReference: string;
  features: string[];
  image: string;
  doorCompatibility: DoorType[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface QuoteWizardState {
  step: number;
  doorType: DoorType | null;
  accessMethod: AccessMethod | null;
  city: string;
  selectedModel?: string | null;
}
