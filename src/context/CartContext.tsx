import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  sizes: string[];
  specs: string[];
  priceRange: string;
  icon: React.ReactNode;
}

export interface CartItem {
  product: ProductItem;
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: ProductItem, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}
export const products: ProductItem[] = [
  {
    id: 'p1',
    name: 'CPVC SDR 11 Pressure Pipe',
    category: 'CPVC Pipes',
    brand: 'SUPREME',
    sizes: ['1/2"', '3/4"', '1"', '1.5"', '2"'],
    specs: ['SDR 11 Pressure Rated', 'Max Temp: 82°C', 'Lead Free & Non-Toxic'],
    priceRange: '₹220 - ₹1,450 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-orange-500 fill-none" stroke="currentColor" strokeWidth="2">
        {/* CPVC Pipe Vector */}
        <rect x="15" y="42" width="70" height="16" rx="2" className="fill-orange-100 stroke-orange-500" />
        <line x1="25" x2="25" y1="42" y2="58" strokeDasharray="2,2" />
        <line x1="75" x2="75" y1="42" y2="58" strokeDasharray="2,2" />
        {/* Accent stripes */}
        <line x1="15" x2="85" y1="47" y2="47" stroke="#E11B22" strokeWidth="1.5" />
        <line x1="15" x2="85" y1="53" y2="53" stroke="#0066CC" strokeWidth="0.75" />
        <text x="50" y="32" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0F3A70" stroke="none">CPVC SDR 11</text>
      </svg>
    )
  },
  {
    id: 'p2',
    name: 'UPVC 90-Degree Elbow',
    category: 'UPVC Fittings',
    brand: 'SUPREME',
    sizes: ['1/2"', '3/4"', '1"', '2"', '3"'],
    specs: ['Schedule 80 Heavy Wall', 'Solvent Welded Joint', 'Zero Corrosion'],
    priceRange: '₹45 - ₹380 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-blue-600 fill-none" stroke="currentColor" strokeWidth="2.5">
        {/* Elbow Fitting Vector */}
        <path d="M 25 35 L 50 35 C 65 35 75 45 75 60 L 75 75" strokeLinecap="round" className="fill-blue-50/50" />
        <path d="M 15 35 L 15 20 M 15 20 L 35 20 M 35 20 L 35 35" />
        <path d="M 75 85 L 60 85 M 60 85 L 60 65 M 60 65 L 75 65" />
        <path d="M 35 35 C 35 45 45 55 55 55 L 60 55" />
        <text x="50" y="87" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">SCH 80 ELBOW</text>
      </svg>
    )
  },
  {
    id: 'p3',
    name: 'Heavy-Duty Brass Ball Valve',
    category: 'Valves & Controls',
    brand: 'FINOLEX',
    sizes: ['1/2"', '3/4"', '1"', '1.5"', '2"'],
    specs: ['Forged Brass Body', 'Full Port Flow', 'Blowout-Proof Stem'],
    priceRange: '₹380 - ₹2,100 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-amber-600 fill-none" stroke="currentColor" strokeWidth="2">
        {/* Brass Valve Vector */}
        <rect x="25" y="40" width="50" height="20" rx="3" className="fill-amber-100 stroke-amber-600" />
        <circle cx="50" cy="50" r="10" className="fill-amber-200 stroke-amber-600" />
        {/* Handle */}
        <rect x="46" y="15" width="8" height="20" rx="1" className="fill-red-500 stroke-red-600" />
        <rect x="20" y="12" width="30" height="8" rx="2" className="fill-red-500 stroke-red-600" />
        <circle cx="50" cy="25" r="3" className="fill-white stroke-red-600" />
        <text x="50" y="78" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">BRASS 1000 WOG</text>
      </svg>
    )
  },
  {
    id: 'p4',
    name: 'SWR Drainage Pipe (Ring Joint)',
    category: 'SWR Drainage',
    brand: 'SUPREME',
    sizes: ['75mm', '110mm', '160mm'],
    specs: ['Rubber Ring Socket Joint', 'UV Stabilized PVC', 'High Flow Efficiency'],
    priceRange: '₹420 - ₹2,800 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-gray-500 fill-none" stroke="currentColor" strokeWidth="2">
        {/* Drainage Pipe Vector */}
        <rect x="15" y="44" width="55" height="12" className="fill-gray-100 stroke-gray-500" />
        {/* Socket bell end */}
        <path d="M 70 41 L 85 41 L 85 59 L 70 59 Z" className="fill-gray-200 stroke-gray-600" />
        <rect x="75" y="38" width="5" height="24" rx="1.5" className="fill-blue-500/20 stroke-blue-500" />
        <text x="50" y="32" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0F3A70" stroke="none">SWR SOIL & WASTE</text>
      </svg>
    )
  },
  {
    id: 'p5',
    name: 'UPVC Equal Tee Fitting',
    category: 'UPVC Fittings',
    brand: 'FINOLEX',
    sizes: ['1/2"', '3/4"', '1"', '1.5"', '2"', '3"'],
    specs: ['Lead-Free UPVC Compound', 'Equal Outlet Connect', 'Chemical Resistant'],
    priceRange: '₹55 - ₹480 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-blue-600 fill-none" stroke="currentColor" strokeWidth="2.5">
        {/* Tee Fitting Vector */}
        <path d="M 20 40 L 80 40 L 80 60 L 60 60 L 60 80 L 40 80 L 40 60 L 20 60 Z" className="fill-blue-50/50" />
        <line x1="30" y1="40" x2="30" y2="60" strokeDasharray="2,2" />
        <line x1="70" y1="40" x2="70" y2="60" strokeDasharray="2,2" />
        <line x1="40" y1="70" x2="60" y2="70" strokeDasharray="2,2" />
        <text x="50" y="28" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">EQUAL TEE</text>
      </svg>
    )
  },
  {
    id: 'p6',
    name: 'CPVC Transition Union',
    category: 'CPVC Pipes',
    brand: 'FINOLEX',
    sizes: ['3/4"', '1"', '1.5"', '2"'],
    specs: ['Threaded Brass Inserts', 'Friction-Free Seals', 'Easy Maintenance Decouple'],
    priceRange: '₹140 - ₹620 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-orange-500 fill-none" stroke="currentColor" strokeWidth="2">
        {/* Union fitting Vector */}
        <rect x="20" y="44" width="20" height="12" className="fill-orange-50" />
        <rect x="60" y="44" width="20" height="12" className="fill-orange-50" />
        {/* Center union collar */}
        <rect x="40" y="36" width="20" height="28" rx="2" className="fill-amber-100 stroke-amber-600" />
        <line x1="46" y1="36" x2="46" y2="64" />
        <line x1="54" y1="36" x2="54" y2="64" />
        <text x="50" y="28" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">TRANSITION UNION</text>
      </svg>
    )
  },
  {
    id: 'b1',
    name: 'Roca Thesis Basin Mixer Faucet',
    category: 'Premium Faucets',
    brand: 'ROCA',
    sizes: ['Standard'],
    specs: ['Premium Chrome Finish', 'EcoSmart Flow Control', 'Ceramic Disc Technology'],
    priceRange: '₹12,400 - ₹18,500 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-blue-600 fill-none" stroke="currentColor" strokeWidth="2">
        {/* Roca Faucet Vector */}
        <path d="M 30 75 L 30 45 C 30 35, 40 30, 60 30 L 65 30 L 65 38 L 60 38 C 48 38, 45 42, 45 48 L 45 75" className="fill-blue-50/50" />
        <rect x="25" y="75" width="25" height="5" rx="1.5" className="fill-gray-200 stroke-gray-500" />
        {/* Faucet spout end */}
        <rect x="58" y="30" width="7" height="8" rx="1" className="fill-gray-300 stroke-gray-500" />
        {/* Single handle lever */}
        <path d="M 30 40 L 15 35 M 30 40 L 30 35" strokeWidth="3" strokeLinecap="round" />
        {/* Water droplet */}
        <path d="M 61.5 48 C 61.5 48, 59 52, 59 55 C 59 57, 60 58.5, 61.5 58.5 C 63 58.5, 64 57, 64 55 C 64 52, 61.5 48, 61.5 48 Z" className="fill-blue-400 stroke-blue-500" strokeWidth="1" />
        <text x="50" y="87" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">ROCA THESIS</text>
      </svg>
    )
  },
  {
    id: 'b2',
    name: 'Parryware Single Lever Concealed Diverter',
    category: 'Diverters & Valves',
    brand: 'PARRYWARE',
    sizes: ['40mm', '45mm'],
    specs: ['High Flow Rate', 'Smooth Lever Operation', 'Durable Brass Body'],
    priceRange: '₹3,200 - ₹5,800 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-gray-700 fill-none" stroke="currentColor" strokeWidth="2">
        {/* Diverter plate */}
        <rect x="30" y="20" width="40" height="60" rx="6" className="fill-gray-50 stroke-gray-400" />
        {/* Central dial */}
        <circle cx="50" cy="40" r="14" className="fill-gray-150 stroke-gray-500" />
        {/* Knob / handle */}
        <rect x="47" y="36" width="6" height="24" rx="2" className="fill-gray-300 stroke-gray-600" />
        {/* Small selector button */}
        <circle cx="50" cy="65" r="5" className="fill-gray-200 stroke-gray-500" />
        <circle cx="50" cy="65" r="2" className="fill-red-500 stroke-red-600" />
        <text x="50" y="90" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">CONCEALED</text>
      </svg>
    )
  },
  {
    id: 'b3',
    name: 'Bathsense Rain Shower (Overhead)',
    category: 'Showers & Rails',
    brand: 'BATHSENSE',
    sizes: ['8"', '10"', '12"'],
    specs: ['Self-Cleaning Nozzles', 'Air-injection Technology', 'Ultra-Slim Profile'],
    priceRange: '₹4,500 - ₹9,200 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-blue-500 fill-none" stroke="currentColor" strokeWidth="2">
        {/* Shower pipe */}
        <path d="M 50 15 L 50 25 M 50 15 L 25 15" strokeLinecap="round" />
        {/* Shower head plate (ultra slim) */}
        <rect x="25" y="25" width="50" height="5" rx="1" className="fill-gray-200 stroke-gray-500" />
        {/* Water streams */}
        <line x1="30" y1="35" x2="30" y2="55" strokeDasharray="2,3" strokeLinecap="round" />
        <line x1="38" y1="35" x2="38" y2="60" strokeDasharray="2,3" strokeLinecap="round" />
        <line x1="46" y1="35" x2="46" y2="65" strokeDasharray="2,3" strokeLinecap="round" />
        <line x1="54" y1="35" x2="54" y2="65" strokeDasharray="2,3" strokeLinecap="round" />
        <line x1="62" y1="35" x2="62" y2="60" strokeDasharray="2,3" strokeLinecap="round" />
        <line x1="70" y1="35" x2="70" y2="55" strokeDasharray="2,3" strokeLinecap="round" />
        <text x="50" y="85" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">RAIN SHOWER</text>
      </svg>
    )
  },
  {
    id: 'b4',
    name: 'Ess Ess Single Lever Basin Mixer',
    category: 'Premium Faucets',
    brand: 'ESS ESS',
    sizes: ['Standard', 'Extended Body'],
    specs: ['Ergonomic Design', 'Quick-Clean Aerator', 'Mirror Look plating'],
    priceRange: '₹2,800 - ₹5,400 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-sky-600 fill-none" stroke="currentColor" strokeWidth="2">
        {/* Ess Ess Faucet Vector */}
        <path d="M 35 75 L 35 40 C 35 32, 45 32, 55 35 L 60 37 M 35 48 C 42 48, 48 44, 48 40" className="fill-sky-50/50" />
        <rect x="28" y="75" width="24" height="4" rx="1" className="fill-gray-100 stroke-gray-500" />
        {/* Spout */}
        <line x1="58" y1="36.5" x2="59" y2="44" strokeWidth="2.5" />
        {/* Handle */}
        <path d="M 35 32 L 20 28" strokeWidth="3" strokeLinecap="round" />
        <text x="50" y="87" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">ESS ESS MIXER</text>
      </svg>
    )
  },
  {
    id: 'b5',
    name: 'Roca concealed flush valve plate',
    category: 'Diverters & Valves',
    brand: 'ROCA',
    sizes: ['Standard'],
    specs: ['Dual Flush Action', 'Anti-Fingerprint Coating', 'Slim Design Profile'],
    priceRange: '₹1,800 - ₹3,500 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-gray-600 fill-none" stroke="currentColor" strokeWidth="2">
        {/* Rectangular plate */}
        <rect x="20" y="30" width="60" height="40" rx="4" className="fill-gray-50 stroke-gray-400" />
        {/* Dual buttons */}
        {/* Left button (Half Flush) */}
        <path d="M 43 50 A 10 10 0 0 0 35 40 L 35 60 A 10 10 0 0 0 43 50 Z" className="fill-gray-200 stroke-gray-500" />
        {/* Right button (Full Flush) */}
        <circle cx="56" cy="50" r="10" className="fill-gray-100 stroke-gray-400" />
        <circle cx="56" cy="50" r="6" className="fill-white stroke-gray-500" />
        <text x="50" y="82" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">DUAL FLUSH PLATE</text>
      </svg>
    )
  },
  {
    id: 'b6',
    name: 'Bathsense Hand Health Faucet Spray',
    category: 'Health Faucets',
    brand: 'BATHSENSE',
    sizes: ['1.2m Hose', '1.5m Hose'],
    specs: ['High-grade ABS Body', 'Anti-Tangle Stainless Hose', 'Ergonomic Trigger'],
    priceRange: '₹950 - ₹1,800 / pc',
    icon: (
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-blue-500 fill-none" stroke="currentColor" strokeWidth="2">
        {/* Spray Gun Head */}
        <path d="M 45 25 C 45 25, 48 20, 56 20 C 64 20, 68 25, 68 32 C 68 36, 64 38, 60 38 L 45 38 Z" className="fill-gray-100 stroke-gray-500" />
        {/* Spray nozzles surface */}
        <line x1="68" y1="26" x2="68" y2="31" strokeWidth="2.5" />
        {/* Handle */}
        <rect x="42" y="38" width="10" height="28" rx="2" className="fill-gray-100 stroke-gray-500" transform="rotate(-15 47 52)" />
        {/* Trigger lever */}
        <path d="M 38 42 L 35 55" strokeWidth="3" strokeLinecap="round" />
        {/* Flexible Hose */}
        <path d="M 47 65 C 47 75, 60 80, 70 75" strokeWidth="4" strokeLinecap="round" strokeDasharray="1,1.5" className="stroke-gray-400" />
        <text x="50" y="90" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0F3A70" stroke="none">HEALTH FAUCET</text>
      </svg>
    )
  }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('debnath_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart) as { id: string; size: string; quantity: number }[];
        const reconstituted = parsed.map(item => {
          const product = products.find(p => p.id === item.id);
          if (!product) return null;
          return { product, size: item.size, quantity: item.quantity };
        }).filter((item): item is CartItem => item !== null);
        setCartItems(reconstituted);
      } catch (err) {
        console.error("Failed to parse cart data:", err);
      }
    }
  }, []);

  // Sync cart to localStorage
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    const toSave = items.map(item => ({
      id: item.product.id,
      size: item.size,
      quantity: item.quantity
    }));
    localStorage.setItem('debnath_cart', JSON.stringify(toSave));
  };

  const addToCart = (product: ProductItem, size: string) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { product, size, quantity: 1 }]);
    }
    // Automatically open the cart drawer when adding an item
    setCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    const updated = cartItems.filter(
      (item) => !(item.product.id === productId && item.size === size)
    );
    saveCart(updated);
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    const updated = cartItems.map((item) => {
      if (item.product.id === productId && item.size === size) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
