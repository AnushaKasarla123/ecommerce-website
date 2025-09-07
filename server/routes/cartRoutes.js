import express from 'express';
import { authRequired } from '../middleware/auth.js';
import Cart from '../models/Cart.js';
import Item from '../models/Item.js';

const router = express.Router();

router.use(authRequired);

// Get current user's cart
router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
      cart = await cart.populate('items.item');
    }
    // Filter out any items where item is null (in case of deleted Items)
    cart.items = cart.items.filter(ci => ci.item !== null);
    res.json(cart);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Add to cart { itemId, qty }
router.post('/add', async (req, res) => {
  try {
    const { itemId, qty = 1 } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    const i = cart.items.findIndex(ci => ci.item.toString() === itemId);
    if (i >= 0) cart.items[i].qty += Number(qty);
    else cart.items.push({ item: itemId, qty: Number(qty) });
    await cart.save();
    const populated = await cart.populate('items.item');
    populated.items = populated.items.filter(ci => ci.item !== null);
    res.json(populated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Update quantity { itemId, qty }
router.patch('/update', async (req, res) => {
  try {
    const { itemId, qty } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const i = cart.items.findIndex(ci => ci.item.toString() === itemId);
    if (i < 0) return res.status(404).json({ error: 'Not in cart' });
    if (qty <= 0) cart.items.splice(i, 1);
    else cart.items[i].qty = Number(qty);
    await cart.save();
    const populated = await cart.populate('items.item');
    populated.items = populated.items.filter(ci => ci.item !== null);
    res.json(populated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Remove from cart { itemId }
router.post('/remove', async (req, res) => {
  try {
    const { itemId } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = cart.items.filter(ci => ci.item.toString() !== itemId);
    await cart.save();
    const populated = await cart.populate('items.item');
    populated.items = populated.items.filter(ci => ci.item !== null);
    res.json(populated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
