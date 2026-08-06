import React, { useState } from 'react'
import { ChevronDown, Store, Bike } from 'lucide-react'
import Receipt from './Receipt'

const STATUS_STYLES = {
  Pending: 'bg-espresso-700 text-cream/70',
  Preparing: 'bg-gold-600/30 text-gold-400',
  Ready: 'bg-sage-600/30 text-sage-400',
  'Out for delivery': 'bg-sage-600/30 text-sage-400',
  Completed: 'bg-sage-500 text-espresso-950',
}

export default function MyOrders({ orders, goToMenu }) {
  const [openId, setOpenId] = useState(null)
  const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl text-cream mb-8">My Orders</h1>

      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-cream/50 mb-4">You haven't ordered anything yet.</p>
          <button onClick={goToMenu} className="px-5 py-2.5 rounded-lg bg-gold-500 text-espresso-950 text-sm font-medium hover:bg-gold-400">
            Browse the menu
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((o) => {
            const open = openId === o.id
            return (
              <div key={o.id} className="bg-espresso-800 border border-espresso-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenId(open ? null : o.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    {o.type === 'delivery' ? <Bike size={16} className="text-cream/40" /> : <Store size={16} className="text-cream/40" />}
                    <div>
                      <p className="text-cream text-sm font-medium">Order #{o.id.slice(-6).toUpperCase()} · ₹{o.total}</p>
                      <p className="text-cream/40 text-xs">{new Date(o.createdAt).toLocaleString()} · {o.items.length} item(s)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[o.status] || 'bg-espresso-700 text-cream/70'}`}>
                      {o.status}
                    </span>
                    <ChevronDown size={16} className={`text-cream/40 transition ${open ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {open && (
                  <div className="border-t border-espresso-700 py-4">
                    <Receipt order={o} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
