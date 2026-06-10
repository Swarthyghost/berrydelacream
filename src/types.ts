export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'ice-cream' | 'yoghurt' | 'juice';
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
