import { BookOpen, MessageSquare, Truck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "1. Pick Your Treats",
      desc: "Browse our premium handcrafted ice cream scoops, layered yoghurt parfaits, and refreshing cold-pressed ginger juices.",
      icon: BookOpen,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
      avatar: "🍦"
    },
    {
      id: 2,
      title: "2. Order on WhatsApp",
      desc: "Click 'Order Now' or checkout your dessert bundle slip. Your custom list is pre-filled & drafted straight to our WhatsApp line.",
      icon: MessageSquare,
      iconColor: "text-fresh-green bg-emerald-50 border-emerald-200",
      avatar: "💬"
    },
    {
      id: 3,
      title: "3. Direct Home Delivery",
      desc: "Our dispatch riders sprint cold-packed treats right to your location in East Legon, Airport, Cantonments, Osu, or Accra wide.",
      icon: Truck,
      iconColor: "text-rose-600 bg-rose-50 border-rose-200",
      avatar: "🛵"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-cream-white relative border-y border-berry-pink/15">
      {/* Decorative floral/berry accent blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-berry-pink/20 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content copy */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
            ✦ Easy & Fast ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black italic text-berry-purple mt-2">
            How to Get Your Berry Cup
          </h2>
          <div className="h-1 w-20 bg-berry-pink mx-auto my-4 rounded-full"></div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            We operate a direct cottage kitchen in Accra. No complicated checkout apps needed — we use WhatsApp to keep delivery quotes instant and friendly.
          </p>
        </div>

        {/* Steps container grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                key={step.id}
                className="bg-white rounded-[2.5rem] p-8 border border-berry-pink/15 shadow-sm text-center flex flex-col items-center justify-between hover:shadow-lg hover:border-berry-pink/35 transition duration-300 relative group"
              >
                {/* Arrow connectors for desktop view */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-[28%] -right-7 transform -translate-y-1/2 z-20 pointer-events-none text-berry-purple/35 font-serif text-3xl animate-pulse">
                    ➔
                  </div>
                )}

                <div className="flex flex-col items-center space-y-4">
                  {/* Outer Icon circle */}
                  <div className={`p-5 rounded-2.5xl border-2 ${step.iconColor} relative flex items-center justify-center transform group-hover:scale-105 transition duration-300`}>
                    <Icon className="h-8 w-8 stroke-[1.75]" />
                    <span className="absolute -bottom-2 -right-2 text-xl filter drop-shadow">
                      {step.avatar}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-black italic text-berry-purple">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans px-2">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-1.5 text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                  <Heart className="h-3 w-3 text-red-400 fill-red-400 animate-pulse" />
                  <span>Fresh Accra Craft</span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
