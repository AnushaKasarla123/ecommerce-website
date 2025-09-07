import { useState } from 'react'
import { api } from '../lib/api'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try{
      const { data } = await api.post('/auth/signup', { name, email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/products')
    }catch(err){
      setError(err.response?.data?.error || 'Signup failed')
    }
  }

  return (
    <div className="max-w-md mx-auto card mt-8">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="btn w-full">Signup</button>
        <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="underline">Login</Link></p>
      </form>
    </div>
  )
}
