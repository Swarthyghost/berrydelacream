import { MessageSquare, Clock, MapPin, Phone, Instagram, Send, Star, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactProps {
  onOrderGeneral: () => void;
  whatsappUrl: string;
}

export default function Contact({ onOrderGeneral, whatsappUrl }: ContactProps) {
  const deliveryAreas = [
    { name: "East Legon", time: "20-30 mins" },
    { name: "Airport Residential", time: "25-35 mins" },
    { name: "Osu & Cantonments", time: "30-40 mins" },
    { name: "Labone & Roman Ridge", time: "30-45 mins" },
    { name: "Dzorwulu / Spintex Area", time: "40-55 mins" },
    { name: "Other Accra Districts", time: "Same Day Dispatch" }
  ];

  return (
    <section id="contact" className="py-20 bg-cream-white relative overflow-hidden">
      {/* Dynamic Background Circle decorations */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-fresh-green/10 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Delivery rates list */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-[#4CAF78] uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 inline-flex items-center space-x-1.5 self-center lg:self-start">
              <Compass className="h-3.5 w-3.5 text-fresh-green animate-spin" style={{ animationDuration: '8s' }} />
              <span>We deliver across Accra, Ghana</span>
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black italic text-berry-purple leading-[1.1] text-center lg:text-left">
              Get Cold Treats Hand-Delivered in Record Time
            </h2>
            
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-center lg:text-left">
              We pack our dessert cartons with deep-chill ice gel packs to guarantee your mango cups, strawberry treats, and yogurt parfaits arrive perfectly frozen and chilled even in the Accra heat.
            </p>

            {/* Neighborhood Deliver Grid cards */}
            <div className="bg-white rounded-3xl p-6 border border-berry-pink/20 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-base sm:text-lg text-berry-purple flex items-center space-x-2 border-b border-berry-pink/15 pb-2">
                <span>🛵 Accra Delivery Estimates</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {deliveryAreas.map((area, id) => (
                  <div key={id} className="bg-cream-white p-3 rounded-xl border border-berry-pink/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-berry-purple">{area.name}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                      ⏱ {area.time}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-sans italic text-center sm:text-left">
                * Real dispatch times vary depending on weather conditions or traffic circles. Delivers from central kitchen.
              </p>
            </div>
          </div>

          {/* Contact Box Options */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border-2 border-berry-pink/35 shadow-xl relative text-center">
              
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-fresh-green text-cream-white px-5 py-2 rounded-full shadow-lg border border-white/10 font-bold text-xs tracking-wider flex items-center space-x-1 uppercase animate-bounce">
                <Star className="h-3.5 w-3.5 fill-white" />
                <span>Instant Reply Active</span>
              </div>

              <div className="space-y-6 pt-2">
                <span className="text-3xl sm:text-4xl">🍹</span>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black italic text-berry-purple">Have Custom Event Requests?</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                    We host customizable ice cream stalls, juices punch stations, and dessert bars for local weddings, birthdays, and corporate gigs in Ghana.
                  </p>
                </div>

                {/* Direct info list */}
                <div className="space-y-3.5 max-w-xs mx-auto py-2">
                  <div className="flex items-center space-x-3 text-left bg-cream-white p-3.5 rounded-2xl border border-berry-pink/10 text-xs sm:text-sm text-gray-700">
                    <MapPin className="h-5 w-5 text-berry-purple flex-shrink-0" />
                    <span className="font-medium">Osu Badu Street, East Legon, Accra</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-left bg-cream-white p-3.5 rounded-2xl border border-berry-pink/10 text-xs sm:text-sm text-gray-700">
                    <Phone className="h-5 w-5 text-berry-purple flex-shrink-0" />
                    <span className="font-medium font-mono">+233 550 30 3030</span>
                  </div>

                  <div className="flex items-center space-x-3 text-left bg-cream-white p-3.5 rounded-2xl border border-berry-pink/10 text-xs sm:text-sm text-gray-700">
                    <Clock className="h-5 w-5 text-berry-purple flex-shrink-0" />
                    <span className="font-medium">Mon - Sun: 9:00 AM - 10:00 PM</span>
                  </div>
                </div>

                {/* Big WhatsApp CTA Action */}
                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center space-x-2 bg-fresh-green hover:bg-emerald-600 text-white font-bold py-4 rounded-2.5xl shadow-lg shadow-fresh-green/20 hover:scale-[1.01] transform transition duration-200 select-none cursor-pointer"
                    id="contact-whatsapp-chat-btn"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Chat with Us on WhatsApp</span>
                  </a>
                </div>

                {/* Instagram placeholder link */}
                <div className="flex items-center justify-center space-x-2 pt-2 text-xs font-semibold text-stone-500">
                  <Instagram className="h-4 w-4 text-rose-500" />
                  <span>Instagram:</span>
                  <a 
                    href="https://instagram.com/berrydelacream" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-berry-purple hover:underline"
                  >
                    @berrydelacream
                  </a>
                </div>

              </div>
              
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
