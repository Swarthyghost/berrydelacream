"use client";

import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product, CartItem } from '../types';

// ─── Reusable Product Card ────────────────────────────────────────────────────
function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-outline-variant/50 hover:shadow-xl transition-all group flex flex-col">
      <div className="aspect-square bg-surface-container-low rounded-xl mb-4 overflow-hidden">
        <img
          src={product.image || "https://images.unsplash.com/photo-1571216301397-6a45749f76a5?auto=format&fit=crop&w=400&q=80"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="font-bold text-base text-on-surface leading-tight mb-1">{product.name}</h3>
      {product.size && <p className="text-xs text-on-surface-variant mb-3">{product.size}</p>}
      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold text-lg text-secondary">GH₵{product.price}</span>
        <button
          onClick={onAdd}
          aria-label={`Add ${product.name} to basket`}
          className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>
    </div>
  );
}

// ─── Extras Row Card ──────────────────────────────────────────────────────────
function ExtraCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <div className="bg-surface-container-low p-4 rounded-xl flex justify-between items-center border border-outline-variant/20">
      <div>
        <h5 className="font-bold text-on-surface text-sm">{product.name}</h5>
        <p className="text-xs text-on-surface-variant">{product.description}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0 pl-4">
        <span className="font-bold text-secondary">GH₵{product.price}</span>
        <button
          onClick={onAdd}
          aria-label={`Add ${product.name}`}
          className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span>
        </button>
      </div>
    </div>
  );
}

// ─── Combo Row Card ───────────────────────────────────────────────────────────
function ComboCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <div className="bg-surface-container-low p-4 sm:p-6 rounded-2xl flex justify-between items-center hover:bg-surface-container-high transition-all gap-2">
      <div className="min-w-0">
        <h5 className="font-bold text-on-surface text-sm sm:text-base truncate">{product.name}</h5>
        <p className="text-xs text-on-surface-variant">{product.description}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0 pl-2">
        <span className="font-bold text-secondary text-sm sm:text-base">GH₵{product.price}</span>
        <button
          onClick={onAdd}
          className="bg-secondary text-white px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Storefront() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { products } = useProducts();

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item)
         .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const heroProduct = products[0];

  const parfaitUnsweetened = products.filter(p => p.category === 'parfait' && p.segment === 'unsweetened');
  const parfaitSweetened  = products.filter(p => p.category === 'parfait' && p.segment === 'sweetened');
  const extras             = products.filter(p => p.category === 'extras');
  const singleJuices       = products.filter(p => p.category === 'juice' && p.segment === 'single');
  const comboJuices        = products.filter(p => p.category === 'juice' && p.segment === 'combo');

  // WhatsApp checkout builder
  const handleWhatsApp = () => {
    if (cartItems.length === 0) return;
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '233000000000';
    const lines = cartItems.map(i => `• ${i.product.name} x${i.quantity} — GH₵${i.product.price * i.quantity}`).join('\n');
    const msg = encodeURIComponent(`Hello Berry De Lacreme! 🍓\n\nI'd like to order:\n${lines}\n\nTotal: GH₵${subtotal}`);
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
  };

  // ─── Cart Panel (shared between mobile drawer & desktop sidebar) ──────────
  const CartPanel = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">shopping_bag</span>
          Your Basket
        </h3>
        {/* Close button — only visible on mobile drawer */}
        <button
          onClick={() => setMobileCartOpen(false)}
          className="md:hidden p-1 rounded-full hover:bg-surface-container"
          aria-label="Close basket"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-5 flex flex-col gap-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-on-surface-variant/50 py-10">
            <span className="material-symbols-outlined text-6xl mb-3">shopping_cart</span>
            <p className="text-sm">Your basket is empty.</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.product.id} className="flex gap-3 items-center">
              <div className="w-14 h-14 rounded-xl bg-surface-container overflow-hidden shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-bold text-sm truncate">{item.product.name}</p>
                <p className="text-xs text-on-surface-variant">GH₵{item.product.price}</p>
                <div className="flex items-center gap-2 mt-1.5 bg-surface-container-low w-fit rounded-full px-2 py-0.5">
                  <button onClick={() => handleUpdateQuantity(item.product.id, -1)} className="text-primary" aria-label="Remove one">
                    <span className="material-symbols-outlined text-sm block">remove</span>
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.product.id, 1)} className="text-primary" aria-label="Add one">
                    <span className="material-symbols-outlined text-sm block">add</span>
                  </button>
                </div>
              </div>
              <span className="font-bold text-secondary text-sm shrink-0">GH₵{item.product.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>

      <div className="p-5 bg-surface-container-low border-t border-outline-variant/10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-on-surface-variant font-medium text-sm">Subtotal</span>
          <span className="font-bold text-xl text-on-surface">GH₵{subtotal}</span>
        </div>
        <button
          onClick={handleWhatsApp}
          className="w-full bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 rounded-full font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all mb-3"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.335 0-4.241 1.906-4.241 4.241 0 .736.19 1.455.551 2.083l-.587 2.144 2.195-.576c.611.332 1.3.508 2.003.508 2.335 0 4.241-1.906 4.241-4.241s-1.906-4.159-4.162-4.159zm3.176 5.86c-.131.33-.765.639-1.047.681-.282.041-.634.073-1.895-.445-1.554-.64-2.553-2.22-2.63-2.321-.077-.101-.621-.825-.621-1.573 0-.748.388-1.116.527-1.261.139-.145.305-.181.408-.181s.204.004.294.009c.094.004.22-.036.344.257.131.311.451 1.096.49 1.176.039.08.066.173.013.282-.053.109-.08.188-.159.282-.08.094-.167.21-.239.282-.08.08-.164.167-.071.327.094.16.417.689.896 1.115.617.549 1.138.719 1.301.8.163.08.261.066.358-.045.097-.111.417-.487.527-.655.109-.168.22-.141.371-.086.151.055.955.451 1.12.534.164.083.274.124.313.19.041.066.041.381-.09.711zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.981-1.309A9.943 9.943 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.644 0-3.177-.477-4.469-1.3l-.32-.204-3.32.871.887-3.238-.225-.358A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
          Order via WhatsApp
        </button>
        {cartItems.length > 0 && (
          <button onClick={clearCart} className="w-full text-center text-on-surface-variant hover:text-red-500 transition-colors text-sm font-bold">
            Clear basket
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative bg-white text-on-surface min-h-screen overflow-x-hidden">

      {/* ── Mobile Cart Drawer (slides up from bottom) ─────────────────────── */}
      {mobileCartOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileCartOpen(false)} />
          <div className="relative bg-white rounded-t-3xl h-[85vh] flex flex-col shadow-2xl">
            <CartPanel />
          </div>
        </div>
      )}

      {/* ── Mobile Nav Drawer ──────────────────────────────────────────────── */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[90] flex md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setMobileNavOpen(false)} />
          <div className="relative bg-white w-[85%] max-w-sm h-full flex flex-col shadow-2xl">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/30 bg-surface-container-lowest">
              <div className="text-lg font-bold tracking-widest text-primary uppercase leading-tight">
                Berry De<br/>Lacreme
              </div>
              <button 
                onClick={() => setMobileNavOpen(false)} 
                className="p-2 bg-surface-container-low rounded-full text-on-surface hover:bg-surface-container transition-colors"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined block">close</span>
              </button>
            </div>
            
            {/* Sidebar Menu Items */}
            <nav className="flex flex-col p-4 gap-2 flex-grow overflow-y-auto">
              {[
                { name: 'Home', href: '#', icon: 'home' },
                { name: 'About', href: '#about', icon: 'info' },
                { name: 'Menu', href: '#products', icon: 'restaurant_menu' },
                { name: 'Testimonials', href: '#testimonials', icon: 'reviews' },
              ].map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileNavOpen(false)} 
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-low active:bg-surface-container transition-colors text-on-surface font-semibold text-lg"
                >
                  <span className="material-symbols-outlined text-primary opacity-80">{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-6 bg-surface-container-lowest border-t border-outline-variant/30 mt-auto">
               <button 
                 onClick={handleWhatsApp}
                 className="w-full bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 rounded-full font-bold shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:brightness-110 active:scale-95 transition-all">
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.335 0-4.241 1.906-4.241 4.241 0 .736.19 1.455.551 2.083l-.587 2.144 2.195-.576c.611.332 1.3.508 2.003.508 2.335 0 4.241-1.906 4.241-4.241s-1.906-4.159-4.162-4.159zm3.176 5.86c-.131.33-.765.639-1.047.681-.282.041-.634.073-1.895-.445-1.554-.64-2.553-2.22-2.63-2.321-.077-.101-.621-.825-.621-1.573 0-.748.388-1.116.527-1.261.139-.145.305-.181.408-.181s.204.004.294.009c.094.004.22-.036.344.257.131.311.451 1.096.49 1.176.039.08.066.173.013.282-.053.109-.08.188-.159.282-.08.094-.167.21-.239.282-.08.08-.164.167-.071.327.094.16.417.689.896 1.115.617.549 1.138.719 1.301.8.163.08.261.066.358-.045.097-.111.417-.487.527-.655.109-.168.22-.141.371-.086.151.055.955.451 1.12.534.164.083.274.124.313.19.041.066.041.381-.09.711zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.981-1.309A9.943 9.943 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.644 0-3.177-.477-4.469-1.3l-.32-.204-3.32.871.887-3.238-.225-.358A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
                 Message on WhatsApp
               </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Sticky Top Nav ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8 md:px-16 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-outline-variant/10 shadow-sm">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="md:hidden p-2 rounded-xl hover:bg-surface-container"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Logo */}
        <div className="text-base sm:text-lg font-bold tracking-widest text-on-surface uppercase">Berry De Lacreme</div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <a href="#" className="text-primary border-b-2 border-primary pb-0.5">Home</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#products" className="hover:text-primary transition-colors">Menu</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button className="hidden sm:block hover:text-primary transition-colors" aria-label="Search">
            <span className="material-symbols-outlined font-light text-[26px]">search</span>
          </button>
          {/* Cart icon — opens drawer on mobile, scrolls on desktop */}
          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                setMobileCartOpen(true);
              } else {
                document.getElementById('cart-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hover:text-primary transition-colors relative"
            aria-label="Open basket"
          >
            <span className="material-symbols-outlined font-light text-[26px]">local_mall</span>
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-2 bg-secondary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalQty}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-28 sm:pt-32 pb-16 px-4 sm:px-8 md:px-16 max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-0 min-h-[85vh]">
        <div className="w-full md:w-1/2 flex flex-col z-10 text-center md:text-left items-center md:items-start">
          <h1 className="text-[4rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold text-primary mb-6 md:leading-[0.95] tracking-tighter">
            Fresh<br/>Parfaits
          </h1>
          <p className="text-on-surface-variant text-sm sm:text-base max-w-sm sm:max-w-md mb-8 leading-relaxed font-medium">
            Experience the perfect blend of rich creamy yogurt, fresh succulent fruits, and our signature crunchy granola — handcrafted daily for your ultimate refreshment.
          </p>
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <button
              onClick={() => heroProduct && handleAddToCart(heroProduct)}
              className="bg-secondary text-white px-7 py-3 rounded-full font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm sm:text-base"
            >
              Buy Now
            </button>
            <a href="#products" className="border-2 border-outline px-7 py-3 rounded-full font-bold text-on-surface hover:border-primary hover:text-primary transition-all text-sm sm:text-base">
              Explore Menu
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 relative flex justify-center z-10">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-full md:max-w-lg md:aspect-square">
            <img src="/images/hero_parfait.png" alt="Fresh Fruit Parfait" className="w-full h-full object-contain drop-shadow-2xl rounded-3xl" />
            <img src="https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&w=400&q=80" alt="Strawberry" className="absolute -top-6 right-6 sm:right-10 w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-full shadow-lg animate-pulse hidden sm:block" />
            <img src="https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&w=400&q=80" alt="Blueberry" className="absolute bottom-6 -left-4 sm:-left-8 w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full shadow-lg hidden sm:block" />
          </div>
        </div>
      </section>

      {/* ── About Section ────────────────────────────────────────────────────── */}
      <section id="about" className="w-full max-w-[1200px] mx-auto py-16 sm:py-24 px-4 sm:px-8 text-center scroll-mt-24">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Our Story</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface leading-tight">Crafting Nature's Best</h2>
          <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed">
            At Berry De Lacreme, we believe that healthy indulgence shouldn't compromise on taste. 
            Born out of a passion for fresh, artisanal craftsmanship, every parfait bowl and cold-pressed 
            juice we serve is a testament to quality. We source the finest seasonal fruits, blend 
            the creamiest yogurts, and press our juices without a single drop of added sugar or preservatives. 
            Experience the pure, vibrant taste of nature — handcrafted fresh, just for you, every single day.
          </p>
        </div>
      </section>

      {/* ── Feature 1: Sweetened Parfaits ──────────────────────────────────── */}
      <section className="w-full max-w-[1200px] mx-auto py-16 sm:py-24 px-4 sm:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border-4 border-primary/20 absolute -left-4 top-0 hidden sm:block"></div>
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border-4 border-secondary absolute -left-2 top-3 scale-95 hidden sm:block"></div>
          <img src="/images/feature_sweet_parfait.png" alt="Sweetened Parfait Bowl" className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover rounded-full z-10 shadow-2xl relative" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Our Signature</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-5 leading-tight">Premium<br/>Sweetened Parfaits</h2>
          <p className="text-on-surface-variant mb-7 max-w-sm text-sm sm:text-base">
            Indulge in our perfectly layered sweetened parfaits — creamy yogurt, fresh seasonal fruits, and golden honey-roasted granola, handcrafted daily.
          </p>
          <a href="#products" className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:brightness-110 active:scale-95 transition-all shadow-md">
            Order Now
          </a>
        </div>
      </section>

      {/* ── Feature 2: Fresh Juices ─────────────────────────────────────────── */}
      <section className="w-full max-w-[1200px] mx-auto py-16 sm:py-24 px-4 sm:px-8 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right">
          <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3">100% Natural</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-5 leading-tight">Fresh<br/>Cold-Pressed Juices</h2>
          <p className="text-on-surface-variant mb-7 max-w-sm text-sm sm:text-base">
            Revitalize with our 100% cold-pressed juices and exotic combos. No added sugar — just pure fruits bursting with flavour. Singles from GH₵25 · Combos from GH₵25.
          </p>
          <a href="#products" className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:brightness-110 active:scale-95 transition-all shadow-md">
            Explore Juices
          </a>
        </div>
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border-4 border-primary/20 absolute -right-4 bottom-0 hidden sm:block"></div>
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border-4 border-secondary absolute -right-2 bottom-3 scale-95 hidden sm:block"></div>
          <img src="/images/feature_fresh_juice.png" alt="Fresh Cold-Pressed Juice" className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-cover rounded-full z-10 shadow-2xl relative" />
        </div>
      </section>

      {/* ── Full Menu + Cart ────────────────────────────────────────────────── */}
      <section id="products" className="w-full max-w-[1400px] mx-auto py-12 px-4 sm:px-8 md:px-16 border-t border-outline-variant/30 mt-4 flex flex-col lg:flex-row gap-10">

        {/* Product Grid */}
        <div className="flex-grow min-w-0">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-primary">Full Menu</h2>

          {/* ── Parfait ─────────────────────────────── */}
          <div className="mb-14">
            <h3 className="text-2xl sm:text-3xl font-bold text-on-surface mb-6 border-b border-outline-variant/40 pb-2">Parfait</h3>

            <h4 className="text-base sm:text-lg font-bold text-on-surface-variant mb-4 mt-6">Unsweetened Parfait</h4>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {parfaitUnsweetened.map(p => <ProductCard key={p.id} product={p} onAdd={() => handleAddToCart(p)} />)}
            </div>

            <h4 className="text-base sm:text-lg font-bold text-on-surface-variant mb-4 mt-8">Sweetened Parfait</h4>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {parfaitSweetened.map(p => <ProductCard key={p.id} product={p} onAdd={() => handleAddToCart(p)} />)}
            </div>

            <h4 className="text-base sm:text-lg font-bold text-on-surface-variant mb-4 mt-8">Extras</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {extras.map(p => <ExtraCard key={p.id} product={p} onAdd={() => handleAddToCart(p)} />)}
            </div>
          </div>

          {/* ── Fresh Juices ────────────────────────── */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-on-surface mb-6 border-b border-outline-variant/40 pb-2">Fresh Juices</h3>

            <h4 className="text-base sm:text-lg font-bold text-on-surface-variant mb-4 mt-6">Single Juices</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
              {singleJuices.map(p => <ProductCard key={p.id} product={p} onAdd={() => handleAddToCart(p)} />)}
            </div>

            <h4 className="text-base sm:text-lg font-bold text-on-surface-variant mb-4 mt-8">Juice Combos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comboJuices.map(p => <ComboCard key={p.id} product={p} onAdd={() => handleAddToCart(p)} />)}
            </div>
          </div>
        </div>

        {/* Desktop sticky cart sidebar */}
        <aside id="cart-section" className="hidden md:block w-full lg:w-[360px] shrink-0">
          <div className="sticky top-24 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.07)] border border-outline-variant/20 overflow-hidden" style={{ maxHeight: 'calc(100vh - 7rem)' }}>
            <CartPanel />
          </div>
        </aside>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      <section id="testimonials" className="w-full max-w-[1200px] mx-auto py-20 px-4 sm:px-8 text-center bg-surface-container-lowest sm:rounded-[3rem] my-10 sm:border border-outline-variant/30 sm:shadow-sm scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-14 text-on-surface">What Our Customers Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-10 lg:gap-16 px-4">
          {[
            { name: 'Elizabeth Thomas', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80', quote: '"Highly recommended. The natural sweetness and rich texture is exactly what I was looking for. Perfect for a quick healthy breakfast!"' },
            { name: 'Chris William', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', quote: '"The best parfait I\'ve ever had. Fresh fruit with every bite. Will absolutely order again!"' },
          ].map((t) => (
            <div key={t.name} className="flex flex-col items-center max-w-sm mx-auto group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-outline-variant/20 relative mt-6 md:mt-0">
              <div className="absolute -top-6 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg font-serif text-4xl leading-none pt-4">"</div>
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-primary/10 p-1 mb-5 overflow-hidden group-hover:border-primary/40 transition-colors duration-500">
                <img src={t.photo} alt={t.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h4 className="font-bold text-lg mb-3 text-on-surface">{t.name}</h4>
              <p className="text-base text-on-surface-variant leading-relaxed italic">{t.quote}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[800px] mx-auto py-16 px-4 sm:px-8">
        <div className="bg-surface-container-low p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-on-surface-variant text-sm mb-8">Get notified of seasonal specials and new combos first.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3.5 rounded-full border border-outline-variant bg-white w-full sm:min-w-[260px] focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button className="bg-secondary text-white px-7 py-3.5 rounded-full font-bold shadow-md hover:brightness-110 transition-all text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="w-full py-8 px-4 border-t border-outline-variant/30 text-center text-sm text-on-surface-variant">
        <p>© 2024 Berry De Lacreme. All rights reserved.</p>
      </footer>

      {/* ── Mobile floating cart button ─────────────────────────────────────── */}
      {totalQty > 0 && (
        <button
          onClick={() => setMobileCartOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-40 flex items-center gap-2 bg-secondary text-white px-6 py-3.5 rounded-full font-bold shadow-[0_8px_24px_rgba(59,123,50,0.4)] hover:brightness-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-xl">shopping_bag</span>
          {totalQty} item{totalQty > 1 ? 's' : ''} — GH₵{subtotal}
        </button>
      )}
    </div>
  );
}
