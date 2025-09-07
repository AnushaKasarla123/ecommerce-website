// itemsRoutes.js
import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// GET /items with filters: q/search, category, minPrice, maxPrice
router.get('/', async (req, res) => {
  try {
    const { q, search, category, minPrice, maxPrice } = req.query;

    const filter = {};
    const keyword = q || search;

    if (keyword) {
      filter.title = { $regex: keyword, $options: 'i' }; // case-insensitive search
    }
    if (category) {
      filter.category = category; // exact match
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
