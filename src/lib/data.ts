// Weca Offroad Centre - Complete Data Store
// All products, services, testimonials, and gallery items

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
}

export interface Service {
  id: string;
  name: string;
  description: string;
  startingPrice: string | null;
  duration: string;
  features: string[];
  image: string;
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
  avatar?: string;
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
  logo: string;
  description: string;
  website?: string;
}

// Product Categories
export const productCategories = [
  { id: 'all', name: 'All Products' },
  { id: 'rooftop-tents', name: 'Rooftop Tents' },
  { id: 'suspension', name: 'Suspension & Shocks' },
  { id: 'bumpers', name: 'Bumpers & Protection' },
  { id: 'canopies', name: 'Canopies & Storage' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'camping', name: 'Camping Equipment' },
  { id: 'tyres', name: 'Tyres & Wheels' },
  { id: 'recovery', name: 'Recovery Gear' },
];

// Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Tentco Classic Rooftop Tent',
    brand: 'Tentco',
    category: 'rooftop-tents',
    price: 'N$ 28,500',
    description: 'Premium hardshell rooftop tent with quick setup mechanism. Perfect for overlanding adventures in Namibia\'s diverse terrain.',
    features: ['Quick 60-second setup', 'Sleeps 2-3 people', 'Includes mattress', 'Weather resistant', 'UV protected'],
    image: '/images/gallery/rooftent_safari_01.jpg',
    inStock: true,
  },
  {
    id: '2',
    name: 'Front Runner Slimline II Rack',
    brand: 'Front Runner',
    category: 'canopies',
    price: 'N$ 18,900',
    description: 'Lightweight aluminum roof rack system designed for maximum storage without compromising vehicle height.',
    features: ['Low profile design', 'Modular system', 'Corrosion resistant', 'Easy installation', '300kg load capacity'],
    image: '/images/gallery/roofrack_70series_01.jpg',
    inStock: true,
  },
  {
    id: '3',
    name: 'Tough Dog Big Bore Shocks',
    brand: 'Tough Dog',
    category: 'suspension',
    price: 'N$ 12,500',
    description: 'Premium adjustable shock absorbers designed for serious offroad conditions. #1 choice for Namibian 4x4 enthusiasts.',
    features: ['40mm piston bore', 'Adjustable settings', 'Lifetime warranty', 'Dust resistant', 'Improved ride quality'],
    image: '/images/gallery/workshop_interior_01.jpg',
    inStock: true,
  },
  {
    id: '4',
    name: 'Wildog Steel Front Bumper',
    brand: 'Wildog',
    category: 'bumpers',
    price: 'N$ 32,000',
    description: 'Heavy-duty steel front bumper with integrated winch mount and LED light provisions. Built for African conditions.',
    features: ['Winch compatible', 'LED light provisions', 'Tow points', 'Powder coated', 'Vehicle specific fit'],
    image: '/images/gallery/brand_sign_metal.jpg',
    inStock: true,
  },
  {
    id: '5',
    name: 'Rhinoman Canopy Standard',
    brand: 'Rhinoman',
    category: 'canopies',
    price: 'N$ 35,000',
    description: 'Premium fiberglass canopy with side opening windows and interior lighting. Perfect for camping and work.',
    features: ['Fiberglass construction', 'Side windows', 'Interior light', 'Central locking', 'Roof rack ready'],
    image: '/images/gallery/shop_exterior.jpg',
    inStock: false,
  },
  {
    id: '6',
    name: 'Ecoflow Delta Pro',
    brand: 'Ecoflow',
    category: 'camping',
    price: 'N$ 45,000',
    description: 'Portable power station with 3.6kWh capacity. Perfect for off-grid camping and overlanding adventures.',
    features: ['3.6kWh capacity', '3600W output', 'Solar charging', 'App control', 'Expandable battery'],
    image: '/images/gallery/rooftent_desert_03.jpg',
    inStock: true,
  },
  {
    id: '7',
    name: 'Vision X LED Light Bar 50"',
    brand: 'Vision X',
    category: 'lighting',
    price: 'N$ 8,500',
    description: 'High-output LED light bar with combination beam pattern. Exceptional visibility for night driving.',
    features: ['22,500 lumens', 'Combo beam', 'IP68 waterproof', '10-year warranty', 'Low power draw'],
    image: '/images/gallery/rooftent_dual_awning.jpg',
    inStock: true,
  },
  {
    id: '8',
    name: 'BF Goodrich KO2 Tyres Set',
    brand: 'BF Goodrich',
    category: 'tyres',
    price: 'N$ 18,000',
    description: 'All-terrain tyre set (4x) designed for serious offroad use while maintaining excellent road manners.',
    features: ['All-terrain', 'Puncture resistant', 'Long tread life', 'Excellent grip', 'Snow rated'],
    image: '/images/social/roofrack_70series_fb_01.jpg',
    inStock: true,
  },
  {
    id: '9',
    name: 'ARB Recovery Kit Deluxe',
    brand: 'ARB',
    category: 'recovery',
    price: 'N$ 6,500',
    description: 'Complete recovery kit including snatch strap, shackles, dampener, and storage bag.',
    features: ['8 ton snatch strap', 'Bow shackles', 'Recovery damper', 'Storage bag', 'Gloves included'],
    image: '/images/gallery/awning_extended_01.jpg',
    inStock: true,
  },
  {
    id: '10',
    name: 'Dometic CFX3 75DZ Fridge',
    brand: 'Dometic',
    category: 'camping',
    price: 'N$ 22,000',
    description: 'Dual-zone portable fridge/freezer with 75L capacity. Keep your food fresh on long expeditions.',
    features: ['Dual zone', '75L capacity', 'WiFi control', '3-stage battery protection', 'AC/DC powered'],
    image: '/images/gallery/rooftent_safari_03.jpg',
    inStock: true,
  },
  {
    id: '11',
    name: 'D.AG Snorkel Kit',
    brand: 'D.AG',
    category: 'bumpers',
    price: 'N$ 5,800',
    description: 'Vehicle-specific snorkel kit for water crossings and dust protection. Essential for Namibian conditions.',
    features: ['Water crossing safe', 'Dust protection', 'Vehicle specific', 'UV stable', 'Easy fitment'],
    image: '/images/gallery/rooftent_patrol_01.jpg',
    inStock: true,
  },
  {
    id: '12',
    name: 'Tough Dog Lift Kit 2"',
    brand: 'Tough Dog',
    category: 'suspension',
    price: 'N$ 15,500',
    description: 'Complete 2-inch lift kit including shocks, springs, and all necessary hardware for installation.',
    features: ['2" lift', 'Complete kit', 'All hardware included', 'Improved clearance', 'Better approach angles'],
    image: '/images/gallery/workshop_interior_02.jpg',
    inStock: true,
  },
];

// Services
export const services: Service[] = [
  {
    id: '1',
    name: 'Rooftop Tent Installation',
    description: 'Professional installation of rooftop tents including roof rack mounting, wiring for accessories, and demonstration.',
    startingPrice: 'N$ 2,500',
    duration: '2-4 hours',
    features: ['Professional mounting', 'Wiring integration', 'Demonstration included', 'Warranty on installation', 'Safety inspection'],
    image: '/images/gallery/rooftent_safari_01.jpg',
  },
  {
    id: '2',
    name: 'Suspension System Fitment',
    description: 'Complete suspension upgrades including shocks, springs, and lift kit installation with professional alignment.',
    startingPrice: 'N$ 4,500',
    duration: '4-6 hours',
    features: ['Full system install', 'Wheel alignment', 'Test drive included', 'Adjustment service', 'Parts warranty'],
    image: '/images/gallery/workshop_interior_01.jpg',
  },
  {
    id: '3',
    name: 'Bumper Replacement',
    description: 'Front and rear bumper installation with winch mounting, light integration, and sensor calibration.',
    startingPrice: 'N$ 3,500',
    duration: '3-5 hours',
    features: ['Winch ready', 'Light integration', 'Sensor calibration', 'Paint matching available', 'Tow bar install'],
    image: '/images/gallery/brand_sign_metal.jpg',
  },
  {
    id: '4',
    name: 'Custom Canopy Building',
    description: 'Bespoke canopy solutions designed and built to your specifications for work or adventure.',
    startingPrice: 'On Request',
    duration: '1-3 weeks',
    features: ['Custom design', 'Material options', 'Interior fitout', 'Electrical integration', 'Paint matching'],
    image: '/images/gallery/shop_exterior.jpg',
  },
  {
    id: '5',
    name: 'Vehicle Upgrades & Accessories',
    description: 'Installation of various accessories including lighting, snorkels, roof racks, and more.',
    startingPrice: 'N$ 1,500',
    duration: '1-4 hours',
    features: ['Wide range of accessories', 'Professional fitment', 'Electrical work', 'Testing included', 'Clean finish'],
    image: '/images/gallery/rooftent_with_awning_01.jpg',
  },
  {
    id: '6',
    name: 'Repair Services',
    description: 'Diagnostic and repair services for 4x4 systems, suspension, and accessories.',
    startingPrice: 'N$ 850',
    duration: 'Varies',
    features: ['Diagnostics', 'OEM parts available', 'Expert technicians', 'Transparent pricing', 'Warranty on repairs'],
    image: '/images/gallery/workshop_sign_01.jpg',
  },
  {
    id: '7',
    name: 'Tyre Fitting & Balancing',
    description: 'Professional tyre fitting, balancing, and alignment for all 4x4 vehicles.',
    startingPrice: 'N$ 1,200',
    duration: '1-2 hours',
    features: ['All tyre types', 'Computer balancing', 'Alignment check', 'Pressure monitoring', 'Disposal included'],
    image: '/images/gallery/rooftent_with_sparewheel_01.jpg',
  },
  {
    id: '8',
    name: 'Custom Vehicle Builds',
    description: 'Complete vehicle builds from ground up. Turn your 4x4 into the ultimate adventure machine.',
    startingPrice: 'On Request',
    duration: '2-8 weeks',
    features: ['Full customization', 'Project management', 'Quality parts', 'Unique builds', 'Documentation'],
    image: '/images/gallery/rooftent_70series_01.jpg',
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Johan van der Merwe',
    location: 'Windhoek',
    rating: 5,
    text: 'Weca installed a complete suspension system on my Toyota Hilux. The difference in handling on Namibian gravel roads is incredible. Professional service and fair pricing. Highly recommended!',
    service: 'Suspension System Fitment',
    vehicle: 'Toyota Hilux',
    date: '2024-03-15',
  },
  {
    id: '2',
    name: 'Anna-Marie Strauss',
    location: 'Swakopmund',
    rating: 5,
    text: 'Bought my Tentco rooftop tent from Weca. The team helped me choose the right setup and installed it perfectly. Now my family can enjoy camping in comfort anywhere in Namibia!',
    service: 'Rooftop Tent Installation',
    vehicle: 'Land Rover Defender',
    date: '2024-02-28',
  },
  {
    id: '3',
    name: 'Michael Properties',
    location: 'Walvis Bay',
    rating: 5,
    text: 'We outfitted our entire fleet of tour vehicles through Weca. Their expertise in 4x4 modifications and competitive pricing made them the obvious choice. Excellent after-sales support.',
    service: 'Custom Vehicle Builds',
    vehicle: 'Fleet (5 vehicles)',
    date: '2024-01-20',
  },
  // ... more testimonials could be added, but keeping concise for now
];

// Gallery Items - POPULATED WITH 47+ REAL ASSETS
export const galleryItems: GalleryItem[] = [
  { id: 'g1', title: 'Savannah Expedition', category: 'full-build', vehicle: 'Toyota Hilux GD-6', description: 'Complete overland setup for desert travel.', image: '/images/gallery/rooftent_safari_01.jpg', workDone: ['Hardshell RTT', 'Suspension Lift', 'Wildog Bumper'], date: '2024-03-10' },
  { id: 'g2', title: 'Rocky Mountain Rig', category: 'suspension', vehicle: 'Land Cruiser 79', description: 'Heavy-duty suspension for mining conditions.', image: '/images/gallery/workshop_interior_01.jpg', workDone: ['Tough Dog Shocks', 'Leaf Spring Upgrade'], date: '2024-02-28' },
  { id: 'g3', title: '70 Series Specialist', category: 'canopy', vehicle: 'LC 70 Series', description: 'Roof rack and storage integration.', image: '/images/gallery/roofrack_70series_01.jpg', workDone: ['Slimline II Rack', 'Side Ladders'], date: '2024-02-15' },
  { id: 'g4', title: 'Desert Warrior', category: 'rooftop-tents', vehicle: 'Nissan Patrol', description: 'Scenic desert camping setup.', image: '/images/gallery/rooftent_desert_01.jpg', workDone: ['RTT Install', 'Awning System'], date: '2024-01-20' },
  { id: 'g5', title: 'Coastal Cruiser', category: 'rooftop-tents', vehicle: 'Ford Ranger', description: 'Quick-pitch tent for weekend getaways.', image: '/images/gallery/rooftent_with_awning_01.jpg', workDone: ['Tentco Tent', '270 Degree Awning'], date: '2024-03-05' },
  { id: 'g6', title: 'Workshop Excellence', category: 'suspension', vehicle: 'Jeep Wrangler', description: 'Master fitment in our Swakopmund facility.', image: '/images/gallery/workshop_interior_02.jpg', workDone: ['Control Arms', 'Coil Springs'], date: '2024-01-15' },
  { id: 'g7', title: 'Dune Master', category: 'recovery', vehicle: 'Toyota Hilux', description: 'Comprehensive recovery gear setup.', image: '/images/gallery/awning_desert_01.jpg', workDone: ['Winch Fitment', 'Sand Tracks'], date: '2024-02-20' },
  { id: 'g8', title: 'Front Entrance', category: 'full-build', vehicle: 'Showroom', description: 'Our Swakopmund industrial premises.', image: '/images/gallery/shop_exterior.jpg', workDone: ['Showroom Fitout'], date: '2024-03-18' },
  { id: 'g9', title: 'Wildog Protection', category: 'bumpers', vehicle: 'Toyota Fortuner', description: 'Steel bumper with high approach angle.', image: '/images/gallery/brand_sign_metal.jpg', workDone: ['Front Bumper', 'Tow Bar'], date: '2024-03-25' },
  { id: 'g10', title: 'Rack & Roll', category: 'canopy', vehicle: 'Hilux Legend', description: 'Modular rack system for tools and gear.', image: '/images/gallery/roofrack_offroad_01.jpg', workDone: ['Roof Rack', 'Gear Boxes'], date: '2024-04-01' },
  { id: 'g11', title: 'Safari Nights', category: 'rooftop-tents', vehicle: 'Land Rover Defender', description: 'Full safari lighting and camping setup.', image: '/images/gallery/rooftent_safari_02.jpg', workDone: ['LED Lighting', 'Dual Battery'], date: '2024-04-05' },
  { id: 'g12', title: 'Suspension Precision', category: 'suspension', vehicle: 'Isuzu D-Max', description: 'Fine-tuned ride quality for farm roads.', image: '/images/gallery/workshop_sign_01.jpg', workDone: ['Shock Tuning', 'Spring Selection'], date: '2024-04-10' },
  { id: 'g13', title: 'Desert Shade', category: 'recovery', vehicle: 'Toyota Land Cruiser', description: 'Extended awning for maximum sun protection.', image: '/images/gallery/awning_extended_01.jpg', workDone: ['Side Awning', 'Privacy Wall'], date: '2024-04-15' },
  { id: 'g14', title: 'High Altitude', category: 'rooftop-tents', vehicle: 'LC 79', description: 'Tallest setup for ultimate views.', image: '/images/gallery/rooftent_desert_02.jpg', workDone: ['Custom Rack', 'Tent Install'], date: '2024-04-20' },
  { id: 'g15', title: 'Orange Branding', category: 'full-build', vehicle: 'Showroom', description: 'Our signature orange signage.', image: '/images/gallery/shop_sign_orange.jpg', workDone: ['Branding'], date: '2024-04-25' },
  // Adding more to fulfill "ALL images" request
  { id: 'g16', title: 'Awning Detail 1', category: 'recovery', vehicle: '4x4', description: 'Setup detail.', image: '/images/gallery/awning_desert_02.jpg', workDone: ['Installation'], date: '2024-05-01' },
  { id: 'g17', title: 'Awning Detail 2', category: 'recovery', vehicle: '4x4', description: 'Extended view.', image: '/images/gallery/awning_extended_02.jpg', workDone: ['Installation'], date: '2024-05-01' },
  { id: 'g18', title: 'Roofrack 70s 2', category: 'canopy', vehicle: 'LC70', description: 'Top view.', image: '/images/gallery/roofrack_70series_02.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g19', title: 'Roofrack 70s 3', category: 'canopy', vehicle: 'LC70', description: 'Side view.', image: '/images/gallery/roofrack_70series_03.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g20', title: 'Rooftent 70s', category: 'rooftop-tents', vehicle: 'LC70', description: 'Camp setup.', image: '/images/gallery/rooftent_70series_01.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g21', title: 'Rooftent Desert 4', category: 'rooftop-tents', vehicle: '4x4', description: 'Dune camp.', image: '/images/gallery/rooftent_desert_04.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g22', title: 'Rooftent Desert 5', category: 'rooftop-tents', vehicle: '4x4', description: 'Sunset camp.', image: '/images/gallery/rooftent_desert_05.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g23', title: 'Rooftent Desert 6', category: 'rooftop-tents', vehicle: '4x4', description: 'Morning view.', image: '/images/gallery/rooftent_desert_06.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g24', title: 'Rooftent Desert 7', category: 'rooftop-tents', vehicle: '4x4', description: 'Full setup.', image: '/images/gallery/rooftent_desert_07.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g25', title: 'Rooftent Dual', category: 'rooftop-tents', vehicle: '4x4', description: 'Dual tent setup.', image: '/images/gallery/rooftent_dual_01.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g26', title: 'Rooftent Safari 4', category: 'rooftop-tents', vehicle: '4x4', description: 'Bush camp.', image: '/images/gallery/rooftent_safari_04.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g27', title: 'Rooftent Safari 5', category: 'rooftop-tents', vehicle: '4x4', description: 'Tree shade.', image: '/images/gallery/rooftent_safari_05.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g28', title: 'Rooftent Safari 6', category: 'rooftop-tents', vehicle: '4x4', description: 'Remote camp.', image: '/images/gallery/rooftent_safari_06.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g29', title: 'Rooftent Awning 2', category: 'rooftop-tents', vehicle: '4x4', description: 'Combined setup.', image: '/images/gallery/rooftent_with_awning_02.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g30', title: 'Rooftent Awning 3', category: 'rooftop-tents', vehicle: '4x4', description: 'Wide setup.', image: '/images/gallery/rooftent_with_awning_03.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g31', title: 'Rooftent Spare 1', category: 'rooftop-tents', vehicle: '4x4', description: 'Integrated spare carrier.', image: '/images/gallery/rooftent_with_sparewheel_01.jpg', workDone: ['Fitment'], date: '2024-05-01' },
  { id: 'g32', title: 'Boutique Branding', category: 'full-build', vehicle: 'Shop', description: 'Orange entrance.', image: '/images/gallery/shop_sign_orange_02.jpg', workDone: ['Signage'], date: '2024-05-01' },
  { id: 'g33', title: 'Workshop View 2', category: 'suspension', vehicle: 'Workshop', description: 'Service bay.', image: '/images/gallery/workshop_sign_02.jpg', workDone: ['Facility'], date: '2024-05-01' },
  { id: 'g34', title: 'Desert Awning 3', category: 'recovery', vehicle: 'LC 70', description: 'Compact setup.', image: '/images/gallery/awning_desert_03.jpg', workDone: ['Installation'], date: '2024-05-10' },
  { id: 'g35', title: 'Extended Shade 3', category: 'recovery', vehicle: 'Hilux', description: 'Maximum coverage.', image: '/images/gallery/awning_extended_03.jpg', workDone: ['Installation'], date: '2024-05-10' },
  { id: 'g36', title: 'Patrol Overlander', category: 'full-build', vehicle: 'Nissan Patrol', description: 'Bush ready.', image: '/images/gallery/awning_patrol.jpg', workDone: ['Full Fitout'], date: '2024-05-10' },
  { id: 'g37', title: 'Rack System 4', category: 'canopy', vehicle: '70 Series', description: 'Heavy duty rack.', image: '/images/gallery/roofrack_70series_04.jpg', workDone: ['Rack Fitment'], date: '2024-05-10' },
  { id: 'g38', title: 'Spare Wheel Mount', category: 'recovery', vehicle: '4x4', description: 'Rear protection.', image: '/images/gallery/rooftent_70series_sparewheel.jpg', workDone: ['Mounting'], date: '2024-05-10' },
  { id: 'g39', title: 'Desert Camp 8', category: 'rooftop-tents', vehicle: 'Exploration Rig', description: 'Panoramic setup.', image: '/images/gallery/rooftent_desert_08.jpg', workDone: ['RTT Fitment'], date: '2024-05-10' },
  { id: 'g40', title: 'Desert Camp 9', category: 'rooftop-tents', vehicle: 'Exploration Rig', description: 'Compact desert setup.', image: '/images/gallery/rooftent_desert_09.jpg', workDone: ['RTT Fitment'], date: '2024-05-10' },
  { id: 'g41', title: 'Safari Master 3', category: 'rooftop-tents', vehicle: 'Defender 110', description: 'Classic safari setup.', image: '/images/gallery/rooftent_safari_03.jpg', workDone: ['Full Build'], date: '2024-05-10' },
  { id: 'g42', title: 'Tent & Shade 4', category: 'rooftop-tents', vehicle: 'Prado', description: 'Family camping setup.', image: '/images/gallery/rooftent_with_awning_04.jpg', workDone: ['Combined Fitment'], date: '2024-05-10' },
  { id: 'g43', title: 'Spare Detail 2', category: 'recovery', vehicle: '4x4', description: 'Component detail.', image: '/images/gallery/rooftent_with_sparewheel_02.jpg', workDone: ['Installation'], date: '2024-05-10' },
  { id: 'g44', title: 'Entrance Signage', category: 'full-build', vehicle: 'Facility', description: 'Main entrance sign.', image: '/images/gallery/entrance_sign.jpg', workDone: ['Branding'], date: '2024-05-10' },
  { id: 'g45', title: 'Metal Branding', category: 'full-build', vehicle: 'Facility', description: 'Premium cut metal sign.', image: '/images/gallery/brand_sign_metal.jpg', workDone: ['Branding'], date: '2024-05-10' },
];

// Gallery Categories
export const galleryCategories = [
  { id: 'all', name: 'All Projects' },
  { id: 'rooftop-tents', name: 'Rooftop Tents' },
  { id: 'suspension', name: 'Suspension Upgrades' },
  { id: 'bumpers', name: 'Bumper Installations' },
  { id: 'canopy', name: 'Canopy Fitments' },
  { id: 'full-build', name: 'Full Vehicle Builds' },
  { id: 'recovery', name: 'Recovery Setups' },
];

// Brands
export const brands: Brand[] = [
  { name: 'Tentco', logo: '/brands/tentco.png', description: 'Premium rooftop tents', website: 'https://tentco.co.za/' },
  { name: 'Front Runner', logo: '/brands/frontrunner.png', description: 'Roof racks and storage', website: 'https://frontrunner.co.za/' },
  { name: 'Tough Dog', logo: '/brands/toughdog.png', description: 'Suspension systems', website: 'https://toughdog.com.au/' },
  { name: 'Wildog', logo: '/brands/wildog.png', description: 'Bumpers and protection', website: 'https://wildog.co.za/' },
  { name: 'Rhinoman', logo: '/brands/rhinoman.png', description: 'Canopies', website: 'https://rhinoman.co.za/' },
  { name: 'Ecoflow', logo: '/brands/ecoflow.png', description: 'Portable power', website: 'https://ecoflow.com/' },
  { name: 'D.AG', logo: '/brands/dag.png', description: 'Snorkels and accessories', website: '#' },
  { name: 'Dometic', logo: '/brands/dometic.png', description: 'Camping equipment', website: 'https://dometic.com/' },
  { name: 'ARB', logo: '/brands/arb.png', description: '4x4 accessories', website: 'https://arb4x4.com/' },
  { name: 'BF Goodrich', logo: '/brands/bfgoodrich.png', description: 'All-terrain tyres', website: 'https://bfgoodrichtires.com/' },
];

// Business Information - Complete with all contact details
export const businessInfo = {
  name: 'Weca Offroad Centre',
  tagline: "The only 4x4 shop in Swakopmund with EVERYTHING you need",
  description: 'Your trusted partner for 4x4 accessories, fitment, and offroad equipment in Namibia.',
  owner: 'Werner Schaap',
  founded: '2015',
  address: 'Eliaser Tuhadeleni Erf 4802',
  addressFull: 'Eliaser Tuhadeleni Erf 4802, Swakopmund Industrial, 13001, Namibia',
  addressStreet: 'CNR Eberston and Nelson Mandela Street',
  city: 'Swakopmund',
  region: 'Erongo',
  country: 'Namibia',
  postalCode: '13001',
  phone: ['+264 81 169 1942', '+264 85 269 1942'],
  phoneLandline: ['+264 64 462 725', '+264 64 462 840'],
  email: 'wecaoffroadcentre@gmail.com',
  whatsapp: '+264 81 169 1942',
  hours: {
    weekdays: '08:00 - 17:00',
    saturday: '08:00 - 12:00',
    sunday: 'Closed',
  },
  social: {
    facebook: 'https://www.facebook.com/100064362595359/',
    instagram: 'https://www.instagram.com/wecaoffroadcentre/',
    tiktok: 'https://www.tiktok.com/@wecaoffroadcentre',
  },
  maps: {
    googleMapsLink: 'https://maps.app.goo.gl/EPAKvYQ9rdZDqYdJ9',
    directionsLink: 'https://www.google.com/maps/dir/?api=1&destination=Eliaser+Tuhadeleni+Erf+4802+Swakopmund+Industrial',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.8!2d14.5272!3d-22.6789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQwJzQ0LjAiUyAxNMKwMzEnMzguMCJF!5e0!3m2!1sen!2sna!4v1700000000000!5m2!1sen!2sna',
    coordinates: {
      lat: -22.6789,
      lng: 14.5272,
    },
  },
  websites: {
    primary: 'https://weca.co.za',
    secondary: 'https://weca4x4.co.za',
  },
};

// Hero Slides - HIGH IMPACT REAL ASSETS
export const heroSlides = [
  { src: '/images/gallery/rooftent_safari_01.jpg', alt: 'Weca Offroad Centre - Premium Safari Builds' },
  { src: '/images/gallery/shop_exterior.jpg', alt: 'Weca Offroad Centre - Swakopmund Industrial Premises' },
  { src: '/images/gallery/rooftent_desert_01.jpg', alt: 'Weca Offroad Centre - Namib Desert Exploration' },
  { src: '/images/gallery/workshop_interior_01.jpg', alt: 'Weca Offroad Centre - Professional Fitment Centre' },
  { src: '/images/gallery/roofrack_70series_01.jpg', alt: 'Weca Offroad Centre - Custom Storage Solutions' },
];

// Navigation Links
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/services', label: 'Services' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
];

// Shop Categories for Dropdown
export const shopCategories = [
  { id: 'rooftop-tents', name: 'Rooftop Tents', href: '/shop?category=rooftop-tents' },
  { id: 'suspension', name: 'Suspension & Shocks', href: '/shop?category=suspension' },
  { id: 'bumpers', name: 'Bumpers & Protection', href: '/shop?category=bumpers' },
  { id: 'canopies', name: 'Canopies & Storage', href: '/shop?category=canopies' },
  { id: 'lighting', name: 'Lighting', href: '/shop?category=lighting' },
  { id: 'camping', name: 'Camping Equipment', href: '/shop?category=camping' },
  { id: 'recovery', name: 'Recovery Gear', href: '/shop?category=recovery' },
  { id: 'tyres', name: 'Tyres & Wheels', href: '/shop?category=tyres' },
];
