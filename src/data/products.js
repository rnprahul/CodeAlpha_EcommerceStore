export const products = [
  // --- ELECTRONICS (8 items) ---
  {
    id: 'prod-elec-1',
    name: 'AcousticPro Wireless ANC Headphones',
    brand: 'SoundPulse',
    category: 'electronics',
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    rating: 4.8,
    reviewCount: 342,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immerse yourself in pure studio audio with active noise cancellation, custom 45mm beryllium drivers, and a ultra-comfortable memory foam headband.',
    specifications: {
      'Battery Life': '40 Hours with ANC on',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Aux',
      'Charging': 'USB-C Fast Charging (10m = 4h)',
      'Weight': '260g',
      'Warranty': '2 Years Limited'
    },
    stock: 45,
    colors: ['#0f172a', '#64748b', '#e2e8f0'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-elec-2',
    name: 'PulseTrack Ultra Smartwatch',
    brand: 'Kinetix',
    category: 'electronics',
    price: 219.00,
    originalPrice: 279.00,
    discount: 21,
    rating: 4.7,
    reviewCount: 218,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Track your health metrics with clinical accuracy. Features Always-On Retina OLED display, dual-frequency GPS, ECG monitor, and 50m water resistance.',
    specifications: {
      'Display': '1.92" LTPO OLED (1000 nits)',
      'Sensors': 'Optical Heart, SpO2, ECG, Temp',
      'Water Resistance': '5ATM / 50 meters',
      'Battery': 'Up to 36 Hours Normal Use',
      'Compatibility': 'iOS & Android'
    },
    stock: 28,
    colors: ['#000000', '#0d9488', '#f59e0b'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-elec-3',
    name: 'BoomSphere Portable Bluetooth Speaker',
    brand: 'SoundPulse',
    category: 'electronics',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.6,
    reviewCount: 184,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
    ],
    description: '360-degree deep bass punch with IPX7 waterproof housing. Perfect for outdoor adventures, pool parties, and tabletop listening.',
    specifications: {
      'Output Power': '30W RMS',
      'Playtime': '20 Hours',
      'Waterproof': 'IPX7 Rated',
      'Bluetooth Version': '5.2',
      'Pairing': 'True Wireless Stereo (TWS)'
    },
    stock: 60,
    colors: ['#1e293b', '#dc2626', '#2563eb'],
    featured: false,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-elec-4',
    name: 'CyberKey RGB Mechanical Keyboard',
    brand: 'KeyCraft',
    category: 'electronics',
    price: 129.50,
    originalPrice: 159.50,
    discount: 19,
    rating: 4.9,
    reviewCount: 412,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hot-swappable tactile mechanical switches with per-key RGB backlighting, gasket mount structure, and PBT double-shot keycaps.',
    specifications: {
      'Layout': '75% Compact (84 Keys)',
      'Switch Type': 'Gateron Pro Yellow (Hot-swap)',
      'Keycaps': 'Double-shot PBT Cherry Profile',
      'Connectivity': 'Tri-Mode (BT / 2.4G / Type-C)',
      'Battery': '4000mAh'
    },
    stock: 19,
    colors: ['#0f172a', '#f8fafc'],
    featured: true,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-elec-5',
    name: 'ErgoGlide Wireless Ergonomic Mouse',
    brand: 'KeyCraft',
    category: 'electronics',
    price: 59.99,
    originalPrice: 74.99,
    discount: 20,
    rating: 4.5,
    reviewCount: 129,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Designed to relieve wrist strain with a 57-degree natural handshake angle, quiet click switches, and ultra-precise 4000 DPI sensor.',
    specifications: {
      'Sensor': 'Darkfield High Precision 4000 DPI',
      'Angle': '57 Vertical Handshake Ergonomics',
      'Buttons': '6 Programmable Buttons',
      'Battery': 'Rechargeable USB-C (70 Days)',
      'Weight': '135g'
    },
    stock: 34,
    colors: ['#0f172a', '#94a3b8'],
    featured: false,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-elec-6',
    name: 'Apex 5G Flagship Smartphone',
    brand: 'Vortex',
    category: 'electronics',
    price: 899.00,
    originalPrice: 999.00,
    discount: 10,
    rating: 4.8,
    reviewCount: 520,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered with a 120Hz LTPO AMOLED display, triple 50MP Sony camera system, and ultra-fast 120W charging for power users.',
    specifications: {
      'Processor': 'Octa-core 4nm Flagship Chipset',
      'Display': '6.7" QHD+ 120Hz LTPO AMOLED',
      'Camera': '50MP Main OIS + 50MP UW + 50MP Telephoto',
      'RAM / Storage': '12GB LPDDR5X / 256GB UFS 4.0',
      'Charging': '120W Wired / 50W Wireless'
    },
    stock: 15,
    colors: ['#000000', '#0d9488', '#e2e8f0'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-elec-7',
    name: 'SoundBuds True Wireless Earbuds',
    brand: 'SoundPulse',
    category: 'electronics',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    rating: 4.4,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Compact wireless earbuds with deep bass drivers, crystal-clear quad mics for calls, and wireless charging case.',
    specifications: {
      'Playtime': '8 Hours + 24 Hours in Case',
      'Water Resistance': 'IPX5 Sweat Resistant',
      'Controls': 'Smart Touch Gesture Controls',
      'Charging': 'Wireless Qi & USB-C'
    },
    stock: 50,
    colors: ['#ffffff', '#000000'],
    featured: false,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-elec-8',
    name: 'VisionCurve 34" Ultrawide Gaming Monitor',
    brand: 'Vortex',
    category: 'electronics',
    price: 479.00,
    originalPrice: 599.00,
    discount: 20,
    rating: 4.9,
    reviewCount: 175,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80'
    ],
    description: '1500R curved WQHD display with 165Hz refresh rate and 1ms response time for competitive gaming and immersive multitasking.',
    specifications: {
      'Resolution': '3440 x 1440 WQHD (21:9)',
      'Refresh Rate': '165Hz FreeSync Premium Pro',
      'Response Time': '1ms MPRT',
      'Panel Type': 'Curved VA HDR400'
    },
    stock: 12,
    colors: ['#0f172a'],
    featured: false,
    trending: true,
    inStock: true
  },

  // --- FASHION (6 items) ---
  {
    id: 'prod-fash-1',
    name: 'UrbanFlex Heavyweight Fleece Hoodie',
    brand: 'AuraStyle',
    category: 'fashion',
    price: 64.99,
    originalPrice: 84.99,
    discount: 24,
    rating: 4.7,
    reviewCount: 265,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crafted from 450GSM organic ring-spun cotton with double-layer hood, rib-knit side gussets, and relaxed modern fit.',
    specifications: {
      'Material': '80% Organic Cotton, 20% Polyester',
      'Weight': '450 GSM Heavyweight Fleece',
      'Fit': 'Relaxed Unisex Fit',
      'Care': 'Machine Wash Cold, Hang Dry'
    },
    stock: 75,
    colors: ['#0f172a', '#475569', '#0d9488', '#cbd5e1'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-fash-2',
    name: 'Heritage Raw Denim Jacket',
    brand: 'DenimCo',
    category: 'fashion',
    price: 98.00,
    originalPrice: 125.00,
    discount: 21,
    rating: 4.8,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Classic trucker style crafted from 14oz Japanese selvedge denim. Features custom brass hardware and dual button-flap chest pockets.',
    specifications: {
      'Fabric': '14oz Japanese Selvedge Denim',
      'Hardware': 'Custom Antique Brass Rivets',
      'Pockets': '2 Chest, 2 Side Welt Pockets',
      'Origin': 'Ethically Manufactured'
    },
    stock: 30,
    colors: ['#1e3a8a', '#0f172a'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-fash-3',
    name: 'Metropolis Minimalist Waterproof Backpack',
    brand: 'AuraStyle',
    category: 'fashion',
    price: 79.50,
    originalPrice: 99.50,
    discount: 20,
    rating: 4.9,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sleek, weatherproof commuter backpack featuring a padded 16-inch laptop compartment, hidden RFID pocket, and magnetic roll-top closure.',
    specifications: {
      'Capacity': '22 Liters',
      'Material': 'Waterproof Matte PU Coated Canvas',
      'Laptop Sleeve': 'Fits up to 16" MacBook Pro',
      'Weight': '850g'
    },
    stock: 40,
    colors: ['#0f172a', '#334155', '#0d9488'],
    sizes: ['One Size'],
    featured: false,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-fash-4',
    name: 'RetroStrider Leather Streetwear Sneakers',
    brand: 'StrideLab',
    category: 'fashion',
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    rating: 4.6,
    reviewCount: 198,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Retro 90s aesthetic reconstructed with full-grain leather, perforated toe box, and high-rebound memory foam insoles.',
    specifications: {
      'Upper': 'Full-Grain Italian Calfskin Leather',
      'Outsole': 'Durable Vulcanized Rubber',
      'Insole': 'Ortholite Memory Foam',
      'Laces': '100% Recycled Cotton'
    },
    stock: 22,
    colors: ['#ffffff', '#000000', '#991b1b'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-fash-5',
    name: 'Essential Tailored Cotton Oxford Shirt',
    brand: 'AuraStyle',
    category: 'fashion',
    price: 49.99,
    originalPrice: 65.00,
    discount: 23,
    rating: 4.5,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Versatile button-down woven from 100% Supima long-staple cotton with button-down collar and box pleat for effortless daily wear.',
    specifications: {
      'Fabric': '100% Supima Oxford Cotton',
      'Collar': 'Button-Down Collar',
      'Cuffs': 'Adjustable Two-Button Cuffs',
      'Fit': 'Slim Modern Fit'
    },
    stock: 55,
    colors: ['#ffffff', '#38bdf8', '#cbd5e1'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-fash-6',
    name: 'AeroDry Athletic Training Shorts',
    brand: 'StrideLab',
    category: 'fashion',
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    rating: 4.7,
    reviewCount: 115,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Lightweight 7-inch performance shorts featuring a built-in compression liner, zippered phone pocket, and 4-way stretch fabric.',
    specifications: {
      'Inseam': '7 Inches',
      'Liner': 'Breathable Anti-Chafe Compression Liner',
      'Pockets': 'Zippered Back Pocket + Phone Slot',
      'Fabric': '88% Recycled Polyester, 12% Spandex'
    },
    stock: 65,
    colors: ['#0f172a', '#0d9488', '#dc2626'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    trending: false,
    inStock: true
  },

  // --- HOME & LIVING (5 items) ---
  {
    id: 'prod-home-1',
    name: 'Lumina Touch Dimmable LED Desk Lamp',
    brand: 'NordicHome',
    category: 'home-living',
    price: 45.99,
    originalPrice: 59.99,
    discount: 23,
    rating: 4.8,
    reviewCount: 167,
    images: [
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Scandinavian minimalist desk lamp featuring continuous touch dimming, 5 color temperature modes, built-in wireless Qi charger base, and flexible neck.',
    specifications: {
      'Brightness': '800 Lumens Max',
      'Color Temps': '2700K - 6500K (5 Preset Modes)',
      'Wireless Charger': '10W Qi Fast Charging Base',
      'Power Source': 'DC 12V Adapter Included'
    },
    stock: 38,
    colors: ['#ffffff', '#000000'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-home-2',
    name: 'BaristaPro Compact Espresso Machine',
    brand: 'NordicHome',
    category: 'home-living',
    price: 199.00,
    originalPrice: 249.00,
    discount: 20,
    rating: 4.9,
    reviewCount: 289,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    description: '15-bar Italian pressure pump delivers rich crema espresso. Includes commercial steam wand for silky latte art and removable 1.5L water tank.',
    specifications: {
      'Pump Pressure': '15 Bar Italian Solenoid Pump',
      'Water Tank': '1.5 Liter Removable Reservoir',
      'Heating System': 'ThermoCoil 1350W Instant Heat',
      'Accessories': 'Portafilter, Tamper, Milk Pitcher'
    },
    stock: 18,
    colors: ['#cbd5e1', '#0f172a'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-home-3',
    name: 'CozyVelvet Accent Pillow Set (Pack of 4)',
    brand: 'NordicHome',
    category: 'home-living',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    rating: 4.6,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ultra-soft Dutch velvet cushion covers with invisible zipper design. Adds instant warmth and luxury texture to living room sofas or bedrooms.',
    specifications: {
      'Dimensions': '18 x 18 Inches (45cm x 45cm)',
      'Fabric': '100% Premium Dutch Velvet',
      'Quantity': '4 Cushion Covers (Inserts not included)',
      'Care': 'Machine Washable'
    },
    stock: 50,
    colors: ['#0d9488', '#f59e0b', '#78350f', '#475569'],
    featured: false,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-home-4',
    name: 'Stackable Modular Desk Organizer Box',
    brand: 'OrganizeIt',
    category: 'home-living',
    price: 29.99,
    originalPrice: 36.99,
    discount: 19,
    rating: 4.7,
    reviewCount: 140,
    images: [
      'https://images.unsplash.com/photo-1591129841119-c48dc364e286?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clear bamboo and acrylic modular desktop drawer unit. Ideal for organizing stationeries, cables, makeup, and small workspace items.',
    specifications: {
      'Material': 'Natural Sustainable Bamboo & Shatterproof Acrylic',
      'Dimensions': '12" W x 8" D x 6" H',
      'Drawers': '3 Pull-Out Storage Drawers'
    },
    stock: 42,
    colors: ['#fef3c7', '#ffffff'],
    featured: false,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-home-5',
    name: 'ZenMist Ultrasonic Essential Oil Diffuser',
    brand: 'NordicHome',
    category: 'home-living',
    price: 34.50,
    originalPrice: 42.50,
    discount: 19,
    rating: 4.8,
    reviewCount: 205,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Aromatherapy mist humdifier featuring real handblown glass cover, 7 ambient mood LEDs, automatic safety shutoff, and whisper-quiet ultrasonic technology.',
    specifications: {
      'Water Capacity': '300 ml',
      'Run Time': 'Up to 10 Hours Continuous',
      'Noise Level': '< 25 dB Ultra-Quiet',
      'Coverage': '350 sq. ft.'
    },
    stock: 26,
    colors: ['#ffffff', '#78350f'],
    featured: false,
    trending: true,
    inStock: true
  },

  // --- BEAUTY (4 items) ---
  {
    id: 'prod-beau-1',
    name: 'Radiance Glow Hyaluronic Acid Serum',
    brand: 'PureBotanica',
    category: 'beauty',
    price: 38.00,
    originalPrice: 48.00,
    discount: 21,
    rating: 4.9,
    reviewCount: 512,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clinical grade hydrator formulated with multi-molecular hyaluronic acid, Vitamin B5, and botanical antioxidants to plump and restore glass skin glow.',
    specifications: {
      'Volume': '30 ml / 1.0 fl. oz.',
      'Key Ingredients': '2% Hyaluronic Acid, Niacinamide, B5',
      'Skin Type': 'All Skin Types (Dermatologist Tested)',
      'Formula': '100% Vegan & Cruelty-Free'
    },
    stock: 80,
    colors: [],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-beau-2',
    name: 'ProIon High-Speed Ionic Hair Dryer',
    brand: 'GlamTech',
    category: 'beauty',
    price: 139.99,
    originalPrice: 179.99,
    discount: 22,
    rating: 4.7,
    reviewCount: 230,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80'
    ],
    description: '110,000 RPM brushless motor dries hair 3x faster without extreme heat damage. Emits negative ions to eliminate frizz and boost shine.',
    specifications: {
      'Motor': '110,000 RPM Brushless Motor',
      'Attachments': 'Magnetic Concentrator & Diffuser',
      'Heat Settings': '4 Temperatures / 3 Speed Levels',
      'Weight': '400g Ergonomic Lightweight'
    },
    stock: 25,
    colors: ['#0f172a', '#ec4899', '#94a3b8'],
    featured: true,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-beau-3',
    name: 'Botanical Rejuvenating Skincare Trio Set',
    brand: 'PureBotanica',
    category: 'beauty',
    price: 68.00,
    originalPrice: 85.00,
    discount: 20,
    rating: 4.8,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Complete 3-step ritual containing Cleansing Gel, Rosewater Toning Mist, and Youth Repair Moisture Cream for smooth skin barrier repair.',
    specifications: {
      'Set Includes': 'Gentle Cleanser 100ml, Toner 100ml, Cream 50ml',
      'Benefits': 'Deep Cleansing, Hydration, Barrier Protection',
      'Free From': 'Parabens, Sulfates, Artificial Fragrance'
    },
    stock: 35,
    colors: [],
    featured: false,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-beau-4',
    name: 'Velvet Tint Hydrating Lip Balm Set',
    brand: 'GlamTech',
    category: 'beauty',
    price: 24.99,
    originalPrice: 32.99,
    discount: 24,
    rating: 4.6,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Nourishing tinted lip oils enriched with Jojoba and Shea Butter for non-sticky shine and long-lasting moisture.',
    specifications: {
      'Shades': 'Rose Quartz, Nude Caramel, Berry Glow',
      'Finish': 'Dewy Tinted Gloss',
      'Volume': '3 x 5 ml'
    },
    stock: 60,
    colors: ['#ec4899', '#f59e0b', '#be123c'],
    featured: false,
    trending: false,
    inStock: true
  },

  // --- SPORTS (5 items) ---
  {
    id: 'prod-spor-1',
    name: 'EcoGrip Non-Slip Alignment Yoga Mat',
    brand: 'ZenFit',
    category: 'sports',
    price: 49.99,
    originalPrice: 65.00,
    discount: 23,
    rating: 4.9,
    reviewCount: 380,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'
    ],
    description: '6mm high-density eco-friendly TPE mat with laser-engraved posture alignment lines. Odorless, waterproof, and non-slip on all surfaces.',
    specifications: {
      'Dimensions': '72" L x 24" W (6mm Thick)',
      'Material': 'Eco-Friendly Biodegradable TPE',
      'Weight': '1.1 kg',
      'Included': 'Free Carry Strap & Mesh Bag'
    },
    stock: 70,
    colors: ['#0d9488', '#ec4899', '#475569'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-spor-2',
    name: 'SpeedStride Cushioning Running Shoes',
    brand: 'Kinetix',
    category: 'sports',
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    rating: 4.8,
    reviewCount: 295,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered mesh upper with dual-density foam midsole provides soft landings and springy energy return for long distance road runs.',
    specifications: {
      'Weight': '245g (Size 9)',
      'Heel Drop': '8 mm',
      'Cushioning': 'NitroFoam Max Energy Cushioning',
      'Terrain': 'Road & Track Running'
    },
    stock: 32,
    colors: ['#dc2626', '#0f172a', '#2563eb'],
    sizes: ['7', '8', '9', '10', '11'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-spor-3',
    name: 'HydroVault Vacuum Insulated Water Bottle',
    brand: 'ZenFit',
    category: 'sports',
    price: 27.99,
    originalPrice: 34.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 164,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Double-wall stainless steel keeps drinks cold for 24 hours or hot for 12 hours. Sweat-free powder coat with leakproof straw lid.',
    specifications: {
      'Capacity': '32 oz (950 ml)',
      'Insulation': 'TempShield Double-Wall Vacuum',
      'Material': '18/8 Pro-Grade Stainless Steel',
      'BPA Free': '100% Non-Toxic & Phthalate Free'
    },
    stock: 90,
    colors: ['#0f172a', '#0d9488', '#f59e0b', '#ffffff'],
    featured: false,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-spor-4',
    name: 'FitBand Pro Smart Fitness Tracker',
    brand: 'Kinetix',
    category: 'sports',
    price: 49.00,
    originalPrice: 65.00,
    discount: 25,
    rating: 4.5,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Slim lightweight fitness band with 14-day battery life, continuous heart rate, sleep quality scoring, and 30 active workout modes.',
    specifications: {
      'Display': '1.47" AMOLED Touch Screen',
      'Battery': '14 Days Normal Usage',
      'Waterproof': '5ATM Swimproof',
      'Sensors': 'Optical PPG Heart Rate, 3-Axis Accelerometer'
    },
    stock: 45,
    colors: ['#000000', '#0d9488'],
    featured: false,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-spor-5',
    name: 'Velocity Pro Ball-Bearing Speed Jump Rope',
    brand: 'ZenFit',
    category: 'sports',
    price: 18.99,
    originalPrice: 24.99,
    discount: 24,
    rating: 4.6,
    reviewCount: 77,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
    ],
    description: '360-degree dual ball bearing mechanism with self-locking adjustable steel cable handles for frictionless double-unders.',
    specifications: {
      'Cable Length': '10 Feet Fully Adjustable Steel Cable',
      'Handles': 'Anti-Slip Anodized Aluminum',
      'Bearings': 'High-Speed Precision Ball Bearings'
    },
    stock: 55,
    colors: ['#0f172a', '#dc2626'],
    featured: false,
    trending: false,
    inStock: true
  },

  // --- ACCESSORIES (5 items) ---
  {
    id: 'prod-acc-1',
    name: 'Solace Polarized Aviator Sunglasses',
    brand: 'AuraStyle',
    category: 'accessories',
    price: 54.99,
    originalPrice: 75.00,
    discount: 27,
    rating: 4.8,
    reviewCount: 220,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ultra-lightweight titanium metal frame with TAC polarized UV400 anti-glare lenses. Includes leather protective case and cleaning cloth.',
    specifications: {
      'Lens': 'TAC Polarized UV400 Protection',
      'Frame': 'Ultra-Light Aviation Grade Titanium',
      'Weight': '22g',
      'Included': 'Hard Leather Case & Microfiber Cloth'
    },
    stock: 65,
    colors: ['#f59e0b', '#0f172a', '#64748b'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-acc-2',
    name: 'Executive Full-Grain Leather RFID Wallet',
    brand: 'CraftedCo',
    category: 'accessories',
    price: 42.00,
    originalPrice: 55.00,
    discount: 24,
    rating: 4.9,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted bifold wallet featuring 8 card slots, dual cash compartment, and integrated military-grade RFID blocking technology.',
    specifications: {
      'Material': '100% Full-Grain Vegetable-Tanned Cowhide',
      'Protection': '13.56 MHz RFID Shielding',
      'Capacity': '8 Card Slots, 2 Cash Slots, 1 Quick ID Window'
    },
    stock: 48,
    colors: ['#78350f', '#0f172a'],
    featured: true,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-acc-3',
    name: 'Chronos Sapphire Automatic Dress Watch',
    brand: 'CraftedCo',
    category: 'accessories',
    price: 249.00,
    originalPrice: 320.00,
    discount: 22,
    rating: 4.9,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Precision 24-jewel Japanese automatic movement featuring scratch-resistant sapphire crystal glass, open heart exhibition caseback, and genuine leather strap.',
    specifications: {
      'Movement': 'Seiko NH35 Automatic (41h Power Reserve)',
      'Glass': 'Scratch-Resistant Synthetic Sapphire',
      'Case Diameter': '40 mm (316L Stainless Steel)',
      'Water Resistance': '50 meters / 5 ATM'
    },
    stock: 14,
    colors: ['#78350f', '#0f172a', '#cbd5e1'],
    featured: true,
    trending: true,
    inStock: true
  },
  {
    id: 'prod-acc-4',
    name: 'ShieldGuard Waterproof Felt Laptop Sleeve',
    brand: 'CraftedCo',
    category: 'accessories',
    price: 26.99,
    originalPrice: 34.99,
    discount: 23,
    rating: 4.7,
    reviewCount: 135,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    description: '360-degree shockproof padding with soft plush fleece lining and magnetic closure. Fits 13-14" and 15-16" laptops.',
    specifications: {
      'Sizing': 'Fits 13-14" and 15-16" Laptops',
      'Protection': 'Dual Layer EVA Foam + Plush Fleece',
      'Extra Storage': 'Front Accessory Pocket for Charger & Mouse'
    },
    stock: 55,
    colors: ['#475569', '#0f172a'],
    sizes: ['13-14 Inch', '15-16 Inch'],
    featured: false,
    trending: false,
    inStock: true
  },
  {
    id: 'prod-acc-5',
    name: 'Nomad Canvas Travel Toiletry Bag',
    brand: 'CraftedCo',
    category: 'accessories',
    price: 29.50,
    originalPrice: 38.00,
    discount: 22,
    rating: 4.8,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavyweight waxed canvas dopp kit with waterproof lining, sturdy YKK zippers, and leather carry handle.',
    specifications: {
      'Material': '16oz Water-Resistant Waxed Canvas',
      'Lining': 'Easy-to-Clean Waterproof Polyester',
      'Dimensions': '9.5" L x 5" W x 4.5" H'
    },
    stock: 36,
    colors: ['#78350f', '#0f172a', '#0d9488'],
    featured: false,
    trending: false,
    inStock: true
  }
];
