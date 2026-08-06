// Small wrapper around localStorage so the rest of the app never has to
// worry about JSON parsing, missing keys, or a browser that blocks storage.

export const KEYS = {
  USERS: 'brewhouse_users',
  SESSION: 'brewhouse_session', // id of the logged-in user
  ORDERS: 'brewhouse_orders',
  CART_PREFIX: 'brewhouse_cart_', // + userId
}

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (err) {
    console.error('Could not read', key, err)
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (err) {
    console.error('Could not save', key, err)
    return false
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    console.error('Could not remove', key, err)
  }
}

// Seeds a default restaurant-owner account the first time the app runs,
// so there's always a way into the admin dashboard.
export function ensureSeedAdmin() {
  const users = loadJSON(KEYS.USERS, [])
  const hasAdmin = users.some((u) => u.role === 'admin')
  if (!hasAdmin) {
    users.push({
      id: 'admin-seed',
      name: 'Shop Owner',
      email: 'admin@brewhouse.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString(),
    })
    saveJSON(KEYS.USERS, users)
  }
}
