import React from 'react'
import { Plus, Minus } from 'lucide-react'
import { MENU, CATEGORIES } from '../data/menu'

export default function Menu({ cart, addToCart, changeQty }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-gold-500 text-xs tracking-[0.2em] uppercase mb-2">Freshly ground, every order</p>
          <h1 className="font-display text-4xl text-cream">The Menu</h1>
        </div>
        <div className="flex items-end gap-1 opacity-70">
          <span className="w-1 h-3 bg-cream/40 rounded-full steam-1" />
          <span className="w-1 h-4 bg-cream/40 rounded-full steam-2" />
          <span className="w-1 h-3 bg-cream/40 rounded-full steam-3" />
        </div>
      </div>

      {CATEGORIES.map((cat) => {
        const items = MENU.filter((m) => m.category === cat)
        return (
          <section key={cat} className="mb-12">
            <h2 className="font-display text-xl text-gold-400 mb-4 border-b border-espresso-700 pb-2">{cat}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => {
                const inCart = cart.find((c) => c.id === item.id)
                return (
                  <div
                    key={item.id}
                    className="bg-espresso-800 border border-espresso-700 rounded-2xl p-5 flex flex-col justify-between hover:border-gold-600 transition"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg text-cream">{item.name}</h3>
                        <span className="text-gold-400 font-semibold text-sm whitespace-nowrap">₹{item.price}</span>
                      </div>
                      <p className="text-cream/50 text-sm mt-2 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="mt-4">
                      {!inCart ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full flex items-center justify-center gap-1.5 bg-espresso-700 hover:bg-gold-500 hover:text-espresso-950 text-cream text-sm font-medium rounded-lg py-2 transition"
                        >
                          <Plus size={15} /> Add to cart
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-espresso-700 rounded-lg px-2 py-1">
                          <button
                            onClick={() => changeQty(item.id, inCart.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-espresso-600 text-cream"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-cream text-sm font-medium">{inCart.qty} in cart</span>
                          <button
                            onClick={() => changeQty(item.id, inCart.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-espresso-600 text-cream"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
