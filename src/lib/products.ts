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
  description: string
}
export interface CartItem extends AllProduct {
  quantity: number;
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
    description: 'A timeless design with bold, easy-to-read numerals, this SKMEI Analog Numeral watch blends classic sophistication with modern precision. Crafted from durable stainless steel, the clean white dial is paired with a sleek leather strap for ultimate comfort. With water resistance and a reliable quartz movement, it ensures both style and functionality for every occasion. Whether at a formal event or a casual outing, this watch is the perfect complement to any wardrobe, embodying elegance in its purest form.'
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
    description: 'The Seiko Golden Classic is a luxury statement at an affordable price point. Its golden stainless steel case glimmers with elegance, while the minimalist dial features simple yet sophisticated markers. Powered by Seiko’s renowned quartz movement, this watch delivers both precision and reliability. The polished bracelet adds a refined touch, making it suitable for both formal affairs and everyday wear. Whether attending a gala or a business meeting, this watch enhances your outfit with a timeless touch of gold.'
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
    description: 'Channeling vintage flair, the Timex Classic Retro is an ode to retro aesthetics combined with modern technology. Featuring a bold and striking design, the watch boasts a clean, retro-style dial with a mix of sleek hour markers and numerals. The durable brass case and genuine leather band ensure both comfort and longevity. Equipped with a reliable quartz movement, this watch is an ideal companion for those who appreciate classic styles with a contemporary twist. Perfect for casual wear, this watch gives you the nostalgia of the past with the reliability of today.'
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
    description: 'The Casio Timeless Elegance combines sleek simplicity with precision craftsmanship. The stainless steel case is paired with a refined black leather strap, creating an effortless look of sophistication. The dial, with its elegant design and clear markers, provides easy readability while maintaining a minimalist style. Ideal for both professional and casual settings, this watch is a symbol of enduring quality and style. Casio’s commitment to precision ensures that this watch keeps perfect time, all while adding a subtle touch of class to any ensemble.'
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
    description: 'The Rolex Vintage Heritage is a true collector’s piece, offering a rare blend of luxury, craftsmanship, and history. Powered by an automatic movement, this masterpiece offers an intricate dial design that showcases fine details and meticulous construction. The iconic Rolex stainless steel case offers unparalleled durability and style, while the rich leather strap adds comfort and class. Ideal for watch enthusiasts and connoisseurs, this watch not only tells time but tells a story of fine heritage and craftsmanship that Rolex is known for.'
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
    description: 'The Tissot Timeless Elegance is a perfect balance of sophistication and practicality. Its sleek, polished stainless steel case provides a modern feel, while the subtle dial with a mix of Roman and index markers offers easy timekeeping. Featuring a high-quality Swiss quartz movement, the watch offers exceptional accuracy and reliability. The smooth leather strap enhances comfort, making it suitable for all-day wear. Whether worn at work or during an evening out, this watch’s understated elegance will leave a lasting impression.'
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
    description: 'With its bold black digital display, the Orient Black Numeral is designed for those who want a modern and futuristic look. This digital watch offers advanced features such as a chronograph, date display, and stopwatch, all displayed on a high-contrast black face for easy reading. The durable resin case ensures that the watch can withstand daily wear and tear, making it ideal for active individuals. Whether you’re hitting the gym or heading to the office, this watch delivers both function and style with its sharp design and practical features.'
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
    description: 'The TAG Heuer Modern Marvel is the perfect embodiment of cutting-edge design and expert craftsmanship. Featuring a sleek stainless steel case, this automatic watch incorporates a clean, modern dial with sharp hour markers and a date function. Its automatic movement ensures precise timekeeping without the need for batteries, while the elegant bracelet strap offers a comfortable fit. Ideal for those who appreciate performance and aesthetics, the Modern Marvel is perfect for both business and casual occasions, making it an essential part of any watch collection.'
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
    description: 'The Citizen Urban Steel is designed for those who appreciate bold, contemporary style. Its stainless steel case and bracelet are complemented by a striking dial with large, easy-to-read numerals and markers. Equipped with Citizen’s Eco-Drive technology, this watch is powered by light, meaning you’ll never need to replace a battery. The watch’s water resistance and durable build make it an excellent choice for everyday wear, offering both functionality and a modern edge. Whether you’re at a business meeting or a casual night out, this watch keeps you looking sharp.'
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
    description: 'The Rado Sleek Contemporary is a fusion of style, sophistication, and technology. Featuring a bold, minimalist digital display, this watch integrates advanced functions such as alarm, stopwatch, and calendar, all housed in a sleek, high-tech ceramic case. Its scratch-resistant surface ensures it stays looking pristine, even with daily use. The comfortable and stylish strap makes it a versatile accessory that pairs well with any outfit. Whether you’re out for a run or attending a formal event, this watch brings a fresh, futuristic touch to your wrist.'
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
    description: 'The Bvlgari Golden Automatic is a true collector’s dream, offering a distinctive design in a limited-edition gold-plated stainless steel case. The watch’s automatic movement ensures accurate timekeeping without the need for batteries, making it both sustainable and reliable. The bold golden dial exudes luxury, complemented by a rich leather strap that offers a comfortable, premium feel. The sleek design and elegant detailing make this a perfect addition to any luxury watch collection, whether worn to a gala or as a statement piece on an everyday basis.'
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
    description: 'The Piaget Limited Gold is a rare and exclusive timepiece, designed for those who appreciate the highest level of craftsmanship. This watch features a gold-plated stainless steel case, polished to perfection, and a simple yet elegant dial with Roman numeral markers. The luxurious leather strap enhances the overall aesthetic, offering both comfort and style. Powered by a precision quartz movement, this watch ensures impeccable timekeeping. Its limited-edition status makes it a must-have for collectors and a perfect gift for those with a taste for fine luxury.'
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
    description: 'The Patek Philippe Diamond Edge is the epitome of luxury and sophistication, featuring a stunning automatic movement and an exquisite dial adorned with diamonds. The polished stainless steel case enhances the dazzling appearance, while the high-quality leather strap offers both comfort and durability. This limited-edition watch is perfect for those who seek to make a bold, elegant statement. Whether attending a special event or adding to your collection, the Diamond Edge offers exceptional quality and unparalleled style.'
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
    description: 'The Cartier Prestige Series is the ultimate expression of luxury and elegance. With a refined automatic movement, this timepiece boasts exquisite craftsmanship and meticulous attention to detail. The stainless steel case is paired with a polished leather strap for a sophisticated look that exudes timeless appeal. The dial, with its elegant Roman numeral markers and classic design, adds a sense of grandeur to any occasion. Whether you’re celebrating an achievement or simply indulging in luxury, the Prestige Series is the perfect watch to complement your lifestyle.'
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
