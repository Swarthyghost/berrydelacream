import { Product, Testimonial } from './types';

export const WHATSAPP_NUMBER = "233550303030"; // Main Accra WhatsApp Number Placeholder (233XXXXXXXXX format)

export const PRODUCTS: Product[] = [
  {
    id: "ic-1",
    name: "Strawberry Swirl",
    description: "Luxurious artisan cream layered with sweet organic Accra strawberry reduction & fresh chunks.",
    category: "ice-cream",
    price: 45,
    image: "/src/assets/images/strawberry_swirl_1781116317405.png",
    badge: "Best Seller",
    popular: true
  },
  {
    id: "ic-2",
    name: "Mango Tropical",
    description: "Smooth sun-ripened local Ghanaian mangoes blended into a refreshing, silky frozen treat.",
    category: "ice-cream",
    price: 40,
    image: "/src/assets/images/mango_tropical_1781116331472.png",
    badge: "Seasonal",
    popular: true
  },
  {
    id: "ic-3",
    name: "Chocolate Delight",
    description: "Rich dark cocoa infused into luxurious cream and drizzled with artisan Accra fudge chocolate.",
    category: "ice-cream",
    price: 45,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600",
    badge: "Choco Love"
  },
  {
    id: "ic-4",
    name: "Vanilla Dream",
    description: "Creamy Madagascar vanilla bean slow-churned to smooth, velvety, timeless perfection.",
    category: "ice-cream",
    price: 35,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9391?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "yg-1",
    name: "Berry Blast Parfait",
    description: "Thick probiotic Greek yoghurt layered with local honey, golden granola, fresh berries.",
    category: "yoghurt",
    price: 50,
    image: "/src/assets/images/berry_blast_yoghurt_1781116347057.png",
    badge: "House Favorite",
    popular: true
  },
  {
    id: "yg-2",
    name: "Honey Vanilla Yoghurt",
    description: "Creamy whipped yoghurt drizzled with pure wild-harvested Ghanaian forest honey.",
    category: "yoghurt",
    price: 45,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "yg-3",
    name: "Mixed Fruit Bliss",
    description: "Fresh yoghurt parfaits generously topped with seasonal pineapples, papayas, and red grapes.",
    category: "yoghurt",
    price: 48,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "jc-1",
    name: "Pineapple Ginger",
    description: "Zesty homegrown ginger cold-pressed with sweet, sun-soaked organic Accra crown pineapples.",
    category: "juice",
    price: 35,
    image: "/src/assets/images/fresh_juices_tropical_1781116363046.png",
    badge: "Energy",
    popular: true
  },
  {
    id: "jc-2",
    name: "Watermelon Breeze",
    description: "Ultra-hydrating fresh cold-pressed watermelon juice balanced with a lively squeeze of lime.",
    category: "juice",
    price: 30,
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=600",
    badge: "Pure Hydration"
  },
  {
    id: "jc-3",
    name: "Mixed Tropical",
    description: "A restorative tropical infusion of sweet passionfruit, orange nectar, and fresh mango puree.",
    category: "juice",
    price: 35,
    image: "https://images.unsplash.com/photo-1622597467820-f82a170444b6?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "jc-4",
    name: "Soursop Special",
    description: "Creamy organic soursop nectar, loaded with vitamins and high-nature fibers, slow-pressed.",
    category: "juice",
    price: 40,
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=600"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Abena Mansa",
    location: "East Legon, Osu",
    comment: "The Strawberry Swirl is hands down the best ice cream in Accra! Rich, creamy, and the fresh strawberries taste so authentic.",
    rating: 5
  },
  {
    name: "Charles Owusu",
    location: "Airport Residential Area",
    comment: "I order the Berry Blast Yoghurt and Pineapple Ginger juice every Sunday after gym block. Quick delivery and incredible fresh taste!",
    rating: 5
  },
  {
    name: "Naa Adjorkor",
    location: "Cantonments",
    comment: "Excellent client service! Placed my order on WhatsApp and got it delivered to Cantonments within 30 minutes, ice cream was perfectly frozen.",
    rating: 5
  }
];
