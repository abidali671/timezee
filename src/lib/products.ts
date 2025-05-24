interface slideProductsT {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
}

export const slideProducts: slideProductsT[] = [
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


export const products = [{
  title: 'Analog Numeral',
  price: '$7500.00',
  rating: 5,
  discount: '0',
  img: '/images/product1.webp'
}, {
  title: 'Black Numeral',
  price: '$200.00',
  rating: 5,
  discount: '$250.00',
  img: '/images/product2.webp'
}, {
  title: 'Golden Automatic',
  price: '$200.00',
  rating: 5,
  discount: '$401.00',
  img: '/images/product3.webp'
}, {
  title: 'Golden Classic',
  price: '$200.00',
  rating: 5,
  discount: '$401.00',
  img: '/images/product4.webp'
}, {
  title: 'Golden Classic',
  price: '$200.00',
  rating: 5,
  discount: '$401.00',
  img: '/images/product4.webp'
}]
export interface ProductT {
  title: string,
  price: string,
  rating: number,
  category: string,
  img: string,
  discount: string
}
export const allProducts: ProductT[] = [
  {
    title: 'Analog Numeral',
    price: '$7500.00',
    rating: 5,
    discount: '0',
    category: 'Classic',
    img: '/images/product1.webp',
  }, {
    title: 'Analog Numeral',
    price: '$7500.00',
    rating: 5,
    discount: '0',
    category: 'Classic',
    img: '/images/product1.webp',
  },
  {
    title: 'Golden Classic',
    price: '$200.00',
    rating: 5,
    discount: '$401.00',
    category: 'Classic',
    img: '/images/product4.webp',
  },
  {
    title: 'Classic Retro',
    price: '$180.00',
    rating: 4,
    discount: '$100.00',
    category: 'Classic',
    img: '/images/product1.webp',
  },
  {
    title: 'Timeless Elegance',
    price: '$220.00',
    rating: 5,
    discount: '$150.00',
    category: 'Classic',
    img: '/images/product4.webp',
  },
  {
    title: 'Black Numeral',
    price: '$200.00',
    rating: 5,
    discount: '$250.00',
    category: 'Modern',
    img: '/images/product2.webp',
  },
  {
    title: 'Modern Marvel',
    price: '$350.00',
    rating: 4,
    discount: '$100.00',
    category: 'Modern',
    img: '/images/product4.webp',
  },
  {
    title: 'Urban Steel',
    price: '$300.00',
    rating: 5,
    discount: '$120.00',
    category: 'Modern',
    img: '/images/product3.webp',
  },
  {
    title: 'Sleek Contemporary',
    price: '$400.00',
    rating: 4,
    discount: '$80.00',
    category: 'Modern',
    img: '/images/product2.webp',
  },
  {
    title: 'Golden Automatic',
    price: '$200.00',
    rating: 5,
    discount: '$401.00',
    category: 'Special Edition',
    img: '/images/product3.webp',
  },
  {
    title: 'Limited Gold',
    price: '$600.00',
    rating: 5,
    discount: '$150.00',
    category: 'Special Edition',
    img: '/images/product1.webp',
  },
  {
    title: 'Diamond Edge',
    price: '$800.00',
    rating: 5,
    discount: '$300.00',
    category: 'Special Edition',
    img: '/images/product2.webp',
  },
  {
    title: 'Prestige Series',
    price: '$1000.00',
    rating: 5,
    discount: '$500.00',
    category: 'Special Edition',
    img: '/images/product4.webp',
  }
]