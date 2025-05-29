// Define the structure for slide products
export interface SlideProduct {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  slug: string
}

// Define the structure for regular products
export interface Product {
  title: string;
  price: number;
  rating: number;
  discount: number;
  img: string;
  brand: string
  slug: string
}

// Define the structure for all products
export interface AllProduct {
  title: string;
  price: number;
  rating: number;
  category: string;
  img: string;
  discount: number;
  brand: string;
  slug: string
  type: string;
  availability: number;
}

// Define the structure for banners
export interface Banner {
  title: string;
  description: string;
  img: string;
}

// Define the structure for logos
export interface Logo {
  src: string;
  alt: string;
}

// Define the structure for product categories
export interface ProductCategory {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  slug: string
}
// Slide Products Data
export const slideProducts: SlideProduct[] = [
  {
    title: "Alertzy",
    subtitle: "Exclusive offer -20% off this week",
    description:
      "The watch bracelet gives a much far colder personality. Dress watch style. Swiss made luxury watch. Stainless steel case with a brown leather strap. Scratch resistant sapphire crystal.",
    price: "$350.00",
    image: "/images/slider1.webp",
    slug: "alertzy",
  },
  {
    title: "Gertious",
    subtitle: "Exclusive offer -20% off this week",
    description:
      "The watch bracelet gives a much far colder personality. Dress watch style. Swiss made luxury watch. Stainless steel case with a brown leather strap. Scratch resistant sapphire crystal.",
    price: "$350.00",
    image: "/images/slider2.webp",
    slug: "gertious-exclusive-offer",
  },
  {
    title: "Gertious",
    subtitle: "Exclusive of Sales Tax",
    description:
      "The watch bracelet gives a much far colder personality. Dress watch style. Swiss made luxury watch. Stainless steel case with a brown leather strap. Scratch resistant sapphire crystal.",
    price: "$350.00",
    image: "/images/slider3.webp",
    slug: "gertious-sales-tax",
  },
];

// Products Data
export const products: Product[] = [
  {
    slug: 'analog-numeral',
    title: 'Analog Numeral',
    price: 7500.00,
    rating: 5,
    discount: 0,
    img: '/images/product1.webp',
    brand: 'SKMEI'
  },
  {
    slug: 'black-numeral',
    title: 'Black Numeral',
    price: 200.00,
    rating: 5,
    discount: 250.00,
    img: '/images/product2.webp',
    brand: 'Orient'
  },
  {
    slug: 'golden-automatic',
    title: 'Golden Automatic',
    price: 200.00,
    rating: 5,
    discount: 401.00,
    img: '/images/product3.webp',
    brand: 'Bvlgari'
  },
  {
    slug: 'golden-classic-seiko-1',
    title: 'Golden Classic',
    price: 200.00,
    rating: 5,
    discount: 401.00,
    img: '/images/product4.webp',
    brand: 'Seiko'
  },
  {
    slug: 'golden-classic-seiko-2',
    title: 'Golden Classic',
    price: 200.00,
    rating: 5,
    discount: 401.00,
    img: '/images/product4.webp',
    brand: 'Seiko'
  }
];

// All Products Data
export const allProducts: AllProduct[] = [
  {
    title: 'Analog Numeral',
    price: 7500.00,
    discount: 0,
    rating: 5,
    category: 'Classic',
    img: '/images/product1.webp',
    brand: 'SKMEI',
    slug: 'analog-numeral',
    type: 'Analog',
    availability: 10,
  },
  {
    title: 'Golden Classic',
    price: 100.00,
    discount: 200.00,
    rating: 5,
    category: 'Classic',
    img: '/images/product4.webp',
    brand: 'Seiko',
    slug: 'golden-classic',
    type: 'Analog',
    availability: 0,
  },
  {
    title: 'Classic Retro',
    price: 100.00,
    discount: 180.00,
    rating: 4,
    category: 'Classic',
    img: '/images/product1.webp',
    brand: 'Timex',
    slug: 'classic-retro',
    type: 'Analog',
    availability: 15,
  },
  {
    title: 'Timeless Elegance',
    price: 150.00,
    discount: 220.00,
    rating: 5,
    category: 'Classic',
    img: '/images/product4.webp',
    brand: 'Casio',
    slug: 'timeless-elegance',
    type: 'Analog',
    availability: 20,
  },
  {
    title: 'Vintage Heritage',
    price: 800.00,
    discount: 1200.00,
    rating: 4,
    category: 'Classic',
    img: '/images/product1.webp',
    brand: 'Rolex',
    slug: 'vintage-heritage',
    type: 'Automatic',
    availability: 5,
  },
  {
    title: 'Timeless Elegance',
    price: 220.00,
    discount: 150.00,
    rating: 5,
    category: 'Classic',
    img: '/images/product4.webp',
    brand: 'Tissot',
    slug: 'timeless-elegance-tissot',
    type: 'Analog',
    availability: 25,
  },
  {
    title: 'Black Numeral',
    price: 200.00,
    discount: 250.00,
    rating: 5,
    category: 'Modern',
    img: '/images/product2.webp',
    brand: 'Orient',
    slug: 'black-numeral',
    type: 'Digital',
    availability: 30,
  },
  {
    title: 'Modern Marvel',
    price: 350.00,
    discount: 100.00,
    rating: 4,
    category: 'Modern',
    img: '/images/product4.webp',
    brand: 'TAG Heuer',
    slug: 'modern-marvel',
    type: 'Automatic',
    availability: 0,
  },
  {
    title: 'Urban Steel',
    price: 300.00,
    discount: 120.00,
    rating: 5,
    category: 'Modern',
    img: '/images/product3.webp',
    brand: 'Citizen',
    slug: 'urban-steel',
    type: 'Analog',
    availability: 12,
  },
  {
    title: 'Sleek Contemporary',
    price: 400.00,
    discount: 80.00,
    rating: 4,
    category: 'Modern',
    img: '/images/product2.webp',
    brand: 'Rado',
    slug: 'sleek-contemporary',
    type: 'Digital',
    availability: 8,
  },
  {
    title: 'Golden Automatic',
    price: 200.00,
    discount: 401.00,
    rating: 5,
    category: 'Special Edition',
    img: '/images/product3.webp',
    brand: 'Bvlgari',
    slug: 'golden-automatic',
    type: 'Automatic',
    availability: 18,
  },
  {
    title: 'Limited Gold',
    price: 600.00,
    discount: 150.00,
    rating: 5,
    category: 'Special Edition',
    img: '/images/product1.webp',
    brand: 'Piaget',
    slug: 'limited-gold',
    type: 'Analog',
    availability: 0,
  },
  {
    title: 'Diamond Edge',
    price: 800.00,
    discount: 300.00,
    rating: 5,
    category: 'Special Edition',
    img: '/images/product2.webp',
    brand: 'Patek Philippe',
    slug: 'diamond-edge',
    type: 'Automatic',
    availability: 10,
  },
  {
    title: 'Prestige Series',
    price: 1000.00,
    discount: 500.00,
    rating: 5,
    category: 'Special Edition',
    img: '/images/product4.webp',
    brand: 'Cartier',
    slug: 'prestige-series',
    type: 'Automatic',
    availability: 3,
  }
];

// Banners Data
export const banners: Banner[] = [
  {
    title: 'Versits',
    description:
      'Rhuyese ser sagittis magna. Sed consequat, leo eget bibendum sodales.',
    img: '/images/banner_286c6b34-88cb-465a-a2e8-2a5faf8295df.webp',
  },
  {
    title: '2019 Novalties',
    description:
      'Hiue wghres rhuyres magna. Sed consequat, leo eget bibendum sodales.',
    img: '/images/Gallery2.webp',
  },
  {
    title: 'Javelin',
    description:
      'Kiures guyrese ngittis magna. Sed consequat, leo eget bibendum sodales.',
    img: '/images/Gallery3.webp',
  },
  {
    title: 'Voltamic',
    description:
      'Biurese guyrese orese jittis magna. Sed consequat, leo eget bibendum sodales.',
    img: '/images/Gallery6.webp',
  },
  {
    title: 'Cerutaio',
    description:
      'Ulreser tellus marquestis magna. Sed consequat, leo eget bibendum sodales.',
    img: '/images/Gallery5.webp',
  },
  {
    title: 'Zerairo',
    description:
      'Biurese hierese ciseittis magna. Sed consequat, leo eget bibendum sodales.',
    img: '/images/Gallery4.webp',
  },
];


// Logos Data
export const logos: Logo[] = [
  {
    src: "https://timzee-demo.myshopify.com/cdn/shop/files/client1_6e709373-d4d6-4fee-905c-f47825f2b2a6.png?v=1614300918",
    alt: "Client 1 Logo",
  },
  {
    src: "https://timzee-demo.myshopify.com/cdn/shop/files/client3_50109f47-cc2b-438c-80d1-d5a6d59c4064.png?v=1614300918",
    alt: "Client 3 Logo",
  },
  {
    src: "https://timzee-demo.myshopify.com/cdn/shop/files/client2_f5e7538d-5a02-406d-9b6f-8fabc6e087f4.png?v=1614300918",
    alt: "Client 2 Logo",
  },
  {
    src: "https://timzee-demo.myshopify.com/cdn/shop/files/client4_ff7c56f6-25ab-4616-904a-e1c7b2812066.png?v=1614300918",
    alt: "Client 4 Logo",
  },
  {
    src: "https://timzee-demo.myshopify.com/cdn/shop/files/client4_ff7c56f6-25ab-4616-904a-e1c7b2812066.png?v=1614300918",
    alt: "Client 4 Logo",
  },
];

// Product Categories Data
export const productCategories: ProductCategory[] = [
  {
    title: 'Men\'s Watch',
    subtitle: 'Flash Sale',
    description: '25% Discount',
    image: '/images/category1.webp',
    slug: 'mens-watch',
  },
  {
    title: 'Women\'s Watch',
    subtitle: 'Limited Edition',
    description: '30% Discount',
    image: '/images/category2.webp',
    slug: 'womens-watch',
  },
  {
    title: 'Couple Watch',
    subtitle: 'Limited Edition',
    description: '30% Discount',
    image: '/images/category3.webp',
    slug: 'couple-watch',
  },
];
