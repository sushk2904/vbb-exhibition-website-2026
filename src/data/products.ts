export interface Product {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  category: 'uniform' | 'accessory';
  price: number;
  sizes?: string[];
  colors?: { name: string; image: string; hex?: string }[];
}

export const uniforms: Product[] = [
  {
    id: 'striped-shirt',
    name: 'Signature Pinstripe Shirt',
    subtitle: 'Classic school pattern',
    image: '/images/regular-uniform.png',
    category: 'uniform',
    price: 599,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'house-uniform',
    name: 'House Uniform Shirt',
    subtitle: 'Crisp cotton finish',
    image: '/images/blue-stripes.png',
    category: 'uniform',
    price: 599,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blue House', image: '/images/blue-stripes.png', hex: '#2C5F8A' },
      { name: 'Red House', image: '/images/red-stripes.png', hex: '#8A2C2C' },
      { name: 'Orange House', image: '/images/orange-stripes.png', hex: '#D97736' },
      { name: 'Green House', image: '/images/green-stripes.png', hex: '#2C8A53' },
      { name: 'Yellow House', image: '/images/yellow-stripes.png', hex: '#D9B436' },
    ],
  },
  {
    id: 'blue-pants',
    name: 'Tailored Navy Trouser',
    subtitle: 'Tailored comfort fit',
    image: '/images/trousers.png',
    category: 'uniform',
    price: 799,
    sizes: ['28', '30', '32', '34', '36', '38'],
  },
  {
    id: 'cream-pants',
    name: 'Premium Weave Cream Trouser',
    subtitle: 'Premium weave blend',
    image: '/images/house-trousers.png',
    category: 'uniform',
    price: 799,
    sizes: ['28', '30', '32', '34', '36', '38'],
  },
];

export const accessories: Product[] = [
  {
    id: 'backpack',
    name: 'Ergonomic Campus Backpack',
    subtitle: 'Durable & ergonomic',
    image: '/images/backpack.png',
    category: 'accessory',
    price: 1199,
    sizes: ['One Size'],
  },
  {
    id: 'black-shoes',
    name: 'Polished Leather Oxford',
    subtitle: 'Polished leather',
    image: '/images/black-shoes.png',
    category: 'accessory',
    price: 899,
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
  },
  {
    id: 'white-shoes',
    name: 'Lightweight Canvas Sneaker',
    subtitle: 'Lightweight canvas',
    image: '/images/white-shoes.png',
    category: 'accessory',
    price: 899,
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
  },
  {
    id: 'tracksuit',
    name: 'School Tracksuit',
    subtitle: 'Premium sportswear',
    image: '/images/tracksuit.png',
    category: 'accessory',
    price: 999,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
];

export const allProducts = [...uniforms, ...accessories];

export const stats = [
  { label: 'Premium Fabric', value: 100, suffix: '%' },
  { label: 'Breathable', value: 98, suffix: '%' },
  { label: 'Easy Care', value: 95, suffix: '%' },
  { label: 'Long Lasting', value: 3, suffix: ' Years+' },
];
