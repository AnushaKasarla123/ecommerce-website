# ShopSwift — online shopping

A minimal e-commerce single-page app fulfilling the required features.

## Tech
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT
- **Frontend**: React (Vite), Tailwind CSS
- **Auth**: JWT (stored in localStorage for simplicity)
- **Cart**: Server-side (MongoDB) to persist after logout

## Run Locally
### Server
```bash
cd server
cp .env.example .env   # set MONGO_URI, JWT_SECRET, CLIENT_ORIGIN
npm install
npm run seed           # optional: seed demo items
npm run dev
```
### Client
```bash
cd client
npm install
echo "VITE_API_BASE=http://localhost:5000" > .env
npm run dev
```

## Deploy (Fast)
- **MongoDB Atlas**: Create a free cluster. Get `MONGO_URI`.
- **Render.com** (Server):
  - New Web Service → Node
  - Build command: `npm install`
  - Start command: `npm start`
  - Env: `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN` = your frontend URL
- **Vercel** (Client):
  - Import the `client` folder as a project
  - Env: `VITE_API_BASE` = your Render server URL

## API Summary
- `POST /api/auth/signup` { name, email, password }
- `POST /api/auth/login` { email, password }
- `GET /api/items?q=&category=&minPrice=&maxPrice`
- `POST /api/items`, `PUT /api/items/:id`, `DELETE /api/items/:id`
- `GET /api/cart` (auth)
- `POST /api/cart/add` { itemId, qty } (auth)
- `PATCH /api/cart/update` { itemId, qty } (auth)
- `POST /api/cart/remove` { itemId } (auth)

## Pro Tips to Look Professional
- Add your logo and colors in `client/src/index.css` and `App.jsx`.
- Replace seed images with your product images.
- Add basic form validation and loading states.
- Optional: host images on Cloudinary.
