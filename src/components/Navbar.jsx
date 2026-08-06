import React from 'react'
import { Coffee, ShoppingBag, ClipboardList, LayoutDashboard, LogOut } from 'lucide-react'

export default function Navbar({ user, cartCount, page, setPage, onLogout }) {
  const navBtn = (key, label, Icon, badge) => (
    <button
      onClick={() => setPage(key)}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition
        ${page === key ? 'bg-gold-500 text-espresso-950' : 'text-cream/80 hover:text-cream hover:bg-espresso-700'}`}
    >
      <Icon size={16} />
      <span className="hidden sm:inline">{label}</span>
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-rust text-cream text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  )

  return (
    <header className="sticky top-0 z-30 bg-espresso-900/95 backdrop-blur border-b border-espresso-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => setPage(user?.role === 'admin' ? 'admin' : 'menu')}
          className="flex items-center gap-2 text-cream"
        >
          <Coffee size={22} className="text-gold-500" />
          <span className="font-display text-xl tracking-wide">Brewhouse</span>
        </button>

        {user && (
          <nav className="flex items-center gap-1 sm:gap-2">
            {user.role === 'admin' ? (
              navBtn('admin', 'Dashboard', LayoutDashboard, 0)
            ) : (
              <>
                {navBtn('menu', 'Menu', Coffee, 0)}
                {navBtn('cart', 'Cart', ShoppingBag, cartCount)}
                {navBtn('orders', 'My Orders', ClipboardList, 0)}
              </>
            )}
            <div className="hidden md:flex items-center gap-2 pl-3 ml-1 border-l border-espresso-700 text-cream/70 text-sm">
              <span>{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              title="Log out"
              className="flex items-center gap-1 px-3 py-2 rounded-full text-sm text-cream/70 hover:text-cream hover:bg-espresso-700"
            >
              <LogOut size={16} />
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
