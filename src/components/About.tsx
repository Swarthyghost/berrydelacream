import { MapPin, Smile, Leaf, Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function About() {
  const highlights = [
    {
      title: "Locally Sourced",
      desc: "We pick the juiciest mangoes, pure forest honey, and spicy ginger straight from our local market suppliers in Accra.",
      icon: MapPin,
      bg: "bg-amber-50 text-amber-700"
    },
    {
      title: "100% Preservative Free",
      desc: "Guaranteed high quality ingredients with absolute zero color dyes, artificial thickeners, or chemical additives.",
      icon: Leaf,
      bg: "bg-emerald-50 text-emerald-700"
    },
    {
      title: "Churned Daily",
      desc: "Every batch of strawberry swirl and fresh soursop yogurt parfaits is hand-whipped and cold-pressed every single morning.",
      icon: Smile,
      bg: "bg-rose-50 text-rose-700"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Absolute Decorative Circles */}
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Images Grid Block representing Ghana kitchen vibes */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-md aspect-square border border-berry-pink/20 bg-berry-pink/10">
                  <img 
                    src="/src/assets/images/mango.jpg" 
                    alt="Tropical vibe fruits" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md aspect-[3/4] border border-berry-pink/20 bg-berry-pink/10">
                  <img 
                    src="/src/assets/images/perfait.jpg" 
                    alt="Artisan kitchen strawberry swirl" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden shadow-md aspect-[3/4] border border-berry-pink/20 bg-berry-pink/10">
                  <img 
                    src="/src/assets/images/bestseller.jpg" 
                    alt="Berry Blast Yoghurt details" 
                    className="w-full h-full object-cover font-sans"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md aspect-square border border-berry-pink/20 bg-berry-pink/10">
                  <img 
                    src="/src/assets/images/watermelon.jpg" 
                    alt="Accra gold mango desserts" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Floating Brand heart tag */}
            <div className="absolute -bottom-6 -right-3 bg-white/10 backdrop-blur-lg text-white p-5 rounded-3xl shadow-2xl border border-white/40 select-none hidden sm:block max-w-[180px]">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-400 fill-rose-400 animate-pulse" />
                <span className="font-serif font-black text-sm text-cream-white">Made with Pure Love</span>
              </div>
              <p className="text-[10px] text-zinc-300 mt-1">100% wholesome cow dairy and vegan options.</p>
            </div>
          </div>

          {/* Core Story copy content */}
          <div className="space-y-6 text-center lg:text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
              ✦ Discover Our Legacy ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black italic text-berry-purple leading-[1.15]">
              Accra&apos;s Premium Handcrafted Dessert Brand
            </h2>
            <div className="h-1 w-20 bg-berry-pink mx-auto lg:mx-0 rounded-full"></div>
            
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-sans">
              Founded under the bright tropical sun of <strong>Accra, Ghana</strong>, Berry De Lacream was born out of a desire to create genuinely healthy, delicious, and premium desserts. We combine state-of-the-art slow churning with fresh farm dairy and hand-selected tropical fruits.
            </p>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              We never use powdered mixes or synthetic thickeners. Our berries are cleaned, washed, and reduced directly by artisans; our soursop is cold squeezed, and our ginger is cold-pressed to release natural healing compounds. We treat every order as a personal invitation to spread joy across Ghana.
            </p>

            {/* Micro Highlights widgets */}
            <div className="space-y-4 pt-4">
              {highlights.map((item, id) => {
                const Icon = item.icon;
                return (
                  <div key={id} className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                    <div className={`p-2.5 rounded-xl ${item.bg} flex-shrink-0 mt-0.5`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-berry-purple text-sm sm:text-base">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-lg">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Customer Reviews/Testimonials Sub-section */}
        <div className="mt-24 pt-16 border-t border-berry-pink/15">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-black italic text-berry-purple">Loved by Dessert Fans</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Read real stories from our regular customers ordering in neighborhood circles across Accra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx}
                className="bg-cream-white/50 p-6 rounded-2.5xl border border-berry-pink/15 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex items-center space-x-1 text-amber-500 mb-3.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 font-sans italic text-xs sm:text-sm leading-relaxed">&ldquo;{t.comment}&rdquo;</p>
                </div>
                
                <div className="mt-6 pt-3 border-t border-berry-pink/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-berry-purple block">{t.name}</span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold block bg-emerald-50 px-2 py-0.5 rounded-full mt-1 w-max">
                      📍 {t.location}
                    </span>
                  </div>
                  <span className="text-2xl filter saturate-75">🍓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
