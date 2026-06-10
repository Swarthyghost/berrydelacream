import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ShoppingBag, X } from 'lucide-react';
import { Product, CartItem } from './types';
import { WHATSAPP_NUMBER } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import WhatsAppCart from './components/WhatsAppCart';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Login from './components/Login';
import { useProducts } from './hooks/useProducts';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { products, isLoaded, addProduct, updateProduct, deleteProduct } = useProducts();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Helper: show custom toast message
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Add item to custom cart
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        triggerToast(`Increased quantity of ${product.name} in basket! 🍓`);
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        triggerToast(`Added ${product.name} to dessert basket! 🍦`);
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
    triggerToast("Item removed from basket.");
  };

  // Clear all items of cart
  const handleClearCart = () => {
    setCartItems([]);
    triggerToast("Cleared dessert basket.");
  };

  // Scroll to targeted section ID
  const handleScrollToSegment = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill WhatsApp message for single product (Instant Order)
  const getInstantWhatsAppUrl = (product: Product) => {
    const message = `Hi Berry De Lacream! I'd like to order ${product.name} (₵${product.price.toFixed(2)}). Please confirm availability and delivery to [location].`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  // Pre-fill WhatsApp general inquiry
  const getGeneralWhatsAppUrl = () => {
    const message = `Hi Berry De Lacream! I'd like to place an order. Can you help?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  // Pre-fill WhatsApp cart checkout message
  const getCartCheckoutWhatsAppUrl = () => {
    if (cartItems.length === 0) return getGeneralWhatsAppUrl();
    
    const itemsText = cartItems
      .map((item) => `• ${item.quantity}x ${item.product.name} (₵${(item.product.price * item.quantity).toFixed(2)})`)
      .join('\n');
    
    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    
    const message = `Hi Berry De Lacream! I'd like to place an order:\n\n${itemsText}\n\nTotal: ₵${total.toFixed(2)}\n\nPlease confirm availability and delivery to [location].`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (view === 'admin') {
    if (!user) {
      return <Login onBackToStore={() => setView('store')} />;
    }
    return (
      <Admin 
        products={products}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        onClose={() => setView('store')}
      />
    );
  }

  return (
    <div className="bg-cream-white min-h-screen text-[#2D1528] relative font-sans antialiased overflow-x-hidden selection:bg-berry-pink selection:text-berry-purple">
      
      {/* Dynamic Navigation */}
      <Navbar 
        cartItemCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        whatsappUrl={getGeneralWhatsAppUrl()}
      />

      {/* Hero Slider banner presentation */}
      <Hero 
        onOrderGeneral={() => window.open(getGeneralWhatsAppUrl(), '_blank', 'noreferrer')}
        onScrollToMenu={() => handleScrollToSegment('menu')}
      />

      {/* Main Treats Grid Menu */}
      <Menu 
        products={products}
        onAddToCart={handleAddToCart}
        onInstantOrder={(product) => window.open(getInstantWhatsAppUrl(product), '_blank', 'noreferrer')}
      />

      {/* Step by step graphic guides */}
      <HowItWorks />

      {/* About story block */}
      <About />

      {/* Physical address, contact coordinates and deliveries list */}
      <Contact 
        onOrderGeneral={() => window.open(getGeneralWhatsAppUrl(), '_blank', 'noreferrer')}
        whatsappUrl={getGeneralWhatsAppUrl()}
      />

      {/* Brand Signoffs Footer */}
      <Footer 
        onScrollToHome={() => handleScrollToSegment('home')}
        whatsappUrl={getGeneralWhatsAppUrl()}
        onAdminClick={() => setView('admin')}
      />

      {/* Slide out Cart Slip Drawer Overlay */}
      <WhatsAppCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        checkoutUrl={getCartCheckoutWhatsAppUrl()}
      />

      {/* Quick, beautiful floating toast notices */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-berry-purple text-cream-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center space-x-3 max-w-sm w-[90%] sm:w-auto"
            id="toast-floating-banner"
          >
            <div className="bg-emerald-500 p-1 rounded-full text-white">
              <Check className="h-4 w-4 stroke-[3]" />
            </div>
            <p className="text-xs sm:text-sm font-semibold truncate flex-grow">
              {toastMessage}
            </p>
            {/* Direct basket button shortcut on alert to keep users highly engaged */}
            <button
              onClick={() => { setIsCartOpen(true); setToastMessage(null); }}
              className="text-[10px] font-mono font-bold uppercase text-rose-300 hover:text-white underline ml-2 flex-shrink-0 flex items-center space-x-1"
            >
              <ShoppingBag className="h-3 w-3 inline" />
              <span>Basket</span>
            </button>
            <button
              onClick={() => setToastMessage(null)}
              className="text-stone-400 hover:text-white p-1 rounded-full"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
