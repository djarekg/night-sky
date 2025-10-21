export const canUseDOM = typeof window !== 'undefined';

export const hasWebGL = !!window.WebGLRenderingContext;

export const supportsVibrationAPI = 'vibrate' in window.navigator;

export const supportsLocalStorage = (() => {
  const isAvailable = (() => {
    if (!canUseDOM) return false;
    try {
      const storage = window.localStorage;
      const testKey = '__supports_local_storage_test__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  })();

  return {
    isAvailable,

    getItem(key: string): string | null {
      if (!isAvailable) return null;
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },

    setItem(key: string, value: string): boolean {
      if (!isAvailable) return false;
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },

    removeItem(key: string): void {
      if (!isAvailable) return;
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* noop */
      }
    },

    clear(): void {
      if (!isAvailable) return;
      try {
        window.localStorage.clear();
      } catch {
        /* noop */
      }
    },
  };
})();
