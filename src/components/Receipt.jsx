import React from 'react'
import { Coffee } from 'lucide-react'

export default function Receipt({ order }) {
  const date = new Date(order.createdAt)
  return (
    <div className="ticket rounded-sm px-6 py-8 shadow-xl font-body max-w-sm mx-auto my-2">
      <div className="flex flex-col items-center text-center mb-4">
        <Coffee size={22} className="mb-1" />
        <p className="font-display text-lg tracking-wide">Brewhouse</p>
        <p className="text-[11px] uppercase tracking-[0.2em] opacity-60">Order Ticket</p>
      </div>

      <div className="border-t border-dashed border-espresso-900/40 my-3" />

      <div className="text-xs flex justify-between opacity-70 mb-1">
        <span>Order #{order.id.slice(-6).toUpperCase()}</span>
        <span>{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="text-xs opacity-70 mb-3">For: {order.userName}</div>

      <div className="border-t border-dashed border-espresso-900/40 my-3" />

      <div className="space-y-1.5 text-sm">
        {order.items.map((it) => (
          <div key={it.id} className="flex justify-between">
            <span>{it.qty} × {it.name}</span>
            <span>₹{it.price * it.qty}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-espresso-900/40 my-3" />

      <div className="flex justify-between text-sm font-semibold">
        <span>Total</span>
        <span>₹{order.total}</span>
      </div>

      <div className="border-t border-dashed border-espresso-900/40 my-3" />

      <div className="text-xs space-y-1 opacity-80">
        <div className="flex justify-between">
          <span>Fulfilment</span>
          <span className="capitalize">{order.type === 'delivery' ? 'Home delivery' : 'Shop pickup'}</span>
        </div>
        {order.type === 'delivery' && (
          <>
            <div className="flex justify-between gap-4">
              <span>Address</span>
              <span className="text-right">{order.address}</span>
            </div>
            <div className="flex justify-between">
              <span>Phone</span>
              <span>{order.phone}</span>
            </div>
          </>
        )}
        <div className="flex justify-between pt-1">
          <span>Status</span>
          <span className="font-medium">{order.status}</span>
        </div>
      </div>

      <p className="text-center text-[10px] uppercase tracking-[0.25em] opacity-50 mt-5">Thank you, come again</p>
    </div>
  )
}
