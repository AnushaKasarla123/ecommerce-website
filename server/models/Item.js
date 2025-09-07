import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, index: true },
  image: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
