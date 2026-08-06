import React, { useState } from 'react'
import { Minus, Plus, Trash2, Store, Bike, CheckCircle2 } from 'lucide-react'
import Receipt from './Receipt'

export default function Cart({ cart, changeQty, removeFromCart, placeOrder, goToMenu, goToOrders, lastOrder, clearLastOrder }) {
  const [type, setType] = useState('pickup') // 'pickup' | 'delivery'
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const total = cart.reduce((sum, it) => sum + it.price * it.qty, 0)

  const submit = () => {
    if (cart.length === 0) return
    if (type === 'delivery' && (!address.trim() || !phone.trim())) {
      setError('Please add a delivery address and phone number.')
      return
    }
    setError('')
    placeOrder({ type, address: address.trim(), phone: phone.trim() })
  }

  if (lastOrder) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col items-center text-center mb-6">
          <CheckCircle2 className="text-sage-500 mb-3" size={40} />
          <h1 className="font-display text-3xl text-cream">Order placed!</h1>
          <p className="text-cream/50 text-sm mt-1">
            {lastOrder.type === 'delivery' ? "We'll bring it to your door." : 'Head to the counter when it’s ready.'}
          </p>
        </div>
        <Receipt order={lastOrder} />
        <div className="flex justify-center gap-3 mt-8">
          <button onClick={goToMenu} className="px-5 py-2.5 rounded-lg bg-espresso-700 text-cream text-sm hover:bg-espresso-600">
            Order more
          </button>
          <button
            onClick={() => { clearLastOrder(); goToOrders() }}
            className="px-5 py-2.5 rounded-lg bg-gold-500 text-espresso-950 text-sm font-medium hover:bg-gold-400"
          >
            View my orders
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl text-cream mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-cream/50 mb-4">Your cart is empty.</p>
          <button onClick={goToMenu} className="px-5 py-2.5 rounded-lg bg-gold-500 text-espresso-950 text-sm font-medium hover:bg-gold-400">
            Browse the menu
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {cart.map((it) => (
              <div key={it.id} className="flex items-center justify-between bg-espresso-800 border border-espresso-700 rounded-xl p-4">
                <div>
                  <p className="text-cream font-medium">{it.name}</p>
                  <p className="text-cream/40 text-sm">₹{it.price} each</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-espresso-700 rounded-lg">
                    <button onClick={() => changeQty(it.id, it.qty - 1)} className="w-8 h-8 flex items-center justify-center text-cream hover:bg-espresso-600 rounded-l-lg">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-cream text-sm">{it.qty}</span>
                    <button onClick={() => changeQty(it.id, it.qty + 1)} className="w-8 h-8 flex items-center justify-center text-cream hover:bg-espresso-600 rounded-r-lg">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-gold-400 font-semibold w-16 text-right">₹{it.price * it.qty}</span>
                  <button onClick={() => removeFromCart(it.id)} className="text-cream/40 hover:text-rust">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-espresso-800 border border-espresso-700 rounded-2xl p-6 h-fit space-y-5">
            <div>
              <p className="text-cream/60 text-xs uppercase tracking-wider mb-2">How would you like it?</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setType('pickup')}
                  className={`flex flex-col items-center gap-1 py-3 rounded-lg border text-sm ${type === 'pickup' ? 'border-gold-500 bg-espresso-700 text-cream' : 'border-espresso-600 text-cream/50'}`}
                >
                  <Store size={18} /> Shop pickup
                </button>
                <button
                  onClick={() => setType('delivery')}
                  className={`flex flex-col items-center gap-1 py-3 rounded-lg border text-sm ${type === 'delivery' ? 'border-gold-500 bg-espresso-700 text-cream' : 'border-espresso-600 text-cream/50'}`}
                >
                  <Bike size={18} /> Home delivery
                </button>
              </div>
            </div>

            {type === 'delivery' && (
              <div className="space-y-2">
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Delivery address"
                  rows={2}
                  className="w-full bg-espresso-900 border border-espresso-600 rounded-lg px-3 py-2 text-cream placeholder-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full bg-espresso-900 border border-espresso-600 rounded-lg px-3 py-2 text-cream placeholder-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            )}

            <div className="border-t border-espresso-700 pt-3 flex justify-between text-cream">
              <span className="text-sm text-cream/60">Total</span>
              <span className="font-display text-xl">₹{total}</span>
            </div>

            {error && <p className="text-rust text-sm">{error}</p>}

            <button
              onClick={submit}
              className="w-full bg-gold-500 hover:bg-gold-400 text-espresso-950 font-semibold rounded-lg py-2.5 text-sm transition"
            >
              Place order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
