import { useState } from 'react';
import { Search, Sparkles, ShoppingCart, MessageSquare, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface MenuProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onInstantOrder: (p: Product) => void;
}

type CategoryFilter = 'all' | 'ice-cream' | 'yoghurt' | 'juice';

export default function Menu({ products, onAddToCart, onInstantOrder }: MenuProps) {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: { id: CategoryFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'All Treats', icon: '✨' },
    { id: 'ice-cream', label: 'Ice Cream', icon: '🍦' },
    { id: 'yoghurt', label: 'Yoghurt', icon: '🥛' },
    { id: 'juice', label: 'Fresh Juices', icon: '🥤' }
  ];

  // Filtering products based on tab and searching query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeTab === 'all' || product.category === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-20 bg-white relative">
      {/* Dynamic Background decor */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-berry-pink/20 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#6B2D5E] uppercase bg-berry-pink/35 px-3 py-1 rounded-full border border-berry-pink/50">
            ✦ Refreshment Emporium ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black italic text-berry-purple mt-3">
            What&apos;s Cooking?
          </h2>
          <div className="h-1 w-20 bg-berry-pink mx-auto my-4 rounded-full"></div>
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
            Freshly prepared daily in the heart of Accra. Tap below to search or filter, and customize your dessert basket for immediate delivery.
          </p>
        </div>

        {/* Search & Tabs Controls Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-4 border-b border-berry-pink/15">
          
          {/* Category Tabs aligned with Bold Typography */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pill-tab cursor-pointer flex items-center gap-2 ${
                    active 
                      ? 'bg-berry-purple text-cream-white border-berry-purple shadow-sm' 
                      : 'border-berry-purple/40 text-berry-purple hover:bg-berry-pink/20 hover:border-berry-purple'
                  }`}
                  id={`tab-${tab.id}`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flavors, fruits..."
              className="w-full bg-cream-white text-gray-800 placeholder-gray-400 pl-11 pr-4 py-3 rounded-2xl border-2 border-berry-purple/40 focus:outline-none focus:border-berry-purple transition text-sm font-semibold"
              id="product-search-input"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-berry-purple/60" />
          </div>

        </div>

        {/* Grid of Menus Products */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              id="products-grid-list"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={product.id}
                  className="product-card p-4 rounded-[32px] hover:shadow-xl transition duration-300 flex flex-col justify-between group"
                >
                  
                  {/* Rounded Interior Image Frame Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-berry-pink/20 rounded-[24px] border border-berry-pink/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                    />
                    
                    {/* Badge Overlay */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-berry-purple text-[10px] font-bold tracking-wide px-3 py-1 rounded-full shadow-sm border border-berry-pink flex items-center space-x-1">
                        <Flame className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
                        <span>{product.badge}</span>
                      </span>
                    )}

                    {/* Simple Category Icon Pill */}
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs rounded-full h-8 w-8 flex items-center justify-center text-sm shadow-xs border border-white">
                      {product.category === 'ice-cream' ? '🍦' : product.category === 'yoghurt' ? '🥛' : '🥤'}
                    </span>
                  </div>

                  {/* Card Content details */}
                  <div className="pt-4 flex-grow flex flex-col justify-between px-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-lg font-black text-berry-purple group-hover:text-amber-800 transition leading-tight">
                          {product.name}
                        </h3>
                        <span className="text-fresh-green font-bold text-sm tracking-wide self-start block flex-shrink-0 ml-2">
                          ₵{product.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-[11px] sm:text-[12px] mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* CTA section aligned to bottom bar */}
                    <div className="mt-4 pt-3 border-t border-berry-pink/15 flex flex-col space-y-2">
                      <div className="flex flex-col xs:flex-row sm:grid sm:grid-cols-2 gap-2">
                        
                        {/* Instant direct whatsapp order action */}
                        <button
                          onClick={() => onInstantOrder(product)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-fresh-green text-white hover:bg-emerald-600 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow transition duration-200 cursor-pointer w-full"
                          title="Instant single-item order on WhatsApp"
                          id={`order-instant-${product.id}`}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Quick Order</span>
                        </button>
                        
                        {/* Add to combined cart basket action */}
                        <button
                          onClick={() => onAddToCart(product)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-white border border-berry-purple text-berry-purple hover:bg-berry-purple hover:text-white py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer w-full"
                          title="Add to shared order basket"
                          id={`add-cart-${product.id}`}
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>Add Bag</span>
                        </button>

                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty state graphic */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-cream-white rounded-3xl border-2 border-dashed border-berry-pink/30 max-w-md mx-auto"
              id="menu-empty-state"
            >
              <div className="text-4xl mb-3">🍨</div>
              <h4 className="font-serif text-lg font-bold text-berry-purple">No treats found</h4>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 px-4">
                We couldn&apos;t find matching products for &quot;{searchQuery}&quot;. Please try search terms like &quot;strawberry&quot;, &quot;ginger&quot;, or &quot;yoghurt&quot;!
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="mt-4 text-xs font-bold text-berry-purple underline hover:text-amber-800"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
