import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './src/firebase';

const newProducts = [
  // Parfaits - Unsweetened
  { id: 'unsweetened-bowl', name: 'Unsweetened Parfait Bowl', description: 'Fresh unsweetened yogurt layered with fruits.', category: 'parfait', segment: 'unsweetened', size: '500ml', price: 100, image: 'https://images.unsplash.com/photo-1571216301397-6a45749f76a5?auto=format&fit=crop&w=400&q=80' },
  { id: 'unsweetened-cup', name: 'Unsweetened Cup', description: 'A perfect mid-day treat.', category: 'parfait', segment: 'unsweetened', size: '350ml', price: 70, image: 'https://images.unsplash.com/photo-1571216301397-6a45749f76a5?auto=format&fit=crop&w=400&q=80' },
  
  // Parfaits - Sweetened
  { id: 'sweetened-bowl', name: 'Sweetened Parfait Bowl', description: 'Sweetened yogurt with delicious crunch and fruits.', category: 'parfait', segment: 'sweetened', size: '500ml', price: 100, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80' },
  { id: 'sweetened-cup', name: 'Sweetened Cup', description: 'Sweet and creamy treat.', category: 'parfait', segment: 'sweetened', size: '350ml', price: 70, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80' },

  // Extras
  { id: 'extra-berries', name: 'Berries', description: 'Extra seasonal berry mix.', category: 'extras', segment: 'extras', price: 15, image: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&w=400&q=80' },
  { id: 'extra-nuts', name: 'Nuts', description: 'Toasted almond & cashew crunch.', category: 'extras', segment: 'extras', price: 15, image: 'https://images.unsplash.com/photo-1599598425947-330026296906?auto=format&fit=crop&w=400&q=80' },

  // Single Juices
  { id: 'juice-orange', name: 'Pure Orange', description: '100% cold-pressed sunshine.', category: 'juice', segment: 'single', price: 25, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80' },
  { id: 'juice-pine', name: 'Fresh Pine', description: 'Sweet and tangy Accra pineapples.', category: 'juice', segment: 'single', price: 25, image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80' },
  { id: 'juice-cucumber', name: 'Cool Cucumber', description: 'Hydrating and crisp, perfectly chilled.', category: 'juice', segment: 'single', price: 25, image: 'https://images.unsplash.com/photo-1605270012917-bf157c5a9531?auto=format&fit=crop&w=400&q=80' },
  { id: 'juice-carrot', name: 'Golden Carrot', description: 'Earthy and naturally sweet.', category: 'juice', segment: 'single', price: 25, image: 'https://images.unsplash.com/photo-1615486171448-4c8d506d15b0?auto=format&fit=crop&w=400&q=80' },
  { id: 'juice-apple', name: 'Crisp Apple', description: 'Clear and refreshing apple juice.', category: 'juice', segment: 'single', price: 25, image: 'https://images.unsplash.com/photo-1595981267035-7b04d84d52fd?auto=format&fit=crop&w=400&q=80' },
  { id: 'juice-coconut', name: 'Coconut Water', description: 'Pure hydration straight from the source.', category: 'juice', segment: 'single', price: 25, image: 'https://images.unsplash.com/photo-1524222835726-8e5d4546876c?auto=format&fit=crop&w=400&q=80' },

  // Juice Combos
  { id: 'combo-pine-ginger', name: 'Pineapple and ginger', description: 'A spicy tropical kick', category: 'juice', segment: 'combo', price: 25, image: 'https://images.unsplash.com/photo-1622597467836-f38240662d51?auto=format&fit=crop&w=400&q=80' },
  { id: 'combo-watermelon-ginger-lemon', name: 'Watermelon, ginger and lemon', description: 'Refreshing with a zing', category: 'juice', segment: 'combo', price: 25, image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=400&q=80' },
  { id: 'combo-tropical-chill', name: 'Tropical chill', description: 'Pineapple apple & orange', category: 'juice', segment: 'combo', price: 30, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80' },
  { id: 'combo-detox-burst', name: 'Detox burst', description: 'Pineapple lemon and ginger', category: 'juice', segment: 'combo', price: 30, image: 'https://images.unsplash.com/photo-1622597467836-f38240662d51?auto=format&fit=crop&w=400&q=80' },
  { id: 'combo-sunrise-glow', name: 'Sunrise glow', description: 'Pineapple, orange and ginger', category: 'juice', segment: 'combo', price: 35, image: 'https://images.unsplash.com/photo-1615486171448-4c8d506d15b0?auto=format&fit=crop&w=400&q=80' },
  { id: 'combo-pink-breeze', name: 'Pink breeze', description: 'Pineapple watermelon lemon and mint', category: 'juice', segment: 'combo', price: 35, image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=400&q=80' },
];

async function seed() {
  const productsRef = collection(db, 'products');
  
  // Clear existing
  const snap = await getDocs(productsRef);
  for (const document of snap.docs) {
    await deleteDoc(doc(db, 'products', document.id));
  }

  // Add new
  for (const product of newProducts) {
    const { id, ...data } = product;
    await setDoc(doc(db, 'products', id), data);
  }
  
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(console.error);
