import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, setCartOpen, updateQuantity, removeFromCart, clearCart, cartCount } = useCart();

  const getWhatsAppCartEnquiry = () => {
    let itemsText = '';
    cartItems.forEach((item, index) => {
      itemsText += `\n${index + 1}. *${item.product.brand} ${item.product.name}*\n   - Size: ${item.size}\n   - Quantity: ${item.quantity} pc${item.quantity > 1 ? 's' : ''}`;
    });

    const text = encodeURIComponent(
      `Hello Debnath Sanitary & Hardware!\n\nI would like to request a quotation for the following items from your catalogue:\n${itemsText}\n\n*Total Quantity:* ${cartCount} item${cartCount > 1 ? 's' : ''}\n\nCould you please check availability and share a quote for these items?\n\nThank you!`
    );
    return `https://wa.me/919832194842?text=${text}`;
  };

  // Drawer animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 28 },
    },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          
          {/* Backdrop Overlay */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-neutral-dark/30 backdrop-blur-xs"
          />

          {/* Sliding Cart Panel */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-cool flex items-center justify-between bg-primary text-white">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5" />
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider">
                  Your Enquiry Cart ({cartCount})
                </h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-none">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 p-4 rounded-xl border border-neutral-cool bg-neutral-cool/20 hover:border-primary/10 transition-colors"
                  >
                    {/* Icon visual */}
                    <div className="w-16 h-16 bg-white rounded-lg border border-neutral-cool flex items-center justify-center flex-shrink-0 p-1">
                      <div className="scale-75">{item.product.icon}</div>
                    </div>

                    {/* Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-display font-bold text-xs text-primary uppercase leading-tight line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-neutral-dark/40 hover:text-red-500 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[8px] font-black text-accent uppercase bg-white px-2 py-0.5 rounded-full border border-neutral-cool shadow-xs">
                            {item.product.brand}
                          </span>
                          <span className="text-[9px] font-bold text-neutral-dark/50">
                            Size: {item.size}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-neutral-cool bg-white rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="p-1 px-2 text-neutral-dark/70 hover:text-primary transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black px-2.5 text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="p-1 px-2 text-neutral-dark/70 hover:text-primary transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[10px] font-bold text-neutral-dark/60">
                          {item.product.priceRange.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-16 text-center select-none">
                  <ShoppingBag className="w-12 h-12 text-neutral-dark/20 mb-4" />
                  <h4 className="font-display font-extrabold text-sm text-primary uppercase">Your Cart is Empty</h4>
                  <p className="font-sans text-xs text-neutral-dark/65 max-w-[240px] mt-1.5 font-light leading-relaxed">
                    Browse the Pipeline & Fittings catalogue and add products to compile your quotation request.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-6 bg-primary hover:bg-primary-hover text-white font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-cool bg-neutral-cool/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-primary select-none">
                  <span>Total Items in Enquiry</span>
                  <span className="text-sm font-black">{cartCount} Products</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {/* Checkout via WhatsApp */}
                  <a
                    href={getWhatsAppCartEnquiry()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs tracking-wider uppercase py-4 rounded-xl active:scale-[0.98] transition-all duration-200 shadow-md shadow-green-500/10 cursor-pointer text-center"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Quote to WhatsApp</span>
                  </a>

                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    className="w-full text-center text-[10px] font-bold text-neutral-dark/50 hover:text-red-500 transition-colors py-2 cursor-pointer uppercase tracking-wider"
                  >
                    Clear All Items
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
