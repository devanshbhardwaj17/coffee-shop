import React, { useMemo, useState } from 'react'
import { Store, Bike, IndianRupee, ClipboardList, Clock } from 'lucide-react'

const FLOW = {
  pickup: ['Pending', 'Preparing', 'Ready', 'Completed'],
  delivery: ['Pending', 'Preparing', 'Out for delivery', 'Completed'],
}

const STATUS_STYLES = {
  Pending: 'bg-espresso-700 text-cream/70',
  Preparing: 'bg-gold-600/30 text-gold-400',
  Ready: 'bg-sage-600/30 text-sage-400',
  'Out for delivery': 'bg-sage-600/30 text-sage-400',
  Completed: 'bg-sage-500 text-espresso-950',
}

export default function AdminDashboard({ orders, updateStatus }) {
  const [filter, setFilter] = useState('all') // all | pickup | delivery | active | completed

  const stats = useMemo(() => {
    const revenue = orders.reduce((s, o) => s + o.total, 0)
    const pending = orders.filter((o) => o.status !== 'Completed').length
    return { count: orders.length, revenue, pending }
  }, [orders])

  const filtered = useMemo(() => {
    let list = [...orders]
    if (filter === 'pickup' || filter === 'delivery') list = list.filter((o) => o.type === filter)
    if (filter === 'active') list = list.filter((o) => o.status !== 'Completed')
    if (filter === 'completed') list = list.filter((o) => o.status === 'Completed')
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [orders, filter])

  const nextStatus = (order) => {
    const flow = FLOW[order.type]
    const idx = flow.indexOf(order.status)
    return idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl text-cream mb-1">Order Dashboard</h1>
      <p className="text-cream/50 text-sm mb-8">Everything coming in from the shop, in real time.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={ClipboardList} label="Total orders" value={stats.count} />
        <StatCard icon={Clock} label="In progress" value={stats.pending} />
        <StatCard icon={IndianRupee} label="Revenue" value={`₹${stats.revenue}`} />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          ['all', 'All'],
          ['active', 'Active'],
          ['pickup', 'Pickup'],
          ['delivery', 'Delivery'],
          ['completed', 'Completed'],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === key ? 'bg-gold-500 text-espresso-950' : 'bg-espresso-800 text-cream/60 hover:text-cream'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-cream/40 text-center py-16">No orders here yet.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((o) => {
            const next = nextStatus(o)
            return (
              <div key={o.id} className="bg-espresso-800 border border-espresso-700 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {o.type === 'delivery' ? <Bike size={15} className="text-cream/40" /> : <Store size={15} className="text-cream/40" />}
                      <p className="text-cream font-medium text-sm">Order #{o.id.slice(-6).toUpperCase()}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[o.status]}`}>{o.status}</span>
                    </div>
                    <p className="text-cream/40 text-xs">
                      {o.userName} · {new Date(o.createdAt).toLocaleString()}
                    </p>
                    {o.type === 'delivery' && (
                      <p className="text-cream/40 text-xs mt-1">{o.address} · {o.phone}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gold-400 font-display text-lg">₹{o.total}</p>
                  </div>
                </div>

                <div className="mt-3 border-t border-espresso-700 pt-3 flex flex-wrap items-center justify-between gap-3">
                  <ul className="text-cream/60 text-sm flex flex-wrap gap-x-4 gap-y-1">
                    {o.items.map((it) => (
                      <li key={it.id}>{it.qty}× {it.name}</li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="bg-espresso-900 border border-espresso-600 text-cream text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    >
                      {FLOW[o.type].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {next && (
                      <button
                        onClick={() => updateStatus(o.id, next)}
                        className="text-xs bg-gold-500 hover:bg-gold-400 text-espresso-950 font-medium rounded-lg px-3 py-1.5 whitespace-nowrap"
                      >
                        Mark {next}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-espresso-800 border border-espresso-700 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-espresso-700 flex items-center justify-center text-gold-500">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-cream/50 text-xs">{label}</p>
        <p className="text-cream font-display text-xl">{value}</p>
      </div>
    </div>
  )
}
