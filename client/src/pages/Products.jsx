import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Products() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');

  // Load all products initially
  const load = async () => {
    try {
      const { data } = await api.get('/items');
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage('Failed to load items.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Group products by category, add "All" category for all items
  const groupedItems = items.reduce(
    (groups, item) => {
      const cat = item.category || 'Uncategorized';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
      return groups;
    },
    { All: items }
  );

  const categories = Object.keys(groupedItems);

  // Add to cart function (assumes you have this method)
  const addToCart = async (itemId) => {
    try {
      await api.post('/cart/add', { itemId, qty: 1 });
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch (e) {
      setMessage(e.response?.data?.error || 'Failed to add to cart.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div>
      {message && <p className="text-green-700 mb-4">{message}</p>}

      {/* Category Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCurrentCategory(cat)}
            className={`btn ${cat === currentCategory ? 'font-bold underline' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid for Selected Category */}
      {groupedItems[currentCategory]?.length ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{currentCategory}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedItems[currentCategory].map((item) => (
              <div key={item._id} className="card p-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-xl mb-3 w-full h-40 object-cover"
                  />
                )}
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">₹{item.price}</span>
                  <button className="btn" onClick={() => addToCart(item._id)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No products found in this category.</p>
      )}
    </div>
  );
}
