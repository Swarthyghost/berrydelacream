export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'parfait' | 'juice' | 'extras' | string;
  segment?: 'unsweetened' | 'sweetened' | 'single' | 'combo' | 'extras' | string;
  size?: string; // e.g. 500ml, 350ml
  price: number; // in GHS (₵)
  image: string;
  badge?: string;
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  name: string;
  location: string;
  comment: string;
  rating: number;
}

export interface PromoCode {
  id: string; // The promo code string, e.g. "BERRY10"
  type: 'percentage' | 'fixed';
  value: number; // e.g. 10 for 10%, or 5 for GH₵5
  active: boolean;
}

export interface GlobalSettings {
  salesNotificationEnabled: boolean;
  salesNotificationText: string;
}
