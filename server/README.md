# E-commerce Server (Express + MongoDB)

## Setup
1. `cp .env.example .env` and set values
2. `npm install`
3. `npm run dev` (or `npm run start` in production)

## Routes

### Auth
- `POST /api/auth/signup` { name, email, password } → `{ token, user }`
- `POST /api/auth/login` { email, password } → `{ token, user }`

### Items (with filters)
- `GET /api/items?q=&category=&minPrice=&maxPrice=&sort=price|createdAt&order=asc|desc`
- `GET /api/items/:id`
- `POST /api/items` (create)
- `PUT /api/items/:id` (update)
- `DELETE /api/items/:id` (delete)

### Cart (requires Bearer token)
- `GET /api/cart` → current user's cart
- `POST /api/cart/add` { itemId, qty }
- `PATCH /api/cart/update` { itemId, qty }
- `POST /api/cart/remove` { itemId }

Cart persists in DB, so items remain after logout.
