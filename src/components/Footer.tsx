import { MessageSquare, Instagram, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToHome: () => void;
  whatsappUrl: string;
  onAdminClick?: () => void;
}

export default function Footer({ onScrollToHome, whatsappUrl, onAdminClick }: FooterProps) {
  return (
    <footer className="bg-berry-purple text-cream-white/90 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-8 space-y-6 md:space-y-0">
          
          {/* Logo brand */}
          <div className="text-center md:text-left">
            <button
              onClick={onScrollToHome}
              className="flex items-center justify-center md:justify-start space-x-2 group cursor-pointer focus:outline-none"
              id="footer-logo-btn"
            >
              <span className="text-2xl">🍦</span>
              <span className="font-serif text-xl sm:text-2xl font-black text-white hover:text-berry-pink transition duration-200">
                Berry De Lacream
              </span>
            </button>
            <p className="text-xs text-rose-200 font-sans mt-1">Sweet moments, delivered straight across Accra.</p>
          </div>

          {/* Socials and Inquiry shortcuts */}
          <div className="flex items-center space-x-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white hover:scale-105 transition"
              aria-label="WhatsApp Contact"
            >
              <MessageSquare className="h-5 w-5" />
            </a>
            
            <a
              href="https://instagram.com/berry_de_lacreme"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white hover:scale-105 transition"
              aria-label="Instagram Profile"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-white/50 space-y-4 sm:space-y-0 text-center">
          <div>
            <p>© 2024 Berry De Lacream. All rights reserved.</p>
            <p className="text-[10px] text-zinc-400 mt-1 uppercase font-mono tracking-widest">Handcrafted in Accra, Ghana · Preservative-free</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 font-sans text-[11px]">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-400 fill-red-400 animate-pulse" />
              <span>in Accra, Ghana</span>
            </div>
            {onAdminClick && (
              <button 
                onClick={onAdminClick}
                className="text-white/20 hover:text-white/60 transition"
                title="Admin Login"
              >
                🔒
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
