// src/utils/miniStore.js
class MiniStore {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ttlMs) {
    const expiresAt = Date.now() + ttlMs;

    this.store.set(key, { value, expiresAt });

    setTimeout(() => {
      const item = this.store.get(key);
      if (item && item.expiresAt <= Date.now()) {
        this.store.delete(key);
      }
    }, ttlMs);
  }

  get(key) {
    const item = this.store.get(key);
    if (!item) return null;

    if (item.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }

    return item.value;
  }

  delete(key) {
    this.store.delete(key);
  }
}

const miniStore = new MiniStore();

module.exports = miniStore;
