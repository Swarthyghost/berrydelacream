import { Trash2, Plus, Minus, X, MessageSquare, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface WhatsAppCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  checkoutUrl: string;
}

export default function WhatsAppCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  checkoutUrl
}: WhatsAppCartProps) {
  
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Sliding Side Drawer Box */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream-white shadow-2xl z-50 border-l border-berry-pink/30 flex flex-col justify-between"
            id="cart-drawer-panel"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-berry-pink/20 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-berry-pink/20 rounded-xl text-berry-purple">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-berry-purple">Dessert Basket</h3>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">Your Custom Order slip</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition"
                aria-label="Close cart"
                id="close-cart-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Middle List items body */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 no-scrollbar bg-cream-white/50">
              {cartItems.length > 0 ? (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-berry-pink/10">
                    <span className="text-xs font-mono text-gray-500 font-semibold uppercase">Selected Treats ({cartItems.length})</span>
                    <button
                      onClick={onClearCart}
                      className="text-xs text-red-500 hover:text-red-700 font-bold transition flex items-center space-x-1"
                      id="clear-cart-items-btn"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Clear Basket</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div 
                        key={item.product.id}
                        className="bg-white p-3.5 rounded-2xl border border-berry-pink/10 flex items-center justify-between shadow-xs hover:border-berry-pink/35 transition"
                      >
                        {/* Miniature product photo preview */}
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-berry-pink/10 flex-shrink-0 mr-3 border border-berry-pink/10">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Title, price breakdown */}
                        <div className="flex-grow min-w-0 pr-2">
                          <span className="font-bold text-sm text-berry-purple block truncate">{item.product.name}</span>
                          <span className="text-xs text-amber-700 font-serif font-semibold">₵{item.product.price.toFixed(2)} each</span>
                        </div>

                        {/* Quantity manipulators */}
                        <div className="flex items-center space-x-2.5 flex-shrink-0">
                          <div className="flex items-center bg-cream-white border border-berry-pink/30 rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 text-berry-purple hover:bg-berry-pink/20 rounded"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-berry-purple">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 text-berry-purple hover:bg-berry-pink/20 rounded"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition"
                            title="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp Custom Template message Preview notice box */}
                  <div className="bg-emerald-50 border border-emerald-500/20 rounded-2xl p-4 mt-6">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase font-mono tracking-widest block mb-2">
                      💬 Pre-filled WhatsApp Slip Format
                    </span>
                    <div className="bg-white/80 rounded-xl p-3 text-xs text-gray-700 font-mono space-y-1 block max-h-32 overflow-y-auto border border-emerald-500/10 whitespace-pre-line no-scrollbar leading-relaxed">
                      {`Hi Berry De Lacream! I'd like to place an order:
${cartItems.map(item => `• ${item.quantity}x ${item.product.name} (₵${(item.product.price * item.quantity).toFixed(2)})`).join("\n")}

Total: ₵${totalPrice.toFixed(2)}
Please confirm availability and delivery to [location].`}
                    </div>
                  </div>
                </>
              ) : (
                /* Empty Slip Illustration */
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="text-5xl animate-bounce duration-1000">🍨</div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-berry-purple">Your Basket is Empty</h4>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-sm">
                      Accra&apos;s cold handcrafted treats are waiting! Add cream rolls, parfaits, or juices to building a lovely combined delivery list.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-berry-purple text-white hover:bg-amber-800 text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition"
                  >
                    Start Browsing
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-berry-pink/20 bg-white">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                    <span>Menu Items Churn:</span>
                    <span>₵{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                    <span>Accra Delivery:</span>
                    <span className="text-emerald-600 font-bold">Calculated on WhatsApp</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-base font-bold text-berry-purple">Grand Total:</span>
                    <span className="font-serif text-2xl font-black text-amber-700">₵{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-fresh-green hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-lg transition duration-200 select-none cursor-pointer"
                  id="checkout-cart-whatsapp-btn"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Send Order to WhatsApp (₵{totalPrice.toFixed(2)})</span>
                </a>
                
                <p className="text-[10px] text-gray-400 text-center mt-2 font-sans">
                  By clicking, your WhatsApp app will open with your pre-made slip to complete delivery scheduling.
                </p>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
