import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, MessageSquare, ArrowDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onOrderGeneral: () => void;
  onScrollToMenu: () => void;
}

const SLIDES = [
  {
    title: "Strawberry Swirl",
    subtitle: "Artisan Smooth Churn",
    desc: "Luxury fresh milk & cream churned slowly with a hand-reduced organic Accra strawberry glaze.",
    price: 45,
    tag: "Signature Dessert",
    image: "/src/assets/images/strawberry_swirl_1781116317405.png"
  },
  {
    title: "Berry Blast Parfait",
    subtitle: "Thick Probiotic Goodness",
    desc: "Rich greek-style whipped yoghurt, tiered with crunchy oats and fresh local woodland berries.",
    price: 50,
    tag: "Bestseller",
    image: "/src/assets/images/berry_blast_yoghurt_1781116347057.png"
  },
  {
    title: "Pineapple Ginger Press",
    subtitle: "Zesty & Refreshing Juice",
    desc: "Lively local Accra ginger pressed with juicy, organic pineapples. Restorative and pure.",
    price: 35,
    tag: "Fresh Juice",
    image: "/src/assets/images/fresh_juices_tropical_1781116363046.png"
  }
];

export default function Hero({ onOrderGeneral, onScrollToMenu }: HeroProps) {
  const [current, setCurrent] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section 
      id="home" 
      className="relative pt-24 sm:pt-28 pb-16 min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-berry-pink/60 via-cream-white to-cream-white border-b border-berry-pink/10"
    >
      {/* Absolute Decorative Blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-berry-pink/30 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Copy Box */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-center lg:text-left">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-berry-pink self-center lg:self-start shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-berry-purple animate-pulse" />
              <span className="text-xs font-semibold text-berry-purple tracking-wide uppercase font-sans">
                Handcrafted Daily in Accra, Ghana
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-serif text-4xl sm:text-6xl lg:text-[5.5rem] font-black leading-[0.9] text-berry-purple mb-3 tracking-tighter"
            >
              Handcrafted Treats <br/> Made with <span className="italic text-orange-500">Love</span> in Accra
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-gray-700 text-sm sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Order now & get cold-fresh desserts delivered straight to your door across Accra. Preservative-free, using local sunshine-infused ingredients.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <button
                onClick={onOrderGeneral}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-fresh-green hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-fresh-green/20 hover:scale-[1.02] transform transition duration-300"
                id="hero-whatsapp-order-btn"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Order on WhatsApp</span>
              </button>

              <button
                onClick={onScrollToMenu}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-berry-pink/10 border-2 border-berry-pink/60 text-berry-purple font-semibold px-8 py-4 rounded-2xl shadow-sm transition duration-300"
                id="hero-view-menu-btn"
              >
                <span>Browse Menu</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center justify-center lg:justify-start space-x-8 pt-4 text-xs font-mono text-gray-500"
            >
              <div>
                <span className="block text-lg font-bold text-berry-purple font-serif">100%</span>
                Natural Ingredients
              </div>
              <div className="border-l border-gray-300 h-8"></div>
              <div>
                <span className="block text-lg font-bold text-berry-purple font-serif">No</span>
                Artificial Preservatives
              </div>
              <div className="border-l border-gray-300 h-8"></div>
              <div>
                <span className="block text-lg font-bold text-berry-purple font-serif">Fast</span>
                Accra Wide Delivery
              </div>
            </motion.div>

          </div>

          {/* Slider Graphics Area - Signature Desserts */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="bg-white/40 p-3 sm:p-5 rounded-[2.5rem] border border-white/60 shadow-xl relative backdrop-blur-sm">
              
              {/* Floating Accent badges on active slide */}
              <div className="absolute -top-3 -right-3 bg-rose-500 text-white font-sans text-xs font-bold px-4 py-1.5 rounded-full shadow-md z-20 animate-pulse tracking-wide select-none">
                {SLIDES[current].tag}
              </div>

              {/* Inside Slider Card container */}
              <div className="bg-cream-white rounded-3xl p-5 sm:p-8 overflow-hidden relative min-h-[360px] sm:min-h-[420px] flex flex-col justify-between border border-berry-pink/20">
                
                {/* Back / Forward Controls */}
                <div className="absolute top-4 right-4 flex space-x-2 z-20">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-white/80 hover:bg-white text-berry-purple shadow hover:scale-105 transition"
                    aria-label="Previous Slide"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-white/80 hover:bg-white text-berry-purple shadow hover:scale-105 transition"
                    aria-label="Next Slide"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Animated Slide Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col md:grid md:grid-cols-2 gap-6 items-center flex-grow pt-4"
                  >
                    {/* Slide Image inside */}
                    <div className="relative w-full aspect-[4/3] rounded-2.5xl overflow-hidden shadow-md flex items-center justify-center bg-berry-pink/10 border border-berry-pink/20 md:order-2">
                      <img
                        src={SLIDES[current].image}
                        alt={SLIDES[current].title}
                        className="object-cover w-full h-full hover:scale-105 transition duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Slide Info inside */}
                    <div className="flex flex-col justify-center text-left md:order-1 space-y-2">
                      <span className="text-xs font-semibold text-rose-400 tracking-wider uppercase font-sans">
                        {SLIDES[current].subtitle}
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl font-black italic text-berry-purple leading-tight">
                        {SLIDES[current].title}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {SLIDES[current].desc}
                      </p>
                      <div className="pt-2 flex items-baseline space-x-2">
                        <span className="text-xs font-mono text-gray-500">Price:</span>
                        <span className="text-2xl font-bold font-serif text-amber-700">₵{SLIDES[current].price.toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dot Markers */}
                <div className="flex justify-center space-x-2 mt-4 z-20">
                  {SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === current ? "w-6 bg-berry-purple" : "w-2.5 bg-berry-purple/30"
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    ></button>
                  ))}
                </div>

              </div>
              
              {/* Sub-label under container slider */}
              <div className="text-center mt-3 text-[11px] font-mono text-berry-purple/70 font-semibold uppercase tracking-widest flex items-center justify-center space-x-1">
                <span>✦ Signature Dessert Showcase ✦</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
