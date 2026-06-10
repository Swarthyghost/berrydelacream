import { useState, useEffect } from 'react';
import { ShoppingBag, MessageSquare, Menu, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  whatsappUrl: string;
}

export default function Navbar({ cartItemCount, onOpenCart, whatsappUrl }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
    { name: "Locate Us", href: "#contact" },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-cream-white/90 backdrop-blur-md shadow-md border-b border-berry-pink/20 py-3" 
        : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Area */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleScrollTo("#home"); }}
            className="flex items-center space-x-2 group"
            id="brand-logo"
          >
            <div className="relative">
              <span className="text-2xl sm:text-3xl filter drop-shadow">🍦</span>
              <span className="absolute -top-1 -right-1 text-xs text-red-500 animate-bounce">🍓</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-berry-purple group-hover:text-amber-700 transition">
                Berry De <span className="font-serif italic font-extrabold text-red-400">Lacream</span>
              </span>
              <p className="text-[9px] font-mono tracking-widest text-emerald-600 font-bold uppercase">Accra&apos;s Finest</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 font-sans">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleScrollTo(item.href); }}
                className="text-berry-purple/80 hover:text-berry-purple font-medium text-sm transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-berry-purple transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action Buttons: Cart and WhatsApp */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Visual Flashy Order helper button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full text-berry-purple hover:bg-berry-pink/30 hover:scale-105 transition duration-200"
              aria-label="View Order Cart"
              id="view-cart-btn"
            >
              <div className="relative">
                <ShoppingBag className="h-6 w-6 stroke-[2]" />
                {cartItemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white font-mono font-bold text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-cream-white"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </div>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 bg-fresh-green text-white hover:bg-emerald-600 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow transition duration-200"
              id="desktop-whatsapp-cta"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Order on WhatsApp</span>
              <span className="inline sm:hidden">Order</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full text-berry-purple hover:bg-berry-pink/20 transition duration-200"
              aria-expanded={isOpen}
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream-white border-b border-berry-pink/20"
            id="mobile-drawer"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleScrollTo(item.href); }}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-berry-purple hover:bg-berry-pink/20"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-berry-pink/20 px-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 bg-fresh-green text-white hover:bg-emerald-600 py-3 rounded-xl font-semibold shadow text-center transition duration-200"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
