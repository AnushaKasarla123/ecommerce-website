import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Item from './models/Item.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const items = [
  { title: 'Bluetooth Earbuds', description: 'Noise-cancelling earbuds', price: 3499, category: 'Electronics', image: '/public/images/earbuds.webp' },
  { title: 'Headphones', description: 'Over-ear noise reduction', price: 2999, category: 'Electronics', image: '/public/images/headphones.jpg' },
  { title: 'Black Jeans', description: 'Slim fit black jeans', price: 1199, category: 'Clothing', image: '/public/images/jeans.webp' },
  { title: 'Formal Shoes', description: 'Black leather office shoes', price: 999, category: 'Footwear', image: '/public/images/shoes.webp' },
  { title: 'Steel Bottle', description: '1 litre stainless steel bottle', price: 599, category: 'Home & Kitchen', image: '/public/images/shopping.webp' },
  { title: 'Sneakers', description: 'Athletic casual sneakers', price: 899, category: 'Footwear', image: '/public/images/sneakers.webp' },
  { title: 'Sunglasses', description: 'UV protected stylish shades', price: 349, category: 'Accessories', image: '/public/images/sunglases.webp' }
];

async function seedItems() {
  try {
    await mongoose.connect(MONGO_URI);
    await Item.deleteMany({});
    await Item.insertMany(items);
    console.log('Seeded items:', items.length);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding items:', error);
    process.exit(1);
  }
}

seedItems();
