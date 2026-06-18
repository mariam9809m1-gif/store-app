/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ProductReview } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "AetherSound Pro Over-Ear Active Noise Cancelling Headphones",
    description: "Experience absolute acoustic perfection with the AetherSound Pro. Features hybrid active noise cancellation, custom-tuned 40mm dynamic drivers, and an industry-leading 45-hour battery life. Perfect for focus, travel, and high-fidelity music streaming.",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 412,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 25,
    features: [
      "Hybrid Active Noise Cancellation (covers up to 38dB of ambient noise)",
      "High-Resolution Audio certified with aptX Adaptive codec support",
      "Incredible 45-hour battery life with fast charging (10 mins = 5 hours play)",
      "Multi-point connection allows seamless swapping between phone and laptop",
      "Luxury memory-foam earcups lined with breathable protein leather"
    ],
    specifications: {
      "Frequency Response": "10Hz - 40kHz",
      "Driver Size": "40mm Dynamic",
      "Bluetooth Version": "5.2",
      "Battery Capacity": "900mAh",
      "Weight": "260g",
      "Charging Port": "USB-C"
    },
    isPrime: true,
    bestSeller: true,
    reviews: [
      {
        id: "rev-1-1",
        userName: "Sarah Jenkins",
        rating: 5,
        date: "2026-05-12",
        title: "Spectacular Sound and ANC",
        comment: "I have used several Bose and Sony headphones over the years, and these honestly compete beautifully. The noise cancellation is a godsend for my open-office environment, and the sound profile is very balanced without muddy bass.",
        isVerified: true
      },
      {
        id: "rev-1-2",
        userName: "Marc Henderson",
        rating: 4,
        date: "2026-05-28",
        title: "Insane battery life, solid audio",
        comment: "Truly happy with the build quality and absolute comfort of these headphones. Only slight critique is the touch controls can be a bit sensitive on the earcups when adjusting them on my head, but otherwise incredible value.",
        isVerified: true
      },
      {
        id: "rev-1-3",
        userName: "Elena R.",
        rating: 5,
        date: "2026-06-02",
        title: "Best travel headphones ever!",
        comment: "Took them on a 14-hour flight and forgot they were on my head. Blocked out the engine roar completely. Charger was unused the whole trip!",
        isVerified: true
      }
    ]
  },
  {
    id: "prod-2",
    title: "KeyForge X-100 Hot-Swappable Tenkeyless Mechanical Keyboard",
    description: "Designed for typists and keyboard enthusiasts alike. The KeyForge X-100 boasts pre-lubricated mechanical switches, double-shot PBT keycaps, sound-dampening foam layers, and customizable per-key south-facing RGB backlighting in solid aluminum casing.",
    price: 119.50,
    rating: 4.7,
    reviewCount: 189,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 12,
    features: [
      "Hot-Swappable 5-pin PCB supports 99% of mechanical switches on the market",
      "Pre-lubed linear red switches for a silky smooth and silent typing profile",
      "Thick double-shot PBT keycaps offer superior grease-resistance and longevity",
      "Dual sand-wich dampening foam layers to eliminate harsh metallic pings",
      "Wired USB-C, 2.4Ghz wireless, and Bluetooth 5.1 multi-mode connectivity"
    ],
    specifications: {
      "Form Factor": "Tenkeyless (80% layout)",
      "Switch Type": "KeyForge Linear Red Pre-Lubed",
      "Frame Material": "CNC Anodized Aluminum",
      "Backlining": "Per-key ARGB with 18 presets",
      "Connectivity": "USB-C, 2.4Ghz Wireless, BT 5.1",
      "Battery": "4000mAh"
    },
    isPrime: true,
    bestSeller: false,
    reviews: [
      {
        id: "rev-2-1",
        userName: "Justin K.",
        rating: 5,
        date: "2026-04-18",
        title: "Sounds like rain falling. Amazing!",
        comment: "The typing sound is perfectly thocky straight out of the box! I did not need to modify the stabilizers. Absolutely a premium experience.",
        isVerified: true
      },
      {
        id: "rev-2-2",
        userName: "Clara Bell",
        rating: 4,
        date: "2026-05-04",
        title: "Great board, RGB software is average",
        comment: "The physical keyboard itself is heavy, sturdy, and clicks perfectly. The software to configure the RGB patterns could be modernized, but the pre-programmed on-keyboard shortcuts do 90% of what you need anyway.",
        isVerified: true
      }
    ]
  },
  {
    id: "prod-3",
    title: "ErgoComfort Orthopedic Premium Office Desk Chair",
    description: "Say goodbye to lumbar fatigue. Engineered to fit the natural curvature of the spine, the ErgoComfort features active 3D self-adjusting lumbar support, dynamic tilt, 4D adjustable armrests, and exceptionally breathy hyper-mesh backing.",
    price: 329.99,
    originalPrice: 399.99,
    rating: 4.5,
    reviewCount: 320,
    category: "Home & Office",
    images: [
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 8,
    features: [
      "Adaptive 3D lumbar support tracks spine position reactively",
      "Reinforced carbon steel frame certified for up to 350 lbs of loaded weight",
      "Korean high-elastic breathable mesh distributes body heat and weight evenly",
      "Seat depth slider and 135-degree safety-locking tilting system",
      "Quiet dual-wheel designer nylon casters safe for hardwoods and tile"
    ],
    specifications: {
      "Max Weight Capacity": "350 lbs",
      "Seat Height range": "18.5\" - 22.4\"",
      "Cylinder Class": "SGS Certified Class 4 Gas Lift",
      "Back Tilt Angle": "90° - 135°",
      "Armrest Adjustment": "Height, Angle, Depth, Breadth",
      "Frame Material": "Polished Aluminum Alloy"
    },
    isPrime: false,
    bestSeller: true,
    reviews: [
      {
        id: "rev-3-1",
        userName: "Thomas Drake",
        rating: 5,
        date: "2026-03-30",
        title: "Saved my lower back",
        comment: "I work 10 hours a day sitting. Used to get up feeling like my back was in knots. After a week on the ErgoComfort, the difference is night and day. Completely adjustable.",
        isVerified: true
      },
      {
        id: "rev-3-2",
        userName: "Grace Cho",
        rating: 4,
        date: "2026-04-12",
        title: "Comfortable, but assembly takes 30 mins",
        comment: "Very heavy box! Instructions are clear and tools are provided. Built it in half an hour. Extremely comfortable. The mesh is firm and high quality.",
        isVerified: true
      }
    ]
  },
  {
    id: "prod-4",
    title: "Nomad Crafted Minimalist Vegetable-Tanned Leather Backpack",
    description: "A flawless merger of vintage craftsmanship and modern tech organization. Handcrafted from top-grain vegetable-tanned Italian leather that develops a gorgeous, unique golden patina over time. Features structured slots for your laptop, devices, and travel essentials.",
    price: 145.00,
    rating: 4.9,
    reviewCount: 88,
    category: "Fashion & Travel",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 15,
    features: [
      "Top-grain hand-finished vegetable-tanned leather, heavy-duty stitching",
      "Dedicated high-density padded felt sleeve fits laptops up to 16 inches",
      "Luggage sleeve back panel allows backpack to slide securely on suitcase handles",
      "Hidden anti-theft zipper pocket on inner back cushion for passport or keys",
      "Waterproof velvet lining with segmented pockets and cable organizers"
    ],
    specifications: {
      "Capacity": "22 Liters",
      "Dimensions": "17.5\" H x 12.0\" W x 5.8\" D",
      "Laptop Pocket Max": "16 inch Macbook Pro",
      "Hardware": "PVD Coated Anti-Rust Brass Buckles",
      "Strap Material": "Leather reinforced with woven cotton canvas",
      "Weight": "1.3 kg"
    },
    isPrime: true,
    bestSeller: false,
    reviews: [
      {
        id: "rev-4-1",
        userName: "Leo Sterling",
        rating: 5,
        date: "2026-05-15",
        title: "An absolute work of art",
        comment: "The leather smells heavenly! The texture is luxurious. It looks like a heritage piece that will outlast my careers. Pockets are brilliant.",
        isVerified: true
      },
      {
        id: "rev-4-2",
        userName: "Isabella Martinez",
        rating: 5,
        date: "2026-05-20",
        title: "Beautiful and practical",
        comment: "Most leather bags are heavy or lack storage slots. This keeps my tablet, laptop, chargers and cosmetics perfectly organized and padded.",
        isVerified: true
      }
    ]
  },
  {
    id: "prod-5",
    title: "ApexActive V5 GPS Smart Health & Sports Watch",
    description: "Push past your boundaries with the ultimate multi-sport smart training compass. Equipped with dual-band GPS trackers, dynamic blood-oxygen level monitors, live heartrate zones, sleep metrics, and water-resistance up to 50 meters with an stunning Always-On OLED screen.",
    price: 219.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviewCount: 224,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 30,
    features: [
      "Dual-frequency multi-satellite GPS for hyper-accurate navigation tracking",
      "Comprehensive cardiovascular insights, automated VO2 max and HRV indicators",
      "Over 95 tracking profiles (from ultra-running and rowing to HIIT workouts)",
      "Gorgeous 1.4-inch scratch-resistant sapphire glass Always-On OLED display",
      "Supercharged battery lasts up to 14 days in smartmode, or 36 hours with full GPS"
    ],
    specifications: {
      "Display Size": "1.4-inch (Always-On AMOLED)",
      "Resolution": "454 x 454 pixels",
      "Sensors": "Heart Rate, Pulse Ox, Altimeter, 3-Axis Gyro",
      "Water Resistance": "5 ATM (50 Meters Pool/Open Water)",
      "Bezel Material": "Grade 5 Titanium",
      "Connectivity": "WiFi, Bluetooth LE, NFC for payments"
    },
    isPrime: true,
    bestSeller: false,
    reviews: [
      {
        id: "rev-5-1",
        userName: "Daniel Cho",
        rating: 5,
        date: "2026-05-01",
        title: "GPS accuracy is unmatched",
        comment: "I run in dense trail canyons where standard watches lose signal. This one maps my turns perfectly. Battery lasts nearly two weeks without thinking.",
        isVerified: true
      },
      {
        id: "rev-5-2",
        userName: "Amanda Ruiz",
        rating: 4,
        date: "2026-05-18",
        title: "Excellent metrics, strap is stiff",
        comment: "The health monitoring suite is incredibly deep. Sleep analysis helped me fix my sleep cycle. The silicone watch strap is a bit stiff initially, but you can snap-swap standard watch bands in 5 seconds.",
        isVerified: true
      }
    ]
  },
  {
    id: "prod-6",
    title: "BaristaCrafter Premium Pour-Over Glass Coffee Maker & Stand",
    description: "Unlock the supreme extraction flavor profile of freshly roasted coffee beans. Individually hand-blown from dynamic thermal-shock resistant borosilicate glass and anchored by a stylish brushed-brass and solid walnut height-adjustable brewing stand.",
    price: 69.95,
    rating: 4.4,
    reviewCount: 142,
    category: "Home & Office",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 45,
    features: [
      "Ultra-clear heavy-wall 100% lead-free borosilicate thermal glass carafe",
      "Micro-mesh laser etched double layered stainless steel filter (reusable, no paper needed)",
      "Varnished luxury solid walnut base holds copper-finished height-adjustable armature",
      "Comfort-hold insulated wrap with leather tie prevents hot drips and transfers",
      "Capacity to brew up to 800ml (approx. 6 small cups) in a single dynamic pour"
    ],
    specifications: {
      "Carafe Material": "High-Density Borosilicate Glass",
      "Base Dimensions": "7.8\" x 6.2\" Solid Walnut Wood",
      "Filter Type": "Reusable Double-Layered Stainless Mesh",
      "Capacity": "27 oz (800ml)",
      "Dishwasher Safe": "Glass Carafe only",
      "Stand Height Range": "Up to 11.5 inches"
    },
    isPrime: true,
    bestSeller: false,
    reviews: [
      {
        id: "rev-6-1",
        userName: "Evelyn K.",
        rating: 5,
        date: "2026-04-20",
        title: "An elegant centerpiece",
        comment: "Every guests asks me where I got this. It looks so high end sitting on my marble kitchen island. The coffee filter is incredibly fine, absolutely no coffee grinds find their way to bottom of the cup.",
        isVerified: true
      },
      {
        id: "rev-6-2",
        userName: "Richard L.",
        rating: 4,
        date: "2026-05-09",
        title: "Clean delicious brew",
        comment: "Fabulous drip coffee. Standard paper filters take away essential oils; this double stainless mesh gives you a much richer and thicker mouthfeel. Just wash the mesh filter immediately to prevent build up.",
        isVerified: true
      }
    ]
  },
  {
    id: "prod-7",
    title: "LuminaVision 34-inch UltraWide Curved 165Hz Monitor",
    description: "Immerse yourself deep in your workflow or gameplay. The LuminaVision 34-inch features an expansive 1500R curvature, detailed 3440 x 1440 resolution, 98% DCI-P3 color capture, HDR400, and a blistering-fast 165Hz refresh rate with AMD FreeSync Premium pro.",
    price: 369.00,
    originalPrice: 429.00,
    rating: 4.7,
    reviewCount: 201,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 5,
    features: [
      "Epic 34-inch 21:9 aspect ratio provides 35% more screen estate than standard displays",
      "Perfect 1500R curved radius mimics natural peripheral vision to minimize eye strain",
      "Extreme 165Hz refresh rate and 1ms Motion Picture Response Time (MPRT)",
      "VESA HDR 400 with a staggering 3000:1 deep cinematic contrast ratio",
      "Full height, swivel, and tilt adjustable solid steel hydraulic monitor stand"
    ],
    specifications: {
      "Screen Size": "34 inch",
      "Panel Type": "VA Curved Dynamic",
      "Aspect Ratio": "21:9",
      "Native Resolution": "3440 x 1440 (WQHD)",
      "Max Refresh Rate": "165Hz",
      "Input Ports": "2x HDMI 2.0, 2x DisplayPort 1.4, 1x USB-C Alt Mode"
    },
    isPrime: true,
    bestSeller: true,
    reviews: [
      {
        id: "rev-7-1",
        userName: "Zack O.",
        rating: 5,
        date: "2026-05-03",
        title: "Excellent for multi-tasking!",
        comment: "I can open three full browser windows or coding files side-by-side with no scaling problems. The text is crisp and the curved profile really keeps it legible.",
        isVerified: true
      },
      {
        id: "rev-7-2",
        userName: "Aiden T.",
        rating: 4,
        date: "2026-05-24",
        title: "Spectacular for movies and games",
        comment: "Great contrast. Colors pop amazingly after a bit of manual calibration. Built-in speakers are fairly basic, but who uses monitor speakers? Very heavy stand, but extremely high quality.",
        isVerified: true
      }
    ]
  },
  {
    id: "prod-8",
    title: "Everest Nomad Insulated Double-Wall Stainless Water Bottle",
    description: "From rocky mountain trails to office desks. The Everest Nomad is vacuum-insulated, forged from kitchen-grade 18/8 food-safe stainless steel, and keeps iced drinks freezing cold for up to 36 hours or hot coffee piping warm for 18 hours.",
    price: 24.99,
    rating: 4.8,
    reviewCount: 512,
    category: "Home & Office",
    images: [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 80,
    features: [
      "ThermoShield double-walled vacuum insulation prevents external sweat condensation",
      "Forged with 18/8 food-grade copper-lined stainless steel (100% BPA and lead free)",
      "Durable EverGrip powder-coat paint finish won't chip, scratch, or slip when wet",
      "Includes two separate leakproof lids: Easy-sip Straw Lid and Insulated Cafe Lid",
      "Wide mouth 2.2-inch opening makes it a breeze to insert full-sized ice blocks"
    ],
    specifications: {
      "Capacity": "32 Fluid Ounces (950ml)",
      "Material": "18/8 Pro-Grade Stainless Steel",
      "Cold Duration": "Up to 36 Hours",
      "Hot Duration": "Up to 18 Hours",
      "Diameter": "3.5 inches",
      "Height": "10.2 inches (with lid)"
    },
    isPrime: true,
    bestSeller: false,
    reviews: [
      {
        id: "rev-8-1",
        userName: "Michael C.",
        rating: 5,
        date: "2026-05-15",
        title: "Keeps ice solid in hot car",
        comment: "Left it in my black sedan under direct 90° sunny heat for 5 hours. Came back, the water inside was still ice cold with pieces of ice floating. Absolute magic.",
        isVerified: true
      },
      {
        id: "rev-8-2",
        userName: "Lily Vance",
        rating: 5,
        date: "2026-05-22",
        title: "Durable and beautiful",
        comment: "Love the navy powder coat look. Has rolled off my kitchen bench thrice on tiles and doesn't even have a dent. Highly recommend with straw lid.",
        isVerified: true
      }
    ]
  }
];

export const CATEGORIES = [
  "All Categories",
  "Electronics",
  "Home & Office",
  "Fashion & Travel"
];
