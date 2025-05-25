// Define the structure for slide products
export interface SlideProduct {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
}

// Define the structure for regular products
export interface Product {
  title: string;
  price: number;
  rating: number;
  discount: number;
  img: string;
  brand: string
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
  },
  {
    title: "Gertious",
    subtitle: "Exclusive offer -20% off this week",
    description:
      "The watch bracelet gives a much far colder personality. Dress watch style. Swiss made luxury watch. Stainless steel case with a brown leather strap. Scratch resistant sapphire crystal.",
    price: "$350.00",
    image: "/images/slider2.webp",
  },
  {
    title: "Gertious",
    subtitle: "Exclusive of Sales Tax",
    description:
      "The watch bracelet gives a much far colder personality. Dress watch style. Swiss made luxury watch. Stainless steel case with a brown leather strap. Scratch resistant sapphire crystal.",
    price: "$350.00",
    image: "/images/slider3.webp",
  },
];

// Products Data
export const products: Product[] = [
  {
    title: 'Analog Numeral',
    price: 7500.00,
    rating: 5,
    discount: 0,
    img: '/images/product1.webp',
    brand: 'SKMEI'
  },
  {
    title: 'Black Numeral',
    price: 200.00,
    rating: 5,
    discount: 250.00,
    img: '/images/product2.webp',
    brand: 'Orient'
  },
  {
    title: 'Golden Automatic',
    price: 200.00,
    rating: 5,
    discount: 401.00,
    img: '/images/product3.webp',
    brand: 'Bvlgari'
  },
  {
    title: 'Golden Classic',
    price: 200.00,
    rating: 5,
    discount: 401.00,
    img: '/images/product4.webp',
    brand: 'Seiko'
  },
  {
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
  },
  {
    title: 'Golden Classic',
    price: 100.00,
    discount: 200.00,
    rating: 5,
    category: 'Classic',
    img: '/images/product4.webp',
    brand: 'Seiko',
  },
  {
    title: 'Classic Retro',
    price: 100.00,
    discount: 180.00,
    rating: 4,
    category: 'Classic',
    img: '/images/product1.webp',
    brand: 'Timex',
  },
  {
    title: 'Timeless Elegance',
    price: 150.00,
    discount: 220.00,
    rating: 5,
    category: 'Classic',
    img: '/images/product4.webp',
    brand: 'Casio',
  },
  {
    title: 'Vintage Heritage',
    price: 800.00,
    discount: 1200.00,
    rating: 4,
    category: 'Classic',
    img: '/images/product1.webp',
    brand: 'Rolex',
  },
  {
    title: 'Timeless Elegance',
    price: 220.00,
    discount: 150.00,
    rating: 5,
    category: 'Classic',
    img: '/images/product4.webp',
    brand: 'Tissot',
  },
  {
    title: 'Black Numeral',
    price: 200.00,
    discount: 250.00,
    rating: 5,
    category: 'Modern',
    img: '/images/product2.webp',
    brand: 'Orient',
  },
  {
    title: 'Modern Marvel',
    price: 350.00,
    discount: 100.00,
    rating: 4,
    category: 'Modern',
    img: '/images/product4.webp',
    brand: 'TAG Heuer',
  },
  {
    title: 'Urban Steel',
    price: 300.00,
    discount: 120.00,
    rating: 5,
    category: 'Modern',
    img: '/images/product3.webp',
    brand: 'Citizen',
  },
  {
    title: 'Sleek Contemporary',
    price: 400.00,
    discount: 80.00,
    rating: 4,
    category: 'Modern',
    img: '/images/product2.webp',
    brand: 'Rado',
  },
  {
    title: 'Golden Automatic',
    price: 200.00,
    discount: 401.00,
    rating: 5,
    category: 'Special Edition',
    img: '/images/product3.webp',
    brand: 'Bvlgari',
  },
  {
    title: 'Limited Gold',
    price: 600.00,
    discount: 150.00,
    rating: 5,
    category: 'Special Edition',
    img: '/images/product1.webp',
    brand: 'Piaget',
  },
  {
    title: 'Diamond Edge',
    price: 800.00,
    discount: 300.00,
    rating: 5,
    category: 'Special Edition',
    img: '/images/product2.webp',
    brand: 'Patek Philippe',
  },
  {
    title: 'Prestige Series',
    price: 1000.00,
    discount: 500.00,
    rating: 5,
    category: 'Special Edition',
    img: '/images/product4.webp',
    brand: 'Cartier',
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
  },
  {
    title: 'Women\'s Watch',
    subtitle: 'Limited Edition',
    description: '30% Discount',
    image: '/images/category2.webp',
  },
  {
    title: 'Couple Watch',
    subtitle: 'Limited Edition',
    description: '30% Discount',
    image: '/images/category3.webp',
  },
];
