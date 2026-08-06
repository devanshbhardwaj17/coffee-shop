import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Auth from './components/Auth.jsx'
import Menu from './components/Menu.jsx'
import Cart from './components/Cart.jsx'
import MyOrders from './components/MyOrders.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import { KEYS, loadJSON, saveJSON, removeKey, ensureSeedAdmin } from './utils/storage.js'

export default function App() {
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [page, setPage] = useState('menu')
  const [authError, setAuthError] = useState('')
  const [lastOrder, setLastOrder] = useState(null)

  // ---- initial load from localStorage ----
  useEffect(() => {
    ensureSeedAdmin()
    const loadedUsers = loadJSON(KEYS.USERS, [])
    const loadedOrders = loadJSON(KEYS.ORDERS, [])
    setUsers(loadedUsers)
    setOrders(loadedOrders)

    const sessionId = loadJSON(KEYS.SESSION, null)
    if (sessionId) {
      const found = loadedUsers.find((u) => u.id === sessionId)
      if (found) {
        setUser(found)
        setPage(found.role === 'admin' ? 'admin' : 'menu')
        setCart(loadJSON(KEYS.CART_PREFIX + found.id, []))
      }
    }
  }, [])

  // ---- persist cart whenever it changes ----
  useEffect(() => {
    if (user) saveJSON(KEYS.CART_PREFIX + user.id, cart)
  }, [cart, user])

  // ---- auth ----
  const handleSignup = (name, email, password) => {
    if (!name || !email || !password) {
      setAuthError('Please fill in every field.')
      return
    }
    if (users.some((u) => u.email === email)) {
      setAuthError('An account with that email already exists.')
      return
    }
    const newUser = {
      id: 'u-' + Date.now(),
      name,
      email,
      password,
      role: 'customer',
      createdAt: new Date().toISOString(),
    }
    const nextUsers = [...users, newUser]
    setUsers(nextUsers)
    saveJSON(KEYS.USERS, nextUsers)
    loginAs(newUser)
  }

  const handleLogin = (email, password) => {
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      setAuthError('Incorrect email or password.')
      return
    }
    loginAs(found)
  }

  const loginAs = (u) => {
    setUser(u)
    setAuthError('')
    saveJSON(KEYS.SESSION, u.id)
    setCart(loadJSON(KEYS.CART_PREFIX + u.id, []))
    setPage(u.role === 'admin' ? 'admin' : 'menu')
  }

  const handleLogout = () => {
    setUser(null)
    setCart([])
    removeKey(KEYS.SESSION)
    setPage('menu')
  }

  // ---- cart ----
  const addToCart = (item) => {
    setCart((c) => {
      const existing = c.find((x) => x.id === item.id)
      if (existing) return c.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x))
      return [...c, { id: item.id, name: item.name, price: item.price, qty: 1 }]
    })
  }

  const changeQty = (id, qty) => {
    if (qty <= 0) {
      setCart((c) => c.filter((x) => x.id !== id))
      return
    }
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty } : x)))
  }

  const removeFromCart = (id) => setCart((c) => c.filter((x) => x.id !== id))

  // ---- orders ----
  const placeOrder = ({ type, address, phone }) => {
    const total = cart.reduce((s, it) => s + it.price * it.qty, 0)
    const order = {
      id: 'o-' + Date.now(),
      userId: user.id,
      userName: user.name,
      items: cart,
      total,
      type,
      address: type === 'delivery' ? address : '',
      phone: type === 'delivery' ? phone : '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    const nextOrders = [...orders, order]
    setOrders(nextOrders)
    saveJSON(KEYS.ORDERS, nextOrders)
    setLastOrder(order)
    setCart([])
  }

  const updateStatus = (orderId, status) => {
    const nextOrders = orders.map((o) => (o.id === orderId ? { ...o, status } : o))
    setOrders(nextOrders)
    saveJSON(KEYS.ORDERS, nextOrders)
  }

  const cartCount = cart.reduce((s, it) => s + it.qty, 0)

  // Navigating via the navbar always means "leave the just-placed order
  // confirmation behind" so a later visit to Cart shows a fresh cart.
  const navigateTo = (key) => {
    setLastOrder(null)
    setPage(key)
  }

  if (!user) {
    return <Auth onLogin={handleLogin} onSignup={handleSignup} error={authError} setError={setAuthError} />
  }

  return (
    <div className="min-h-screen bg-espresso-900">
      <Navbar user={user} cartCount={cartCount} page={page} setPage={navigateTo} onLogout={handleLogout} />

      {user.role === 'admin' ? (
        <AdminDashboard orders={orders} updateStatus={updateStatus} />
      ) : (
        <>
          {page === 'menu' && <Menu cart={cart} addToCart={addToCart} changeQty={changeQty} />}
          {page === 'cart' && (
            <Cart
              cart={cart}
              changeQty={changeQty}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
              goToMenu={() => setPage('menu')}
              goToOrders={() => setPage('orders')}
              lastOrder={lastOrder}
              clearLastOrder={() => setLastOrder(null)}
            />
          )}
          {page === 'orders' && (
            <MyOrders orders={orders.filter((o) => o.userId === user.id)} goToMenu={() => setPage('menu')} />
          )}
        </>
      )}
    </div>
  )
}
