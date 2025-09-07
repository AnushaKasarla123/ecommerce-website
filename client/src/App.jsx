import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function App(){
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'))
  const navigate = useNavigate()

  useEffect(() => {
    const onStorage = () => setUser(JSON.parse(localStorage.getItem('user') || 'null'))
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const logout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('user');
    navigate('/login')
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/products" className="font-bold text-xl">ShopSwift</Link>
          <div className="flex gap-4 items-center">
            <Link to="/products" className="hover:underline">Products</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            {user ? (
              <>
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <button className="btn" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/signup" className="btn">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
      <footer className="text-center text-sm text-gray-500 py-6">© {new Date().getFullYear()} ShopSwift</footer>
    </div>
  )
}
