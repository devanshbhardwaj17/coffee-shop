import React, { useState } from 'react'
import { Coffee, Mail, Lock, User as UserIcon } from 'lucide-react'

export default function Auth({ onLogin, onSignup, error, setError }) {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const update = (field) => (e) => {
    setError('')
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const submit = (e) => {
    e.preventDefault()
    if (mode === 'login') {
      onLogin(form.email.trim().toLowerCase(), form.password)
    } else {
      onSignup(form.name.trim(), form.email.trim().toLowerCase(), form.password)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-espresso-900 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center mb-3">
            <Coffee className="text-espresso-950" size={26} />
          </div>
          <h1 className="font-display text-3xl text-cream">Brewhouse</h1>
          <p className="text-cream/50 text-sm mt-1">Order coffee, pickup or delivered.</p>
        </div>

        <div className="bg-espresso-800 border border-espresso-700 rounded-2xl p-6">
          <div className="flex mb-6 bg-espresso-900 rounded-full p-1">
            <button
              onClick={() => { setMode('login'); setError('') }}
              className={`flex-1 py-2 text-sm rounded-full font-medium transition ${mode === 'login' ? 'bg-gold-500 text-espresso-950' : 'text-cream/60'}`}
            >
              Log in
            </button>
            <button
              onClick={() => { setMode('signup'); setError('') }}
              className={`flex-1 py-2 text-sm rounded-full font-medium transition ${mode === 'signup' ? 'bg-gold-500 text-espresso-950' : 'text-cream/60'}`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === 'signup' && (
              <div className="relative">
                <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
                <input
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Full name"
                  className="w-full bg-espresso-900 border border-espresso-600 rounded-lg pl-9 pr-3 py-2.5 text-cream placeholder-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            )}
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
              <input
                required
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="Email address"
                className="w-full bg-espresso-900 border border-espresso-600 rounded-lg pl-9 pr-3 py-2.5 text-cream placeholder-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
              <input
                required
                type="password"
                minLength={4}
                value={form.password}
                onChange={update('password')}
                placeholder="Password"
                className="w-full bg-espresso-900 border border-espresso-600 rounded-lg pl-9 pr-3 py-2.5 text-cream placeholder-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {error && <p className="text-rust text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-400 text-espresso-950 font-semibold rounded-lg py-2.5 text-sm transition"
            >
              {mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-center text-cream/30 text-xs mt-6">
          Shop owner? Log in with <span className="text-cream/50">admin@brewhouse.com</span> / <span className="text-cream/50">admin123</span>
        </p>
      </div>
    </div>
  )
}
