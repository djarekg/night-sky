import { canUseDOM } from './browser.client.js';

const isAvailable = (() => {
  if (!canUseDOM) return false;
  try {
    const storage = window.sessionStorage;
    const testKey = '__supports_session_storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
})();

/**
 * Safe access to sessionStorage.
 */
const safeSessionStorage = {
  getItem: (key: string) => {
    if (!isAvailable) return null;
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    if (!isAvailable) return false;
    try {
      window.sessionStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },

  removeItem: (key: string) => {
    if (!isAvailable) return;
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      /* noop */
    }
  },

  clear: () => {
    if (!isAvailable) return;
    try {
      window.sessionStorage.clear();
    } catch {
      /* noop */
    }
  },
};

export default safeSessionStorage;
