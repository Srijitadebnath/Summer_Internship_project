/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  sizes: string[];
  specs: string[];
  priceRange: string;
  icon?: React.ReactNode;
  image?: string;
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
    name: 'Auto-Closing Push Pillar Tap',
    category: 'Premium Faucets',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/push_pillar_tap.png'
  },
  {
    id: 'b2',
    name: 'Chrome Wall-Mounted Bib Tap Faucet',
    category: 'Premium Faucets',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/wall_bib_tap.png'
  },
  {
    id: 'b3',
    name: 'Modern Bathroom Vanity Cabinet',
    category: 'Premium Faucets',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/vanity_cabinet_basin.png'
  },
  {
    id: 'b4',
    name: 'Stainless Steel Thermostatic Shower Panel',
    category: 'Showers & Rails',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/shower_panel_column.png'
  },
  {
    id: 'b5',
    name: 'Overhead Round Rain Shower Head',
    category: 'Showers & Rails',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/rain_shower.png'
  },
  {
    id: 'b6',
    name: 'Chrome Bidet Health Spray Gun Set',
    category: 'Health Faucets',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/bidet_health_spray.png'
  },
  {
    id: 'b7',
    name: 'Flexible Braided Connection Hose',
    category: 'Health Faucets',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/braided_hose.png'
  },
  {
    id: 'b8',
    name: 'Chrome Brass Angle Cock Valve',
    category: 'Diverters & Valves',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/angle_valve.png'
  },
  {
    id: 'b9',
    name: 'Chrome Extension Nipple Set',
    category: 'Diverters & Valves',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/extension_nipples.png'
  },
  {
    id: 'b10',
    name: 'Dual Flush Actuator Plate',
    category: 'Diverters & Valves',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/flush_actuator_plate.png'
  },
  {
    id: 'b11',
    name: 'Concealed Flush Tank Cistern',
    category: 'Diverters & Valves',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/concealed_flush_tank.png'
  },
  {
    id: 'b12',
    name: 'D-Shaped Soft-Close Commode Seat Cover',
    category: 'Diverters & Valves',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/d_shaped_seat_cover.png'
  },
  {
    id: 'b13',
    name: 'Oval Soft-Close EWC Commode Seat Cover',
    category: 'Diverters & Valves',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/oval_seat_cover.png'
  },
  {
    id: 'b14',
    name: 'Automatic Sensor Ceramic Urinal Bowl',
    category: 'Diverters & Valves',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/sensor_urinal.png'
  },
  {
    id: 'b15',
    name: 'Stainless Steel Single Bowl Kitchen Sink',
    category: 'Diverters & Valves',
    brand: 'PARRYWARE / BATHSENSE',
    sizes: ['Standard'],
    specs: [],
    priceRange: 'Inquire for price',
    image: '/assets/images/products/kitchen_sink.png'
  }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('debnath_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart) as { id: string; size: string; quantity: number }[];
        return parsed.map(item => {
          const product = products.find(p => p.id === item.id);
          if (!product) return null;
          return { product, size: item.size, quantity: item.quantity };
        }).filter((item): item is CartItem => item !== null);
      } catch (err) {
        console.error("Failed to parse cart data:", err);
      }
    }
    return [];
  });
  const [isCartOpen, setCartOpen] = useState(false);

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
