// Weca Offroad Centre - Complete Data Store
// All products, services, testimonials, gallery items, and business information

// ============================================================================
// TYPES
// ============================================================================

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string | null;
  description: string;
  features: string[];
  image: string;
  inStock: boolean;
  vehicleCompatibility?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  startingPrice: string | null;
  duration: string;
  features: string[];
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  vehicle: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  vehicle: string;
  description: string;
  image: string;
  workDone: string[];
  date: string;
}

export interface Brand {
  name: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

// ============================================================================
// PRODUCT CATEGORIES
// ============================================================================

export const productCategories = [
  { id: 'all', name: 'All Products' },
  { id: 'rooftop-tents', name: 'Rooftop Tents' },
  { id: 'suspension', name: 'Suspension & Shocks' },
  { id: 'bumpers', name: 'Bumpers & Protection' },
  { id: 'canopies', name: 'Canopies & Storage' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'camping', name: 'Camping Equipment' },
  { id: 'recovery', name: 'Recovery Gear' },
  { id: 'tyres', name: 'Tyres & Wheels' },
];

export const galleryCategories = [
  { id: 'all', name: 'All Projects' },
  { id: 'rooftop-tents', name: 'Rooftop Tents' },
  { id: 'suspension', name: 'Suspension Upgrades' },
  { id: 'bumpers', name: 'Bumper Installations' },
  { id: 'canopy', name: 'Canopy Fitments' },
  { id: 'full-build', name: 'Full Vehicle Builds' },
  { id: 'recovery', name: 'Recovery Setups' },
];

// ============================================================================
// PRODUCTS (20+ items)
// ============================================================================

export const products: Product[] = [
  // Rooftop Tents
  {
    id: 'prod-001',
    name: 'Tentco Classic Hardshell Rooftop Tent',
    brand: 'Tentco',
    category: 'rooftop-tents',
    price: 'N$ 28,500',
    description: 'Premium hardshell rooftop tent with quick setup mechanism. Perfect for overlanding adventures in Namibia\'s diverse terrain. Features integrated mattress and weather-resistant design.',
    features: ['Quick 60-second setup', 'Sleeps 2-3 people', 'Includes high-density mattress', 'Weather resistant canvas', 'UV protected shell', 'Integrated LED light'],
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
    inStock: true,
    vehicleCompatibility: ['Toyota Hilux', 'Ford Ranger', 'Isuzu D-Max', 'Land Cruiser 79', 'Nissan Patrol'],
  },
  {
    id: 'prod-002',
    name: 'Tentco Safari Softshell Tent',
    brand: 'Tentco',
    category: 'rooftop-tents',
    price: 'N$ 22,000',
    description: 'Lightweight softshell design with spacious interior. Ideal for extended camping trips with excellent ventilation.',
    features: ['Spacious 2-person tent', 'Mosquito netting', 'Rainfly included', 'Lightweight aluminum frame', 'Storage pockets'],
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-003',
    name: 'Front Runner Foldable Rooftop Tent',
    brand: 'Front Runner',
    category: 'rooftop-tents',
    price: 'N$ 35,000',
    description: 'Premium foldable design with integrated annex room. Professional-grade materials for African conditions.',
    features: ['4-person capacity', 'Integrated annex room', 'Heavy-duty construction', 'All-season design', 'Ladder included'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    inStock: false,
  },
  
  // Suspension & Shocks
  {
    id: 'prod-004',
    name: 'Tough Dog Big Bore Shocks - Front Pair',
    brand: 'Tough Dog',
    category: 'suspension',
    price: 'N$ 6,500',
    description: 'Premium adjustable shock absorbers designed for serious offroad conditions. #1 choice for Namibian 4x4 enthusiasts.',
    features: ['40mm piston bore', '9-stage adjustable', 'Lifetime warranty', 'Dust resistant seals', 'Improved ride quality'],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-005',
    name: 'Tough Dog Big Bore Shocks - Rear Pair',
    brand: 'Tough Dog',
    category: 'suspension',
    price: 'N$ 7,200',
    description: 'Matching rear shocks for complete suspension upgrade. Designed to handle heavy loads and rough terrain.',
    features: ['40mm piston bore', 'Heavy-duty construction', 'Load-rated design', 'Easy installation'],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-006',
    name: 'Tough Dog 2" Lift Kit Complete',
    brand: 'Tough Dog',
    category: 'suspension',
    price: 'N$ 15,500',
    description: 'Complete 2-inch lift kit including all four shocks, springs, and necessary hardware for a full suspension upgrade.',
    features: ['2" lift height', 'Complete kit', 'All hardware included', 'Improved ground clearance', 'Better approach angles'],
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-007',
    name: 'Tough Dog 3" Lift Kit Heavy Duty',
    brand: 'Tough Dog',
    category: 'suspension',
    price: 'N$ 19,800',
    description: 'Heavy-duty 3-inch lift for serious offroad use. Includes upgraded springs for carrying additional load.',
    features: ['3" lift height', 'Heavy-duty springs', 'Extended shocks', 'Sway bar links', 'Panhard rod correction'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
    inStock: true,
  },
  
  // Bumpers & Protection
  {
    id: 'prod-008',
    name: 'Wildog Steel Front Bumper',
    brand: 'Wildog',
    category: 'bumpers',
    price: 'N$ 32,000',
    description: 'Heavy-duty steel front bumper with integrated winch mount and LED light provisions. Built for African conditions.',
    features: ['Winch compatible up to 12,000lb', 'LED light bar provisions', 'Recovery points', 'Powder coated finish', 'Fog light provisions'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-009',
    name: 'Wildog Steel Rear Bumper',
    brand: 'Wildog',
    category: 'bumpers',
    price: 'N$ 28,000',
    description: 'Matching rear bumper with tire carrier and jerry can holders. Complete rear protection solution.',
    features: ['Spare tire carrier', 'Jerry can holders', 'Tow bar compatible', 'High-lift jack points', 'Recovery points'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-010',
    name: 'D.AG Snorkel Kit',
    brand: 'D.AG',
    category: 'bumpers',
    price: 'N$ 5,800',
    description: 'Vehicle-specific snorkel kit for water crossings and dust protection. Essential for Namibian conditions.',
    features: ['Water crossing safe', 'Dust protection', 'Vehicle specific fitment', 'UV stable materials', 'Air ram design'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-011',
    name: 'ARB Under Vehicle Protection',
    brand: 'ARB',
    category: 'bumpers',
    price: 'N$ 8,500',
    description: 'Comprehensive underbody protection for engine, transmission, and transfer case. Essential for rocky terrain.',
    features: ['3mm steel construction', 'Bolt-on installation', 'Drain holes for cleaning', 'Access panels for maintenance'],
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    inStock: true,
  },
  
  // Canopies & Storage
  {
    id: 'prod-012',
    name: 'Front Runner Slimline II Roof Rack',
    brand: 'Front Runner',
    category: 'canopies',
    price: 'N$ 18,900',
    description: 'Lightweight aluminum roof rack system designed for maximum storage without compromising vehicle height.',
    features: ['Low profile design', 'Modular system', 'Corrosion resistant aluminum', 'Easy installation', '300kg load capacity'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-013',
    name: 'Rhinoman Canopy Standard',
    brand: 'Rhinoman',
    category: 'canopies',
    price: 'N$ 35,000',
    description: 'Premium fiberglass canopy with side opening windows and interior lighting. Perfect for camping and work.',
    features: ['Fiberglass construction', 'Side opening windows', 'Interior LED light', 'Central locking', 'Roof rack compatible'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop',
    inStock: false,
  },
  {
    id: 'prod-014',
    name: 'Front Runner Drawer System',
    brand: 'Front Runner',
    category: 'canopies',
    price: 'N$ 12,500',
    description: 'Double drawer system for organized storage. Perfect for camping gear, tools, and recovery equipment.',
    features: ['Two full-extension drawers', '100kg capacity per drawer', 'Lockable', 'Aluminum construction', 'Customizable dividers'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    inStock: true,
  },
  
  // Lighting
  {
    id: 'prod-015',
    name: 'Vision X LED Light Bar 50"',
    brand: 'Vision X',
    category: 'lighting',
    price: 'N$ 8,500',
    description: 'High-output LED light bar with combination beam pattern. Exceptional visibility for night driving.',
    features: ['22,500 lumens', 'Combo beam pattern', 'IP68 waterproof', '10-year warranty', 'Low power draw'],
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-016',
    name: 'Vision X LED Light Bar 20"',
    brand: 'Vision X',
    category: 'lighting',
    price: 'N$ 4,200',
    description: 'Compact LED light bar perfect for bumper mounting or as additional lighting.',
    features: ['9,000 lumens', 'Spot beam', 'IP68 rated', 'Powder coated housing'],
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-017',
    name: 'ARB Intensity LED Driving Lights',
    brand: 'ARB',
    category: 'lighting',
    price: 'N$ 11,500',
    description: 'Round LED driving lights with genuine ARB intensity. Premium illumination for serious offroaders.',
    features: ['Pair set', 'Dual intensity', 'Vibration resistant', 'Weatherproof connectors', 'Wiring harness included'],
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    inStock: true,
  },
  
  // Camping Equipment
  {
    id: 'prod-018',
    name: 'Ecoflow Delta Pro Power Station',
    brand: 'Ecoflow',
    category: 'camping',
    price: 'N$ 45,000',
    description: 'Portable power station with 3.6kWh capacity. Perfect for off-grid camping and overlanding adventures.',
    features: ['3.6kWh capacity', '3600W AC output', 'Solar charging compatible', 'App control', 'Expandable battery'],
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-019',
    name: 'Dometic CFX3 75DZ Fridge/Freezer',
    brand: 'Dometic',
    category: 'camping',
    price: 'N$ 22,000',
    description: 'Dual-zone portable fridge/freezer with 75L capacity. Keep your food fresh on long expeditions.',
    features: ['Dual zone temperature', '75L capacity', 'WiFi control', '3-stage battery protection', 'AC/DC powered'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-020',
    name: 'Dometic CFX3 35 Fridge/Freezer',
    brand: 'Dometic',
    category: 'camping',
    price: 'N$ 14,500',
    description: 'Compact 35L fridge/freezer perfect for weekend trips. Efficient and reliable.',
    features: ['35L capacity', 'Single zone', 'Heavy-duty handles', 'USB port', 'Low power consumption'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-021',
    name: 'Front Runner Wolf Pack Storage Box',
    brand: 'Front Runner',
    category: 'camping',
    price: 'N$ 1,800',
    description: 'Stackable storage box designed for 4x4 use. Dust and water resistant.',
    features: ['42L capacity', 'Stackable design', 'Dust/water resistant', 'Padlock compatible', 'Removable lid'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    inStock: true,
  },
  
  // Recovery Gear
  {
    id: 'prod-022',
    name: 'ARB Recovery Kit Deluxe',
    brand: 'ARB',
    category: 'recovery',
    price: 'N$ 6,500',
    description: 'Complete recovery kit including snatch strap, shackles, dampener, and storage bag.',
    features: ['8 ton snatch strap', '3.25t bow shackles (pair)', 'Recovery damper', 'Heavy-duty storage bag', 'Gloves included'],
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-023',
    name: 'T-MAX 12,000lb Winch',
    brand: 'T-MAX',
    category: 'recovery',
    price: 'N$ 18,500',
    description: 'Heavy-duty 12,000lb electric winch. Essential for serious offroad recovery situations.',
    features: ['12,000lb capacity', 'Synthetic rope', 'Wireless remote', 'Fairlead included', 'Solenoid included'],
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-024',
    name: 'Maxtrax Recovery Tracks (Pair)',
    brand: 'Maxtrax',
    category: 'recovery',
    price: 'N$ 4,800',
    description: 'Signature recovery tracks for sand, mud, and snow. Namibian dune essential.',
    features: ['Pair set', 'Stackable', 'UV stabilised', 'Loading pegs included', 'Orange color'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    inStock: true,
  },
  
  // Tyres & Wheels
  {
    id: 'prod-025',
    name: 'BF Goodrich KO2 265/70R16 Set',
    brand: 'BF Goodrich',
    category: 'tyres',
    price: 'N$ 18,000',
    description: 'All-terrain tyre set (4x) designed for serious offroad use while maintaining excellent road manners.',
    features: ['Set of 4 tyres', 'All-terrain', 'Puncture resistant', 'Long tread life', 'Snow rated'],
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-026',
    name: 'BF Goodrich KO2 285/75R16 Set',
    brand: 'BF Goodrich',
    category: 'tyres',
    price: 'N$ 21,000',
    description: 'Larger all-terrain tyre set for vehicles with lift kits. Aggressive tread pattern.',
    features: ['Set of 4 tyres', 'Aggressive all-terrain', 'Sidewall protection', 'Mud and snow rated'],
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'prod-027',
    name: 'Steel Rim 16x8 Set of 4',
    brand: 'Generic',
    category: 'tyres',
    price: 'N$ 6,500',
    description: 'Durable steel rims perfect for offroad use. Ideal spare wheel solution.',
    features: ['Set of 4', '16x8 size', '6-stud pattern', 'Matte black finish', 'Center caps included'],
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop',
    inStock: true,
  },
];

// ============================================================================
// SERVICES (8 items)
// ============================================================================

export const services: Service[] = [
  {
    id: 'svc-001',
    name: 'Rooftop Tent Installation',
    description: 'Professional installation of rooftop tents including roof rack mounting, wiring for accessories, and full demonstration.',
    startingPrice: 'N$ 2,500',
    duration: '2-4 hours',
    features: ['Professional roof rack mounting', 'Electrical wiring integration', 'Full demonstration included', '12-month warranty on installation', 'Safety inspection'],
    icon: 'tent',
  },
  {
    id: 'svc-002',
    name: 'Suspension System Fitment',
    description: 'Complete suspension upgrades including shocks, springs, and lift kit installation with professional wheel alignment.',
    startingPrice: 'N$ 4,500',
    duration: '4-6 hours',
    features: ['Full system installation', 'Professional wheel alignment', 'Test drive included', 'Suspension tuning', 'Parts warranty honored'],
    icon: 'cog',
  },
  {
    id: 'svc-003',
    name: 'Bumper Replacement',
    description: 'Front and rear bumper installation with winch mounting, light integration, and sensor calibration where applicable.',
    startingPrice: 'N$ 3,500',
    duration: '3-5 hours',
    features: ['Winch installation ready', 'Light bar integration', 'Sensor calibration', 'Paint matching available', 'Tow bar integration'],
    icon: 'shield',
  },
  {
    id: 'svc-004',
    name: 'Custom Canopy Building',
    description: 'Bespoke canopy solutions designed and built to your specifications for work, camping, or commercial use.',
    startingPrice: 'On Request',
    duration: '1-3 weeks',
    features: ['Custom design consultation', 'Material options available', 'Interior fitout', 'Electrical integration', 'Paint matching'],
    icon: 'box',
  },
  {
    id: 'svc-005',
    name: 'Vehicle Upgrades & Accessories',
    description: 'Installation of various accessories including lighting, snorkels, roof racks, side steps, and more.',
    startingPrice: 'N$ 1,500',
    duration: '1-4 hours',
    features: ['Wide range of accessories', 'Professional fitment', 'Electrical work included', 'Testing performed', 'Clean finish guaranteed'],
    icon: 'wrench',
  },
  {
    id: 'svc-006',
    name: 'Repair Services',
    description: 'Diagnostic and repair services for 4x4 systems, suspension components, and accessories.',
    startingPrice: 'N$ 850',
    duration: 'Varies',
    features: ['Professional diagnostics', 'OEM parts available', 'Expert technicians', 'Transparent pricing', 'Warranty on repairs'],
    icon: 'settings',
  },
  {
    id: 'svc-007',
    name: 'Tyre Fitting & Balancing',
    description: 'Professional tyre fitting, computer balancing, and alignment for all 4x4 vehicles.',
    startingPrice: 'N$ 1,200',
    duration: '1-2 hours',
    features: ['All tyre types fitted', 'Computer precision balancing', 'Alignment check', 'TPMS service', 'Old tyre disposal'],
    icon: 'circle',
  },
  {
    id: 'svc-008',
    name: 'Custom Vehicle Builds',
    description: 'Complete vehicle builds from ground up. Turn your 4x4 into the ultimate adventure machine.',
    startingPrice: 'On Request',
    duration: '2-8 weeks',
    features: ['Full project management', 'Custom fabrication', 'Premium parts selection', 'Unique builds', 'Full documentation'],
    icon: 'truck',
  },
];

// ============================================================================
// TESTIMONIALS (12 items)
// ============================================================================

export const testimonials: Testimonial[] = [
  {
    id: 'test-001',
    name: 'Johan van der Merwe',
    location: 'Windhoek',
    rating: 5,
    text: 'Weca installed a complete Tough Dog suspension system on my Toyota Hilux. The difference in handling on Namibian gravel roads is incredible. Professional service and fair pricing. Highly recommended for anyone serious about their 4x4!',
    service: 'Suspension System Fitment',
    vehicle: 'Toyota Hilux 2.8 GD-6',
    date: '2024-03-15',
  },
  {
    id: 'test-002',
    name: 'Anna-Marie Strauss',
    location: 'Swakopmund',
    rating: 5,
    text: 'Bought my Tentco rooftop tent from Weca. The team helped me choose the right setup and installed it perfectly. Now my family can enjoy camping anywhere in Namibia. The service was exceptional from start to finish!',
    service: 'Rooftop Tent Installation',
    vehicle: 'Land Rover Defender 110',
    date: '2024-02-28',
  },
  {
    id: 'test-003',
    name: 'Michael Properties',
    location: 'Walvis Bay',
    rating: 5,
    text: 'We outfitted our entire fleet of 5 tour vehicles through Weca. Their expertise in 4x4 modifications and competitive pricing made them the obvious choice. Excellent after-sales support and they understand what tour operators need.',
    service: 'Custom Vehicle Builds',
    vehicle: 'Fleet (5 Toyota Land Cruisers)',
    date: '2024-01-20',
  },
  {
    id: 'test-004',
    name: 'Pieter Joubert',
    location: 'Otjiwarongo',
    rating: 4,
    text: 'Great experience with the Wildog bumper installation. Took a bit longer than expected but the quality of work is top-notch. The team really knows their stuff when it comes to 4x4s. Would recommend.',
    service: 'Bumper Replacement',
    vehicle: 'Ford Ranger Wildtrak',
    date: '2024-03-05',
  },
  {
    id: 'test-005',
    name: 'Sandra Himmelfarb',
    location: 'Namibia',
    rating: 5,
    text: 'Living in Namibia means you need a reliable 4x4. Weca sorted out my suspension and added a snorkel for Skeleton Coast trips. Ready for anything now! Thank you Werner and the team for the excellent work.',
    service: 'Suspension & Accessories',
    vehicle: 'Nissan Patrol Y61',
    date: '2024-02-14',
  },
  {
    id: 'test-006',
    name: 'Thomas Ndlovu',
    location: 'Gobabis',
    rating: 5,
    text: 'The Tough Dog shocks transformed my Isuzu. Before, the farm roads were a nightmare. Now it handles everything smoothly. Worth every cent and the team was professional throughout.',
    service: 'Suspension System Fitment',
    vehicle: 'Isuzu D-Max 3.0',
    date: '2024-01-30',
  },
  {
    id: 'test-007',
    name: 'Christina Maier',
    location: 'Swakopmund',
    rating: 5,
    text: 'Custom canopy build for my mobile veterinary services. Weca designed exactly what I needed. Professional, on time, and within budget. The attention to detail was impressive.',
    service: 'Custom Canopy Building',
    vehicle: 'Toyota Fortuner',
    date: '2024-03-20',
  },
  {
    id: 'test-008',
    name: 'Riaan Botha',
    location: 'Windhoek',
    rating: 5,
    text: 'Been buying from Weca for 3 years now. Best prices in Namibia and they always have stock. My go-to for all 4x4 accessories. Support local businesses like this one!',
    service: 'Multiple Purchases',
    vehicle: 'Land Cruiser 79',
    date: '2024-02-10',
  },
  {
    id: 'test-009',
    name: 'Klaus Weber',
    location: 'Swakopmund',
    rating: 5,
    text: 'Full overland build on my Defender. Weca handled everything from suspension to rooftop tent to electrical. One stop shop and they delivered beyond expectations. True professionals.',
    service: 'Custom Vehicle Builds',
    vehicle: 'Land Rover Defender 130',
    date: '2024-01-15',
  },
  {
    id: 'test-010',
    name: 'James Harri',
    location: 'Namibia',
    rating: 4,
    text: 'Good service on my BF Goodrich tyre fitting. They even gave me advice on tire pressures for different terrains. Will definitely be back for more accessories.',
    service: 'Tyre Fitting & Balancing',
    vehicle: 'Toyota Hilux',
    date: '2024-03-25',
  },
  {
    id: 'test-011',
    name: 'Hendrik Venter',
    location: 'Keetmanshoop',
    rating: 5,
    text: 'Drove 6 hours to get to Weca and it was worth every kilometer. They understood exactly what I needed for my farm vehicle. Honest advice and quality work.',
    service: 'Suspension & Bumper',
    vehicle: 'Toyota Land Cruiser 76',
    date: '2024-02-05',
  },
  {
    id: 'test-012',
    name: 'Lisa Morris',
    location: 'Swakopmund',
    rating: 5,
    text: 'As a woman who loves offroading, I was treated with respect and given honest advice. No upselling, just what I needed. My rooftop tent installation was perfect. Thank you Weca team!',
    service: 'Rooftop Tent Installation',
    vehicle: 'Jeep Wrangler',
    date: '2024-03-10',
  },
];

// ============================================================================
// GALLERY ITEMS (15 items)
// ============================================================================

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-001',
    title: 'Toyota Hilux Overland Build',
    category: 'full-build',
    vehicle: 'Toyota Hilux 2.8 GD-6 Double Cab',
    description: 'Complete overland build featuring rooftop tent, suspension upgrade, bumpers, and full accessory fitout for extended African adventures.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
    workDone: ['2" Tough Dog Lift Kit', 'Tentco Rooftop Tent', 'Wildog Front Bumper', 'Vision X 50" Light Bar', 'D.AG Snorkel', 'Ecoflow Delta Pro'],
    date: '2024-03-10',
  },
  {
    id: 'gal-002',
    title: 'Land Cruiser Suspension Upgrade',
    category: 'suspension',
    vehicle: 'Toyota Land Cruiser 79',
    description: 'Heavy-duty suspension upgrade for a mining company fleet vehicle operating in harsh Namibian conditions daily.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop',
    workDone: ['Tough Dog Big Bore Shocks', 'Heavy Duty Springs', 'Steering Stabilizer', 'Wheel Alignment'],
    date: '2024-02-28',
  },
  {
    id: 'gal-003',
    title: 'Ford Ranger Bumper Installation',
    category: 'bumpers',
    vehicle: 'Ford Ranger Wildtrak 3.2',
    description: 'Steel front bumper with integrated winch mount and LED lighting for a serious offroad enthusiast planning Angola trips.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    workDone: ['Wildog Front Bumper', 'T-MAX 12000lb Winch', 'Vision X 20" Light Bar', 'Wiring Harness'],
    date: '2024-02-15',
  },
  {
    id: 'gal-004',
    title: 'Defender Rooftop Tent Setup',
    category: 'rooftop-tents',
    vehicle: 'Land Rover Defender 110',
    description: 'Complete camping solution with rooftop tent, awning, and power system for extended bush travel across Southern Africa.',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop',
    workDone: ['Tentco Hardshell Tent', 'Front Runner Rack', 'Ecoflow Power Station', 'Dometic Fridge', 'Awning Installation'],
    date: '2024-01-20',
  },
  {
    id: 'gal-005',
    title: 'Custom Canopy Build - Mobile Business',
    category: 'canopy',
    vehicle: 'Toyota Hilux Single Cab',
    description: 'Custom designed canopy for a mobile coffee business. Includes water system, power, and serving hatch.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
    workDone: ['Custom Fiberglass Canopy', 'Interior Fitout', 'Water System', 'Electrical Installation', 'Serving Window'],
    date: '2024-03-05',
  },
  {
    id: 'gal-006',
    title: 'Isuzu D-Max Expedition Build',
    category: 'full-build',
    vehicle: 'Isuzu D-Max 3.0 4x4',
    description: 'Full expedition build for a customer planning a 6-month African overland journey through multiple countries.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    workDone: ['Complete Tough Dog Suspension', 'Front & Rear Wildog Bumpers', 'Tentco Rooftop Tent', 'Dual Battery System', 'Water Tank', 'Full Drawer System'],
    date: '2024-01-15',
  },
  {
    id: 'gal-007',
    title: 'Nissan Patrol Recovery Setup',
    category: 'recovery',
    vehicle: 'Nissan Patrol Y61',
    description: 'Serious recovery setup for dune driving and remote area exploration. Built for the Skeleton Coast.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
    workDone: ['T-MAX Winch Installation', 'Recovery Points Front & Rear', 'Maxtrax Mounts', 'Sand Tracks', 'Snorkel', 'Underbody Protection'],
    date: '2024-02-20',
  },
  {
    id: 'gal-008',
    title: 'Fleet Canopy Installation',
    category: 'canopy',
    vehicle: 'Toyota Hilux Fleet (8 vehicles)',
    description: 'Standardized Rhinoman canopy installation for a construction company fleet. Professional and efficient.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    workDone: ['Rhinoman Canopies x8', 'Tool Boxes', 'Roof Racks', 'Fleet Branding Preparation'],
    date: '2024-03-18',
  },
  {
    id: 'gal-009',
    title: 'Land Cruiser 79 Build',
    category: 'full-build',
    vehicle: 'Toyota Land Cruiser 79 V8',
    description: 'Ultimate safari vehicle build with everything needed for extended African expeditions.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
    workDone: ['3" Tough Dog Lift', 'Front Runner Roof Top Tent', 'Long Range Fuel Tanks', 'Water System', 'Full Electrical', 'Drawer System'],
    date: '2024-01-25',
  },
  {
    id: 'gal-010',
    title: 'Ford Everest Family Tourer',
    category: 'full-build',
    vehicle: 'Ford Everest 3.2',
    description: 'Family-oriented tourer build with rooftop tent and all accessories for comfortable family camping.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    workDone: ['2" Lift Kit', 'Front Runner Rack', 'Tentco Tent', 'Light Bar', 'Fridge Slide', 'Awning'],
    date: '2024-02-08',
  },
  {
    id: 'gal-011',
    title: 'Hilux Suspension Refresh',
    category: 'suspension',
    vehicle: 'Toyota Hilux 2.4',
    description: 'Complete suspension refresh bringing this well-used 4x4 back to perfect handling condition.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop',
    workDone: ['New Tough Dog Shocks All Round', 'New Springs', 'Bushing Replacement', 'Full Alignment'],
    date: '2024-03-01',
  },
  {
    id: 'gal-012',
    title: 'Tour Operator Fleet Prep',
    category: 'full-build',
    vehicle: 'Toyota Land Cruiser 76 Fleet',
    description: 'Fleet preparation for a safari company heading into the Namib desert. Reliability was key.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    workDone: ['Suspension Upgrades', 'Roof Top Tents', 'Fridges', 'Recovery Kits', 'First Aid Stations'],
    date: '2024-02-25',
  },
  {
    id: 'gal-013',
    title: 'Jeep Wrangler Rock Crawler',
    category: 'suspension',
    vehicle: 'Jeep Wrangler JK',
    description: 'Aggressive suspension setup for a customer who loves challenging trails.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
    workDone: ['4" Lift', 'Long Travel Shocks', 'Disconnecting Sway Bars', '35" BF Goodrich KO2', 'Recovery Points'],
    date: '2024-01-10',
  },
  {
    id: 'gal-014',
    title: 'Amarok Canyon Edition',
    category: 'bumpers',
    vehicle: 'VW Amarok Canyon',
    description: 'Enhanced protection and lighting for this premium double cab.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    workDone: ['Steel Bumper', 'LED Light Bar', 'Side Steps', 'Tonneau Cover', 'Snorkel'],
    date: '2024-03-12',
  },
  {
    id: 'gal-015',
    title: 'Camping Setup Complete',
    category: 'rooftop-tents',
    vehicle: 'Toyota Fortuner',
    description: 'Turn-key camping setup ready for family adventures in Etosha and beyond.',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop',
    workDone: ['Roof Rack', 'Rooftop Tent', 'Awning', 'Fridge', 'Drawer System', 'Power Setup'],
    date: '2024-02-18',
  },
];

// ============================================================================
// BUSINESS INFORMATION
// ============================================================================

export const businessInfo = {
  name: 'Weca Offroad Centre',
  tagline: 'The only 4x4 shop in Swakopmund with EVERYTHING you need',
  owner: 'Werner Schaap',
  founded: '2015',
  address: 'Eliaser Tuhadeleni Erf 4802, Swakopmund Industrial, 13001',
  city: 'Swakopmund',
  country: 'Namibia',
  phone: '+264 81 169 1942',
  email: 'wecaoffroadcentre@gmail.com',
  whatsapp: '+264 81 169 1942',
  hours: {
    weekdays: '08:00 - 17:00',
    saturday: 'Open',
    sunday: 'Closed',
  },
  social: {
    facebook: 'https://facebook.com/100064362595359',
    instagram: 'https://instagram.com/wecaoffroadcentre',
    tiktok: 'https://tiktok.com/@wecaoffroadcentre',
    tiktokPersonal: 'https://tiktok.com/@wernerschaap235',
  },
};

// ============================================================================
// BRANDS
// ============================================================================

export const brands: Brand[] = [
  { name: 'Tentco', description: 'Premium South African rooftop tents and camping equipment' },
  { name: 'Front Runner', description: 'World-class roof racks and 4x4 storage solutions' },
  { name: 'Tough Dog', description: 'Australia\'s leading 4x4 suspension manufacturer' },
  { name: 'Wildog', description: 'Heavy-duty bumpers and protection equipment' },
  { name: 'Rhinoman', description: 'Quality canopies for work and adventure' },
  { name: 'Ecoflow', description: 'Portable power stations and solar solutions' },
  { name: 'D.AG', description: 'Snorkels and vehicle accessories' },
  { name: 'Dometic', description: 'Premium camping fridges and equipment' },
  { name: 'ARB', description: 'Legendary 4x4 accessories and recovery gear' },
  { name: 'BF Goodrich', description: 'All-terrain tyres built for adventure' },
  { name: 'Vision X', description: 'High-performance LED lighting' },
  { name: 'Maxtrax', description: 'World-famous recovery tracks' },
];

// ============================================================================
// FAQS
// ============================================================================

export const faqs: FAQ[] = [
  {
    question: 'What are your business hours?',
    answer: 'We are open Monday to Friday from 08:00 to 17:00. Saturdays we are open for sales and inquiries. Sundays we are closed.',
    category: 'general',
  },
  {
    question: 'Do you offer delivery outside Swakopmund?',
    answer: 'Yes! We offer delivery throughout Namibia. Delivery costs depend on the size of items and your location. Contact us for a delivery quote.',
    category: 'general',
  },
  {
    question: 'Can I get a quote before visiting?',
    answer: 'Absolutely! We encourage you to contact us for a quote before visiting. Send us your requirements via WhatsApp, email, or our contact form, and we\'ll get back to you within 24 hours.',
    category: 'general',
  },
  {
    question: 'How long does a typical suspension installation take?',
    answer: 'A complete suspension system installation typically takes 4-6 hours. More complex setups may require a full day. We\'ll provide an accurate timeline during your consultation.',
    category: 'services',
  },
  {
    question: 'Do you offer warranties on your installations?',
    answer: 'Yes! All our installations come with a 12-month workmanship warranty. Additionally, most products we install carry manufacturer warranties which we honor.',
    category: 'services',
  },
  {
    question: 'Can I bring my own parts for installation?',
    answer: 'We prefer to supply parts to ensure quality and warranty coverage. However, we can discuss installing customer-supplied parts on a case-by-case basis.',
    category: 'services',
  },
  {
    question: 'Do I need to book an appointment?',
    answer: 'While we accept walk-ins for basic services, we recommend booking for installations to ensure we can accommodate your vehicle and have parts ready.',
    category: 'general',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, bank transfers, and major credit/debit cards. For larger projects, we can discuss payment plans.',
    category: 'general',
  },
  {
    question: 'Do you work on all vehicle types?',
    answer: 'We specialize in 4x4 vehicles including Toyota, Ford, Nissan, Isuzu, Land Rover, Jeep, and Volkswagen. Contact us if you have questions about your specific vehicle.',
    category: 'services',
  },
  {
    question: 'Do you accept trade-ins?',
    answer: 'We may accept trade-ins on certain items depending on condition and demand. Contact us with details about what you\'d like to trade in.',
    category: 'general',
  },
  {
    question: 'How do I make a warranty claim?',
    answer: 'Contact us with your proof of purchase and details of the issue. We\'ll assess the claim and guide you through the warranty process.',
    category: 'general',
  },
];
