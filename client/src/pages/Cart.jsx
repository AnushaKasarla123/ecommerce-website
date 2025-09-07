import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (e) {
      setError('Login to view your cart');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateQty = async (itemId, qty) => {
    if (qty < 0) return; // prevent negative quantities
    const { data } = await api.patch('/cart/update', { itemId, qty });
    setCart(data);
  };

  const removeItem = async (itemId) => {
    const { data } = await api.post('/cart/remove', { itemId });
    setCart(data);
  };

  const total =
    cart.items?.reduce(
      (sum, ci) => sum + ((ci.item?.price ?? 0) * ci.qty),
      0
    ) ?? 0;

  if (error) return <div className="card">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 card">
          {cart.items?.length === 0 && <p>No items yet.</p>}
          <ul className="space-y-3">
            {cart.items
              ?.filter((ci) => ci.item) // filter out null items to avoid errors
              .map((ci) => (
                <li key={ci.item._id} className="flex items-center gap-3">
                  {ci.item.image && (
                    <img
                      src={ci.item.image}
                      alt={ci.item.title}
                      className="w-20 h-16 object-cover rounded-xl"
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold">{ci.item.title}</div>
                    <div className="text-sm text-gray-600">₹{ci.item.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn"
                      onClick={() => updateQty(ci.item._id, ci.qty - 1)}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{ci.qty}</span>
                    <button
                      className="btn"
                      onClick={() => updateQty(ci.item._id, ci.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button className="btn" onClick={() => removeItem(ci.item._id)}>
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="card h-max">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span className="font-bold">₹{total}</span>
          </div>
          <button className="btn w-full">Checkout (demo)</button>
        </div>
      </div>
    </div>
  );
}
