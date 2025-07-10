// Define the structure for slide products
export interface SlideProduct {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  slug: string
}



// Define the structure for all products
export interface AllProduct {
  inStock?: number;
  quantity?: number;
  title?: string;
  image?: any;
  id: string;
  brandName: string;
  categoryName: string;
  imageUrl: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  img: string;
  discount: number;
  slug: string;
  type: string;
  stock: number;
  description: string;
  excerpt: string;
  brands: string;
}

export const allProducts: AllProduct[] = [
  {
    id: '1',
    name: 'Analog Numeral',
    price: 7500.00,
    discount: 0,
    rating: 5,
    category: 'Classic',
    categoryName: 'Classic',
    brandName: 'Rolex',
    img: '/images/product1.webp',
    imageUrl: '/images/product1.webp',
    brands: 'SKMEI',
    slug: 'analog-numeral',
    type: 'Analog',
    stock: 10,
    description: 'A timeless design with bold, easy-to-read numerals...',
    excerpt: 'Classic SKMEI watch with clean dial and leather strap.'
  },
  {
    id: '2',
    name: 'Golden Classic',
    price: 100.00,
    discount: 200.00,
    rating: 5,
    category: 'Classic',
    categoryName: 'Classic',
    brandName: 'Seiko',
    img: '/images/product4.webp',
    imageUrl: '/images/product4.webp',
    brands: 'Seiko',
    slug: 'golden-classic',
    type: 'Analog',
    stock: 0,
    description: 'The Seiko Golden Classic is a luxury statement...',
    excerpt: 'Golden Seiko with polished case and quartz precision.'
  },

];


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
