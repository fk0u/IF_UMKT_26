/* Hallmark · client-security: secureStorage.ts · theme: Custom Indigo-Midnight */

// Encryption/Obfuscation key
const SECRET_KEY = "infotik26_ultra_secure_caching_and_transaction_key";

/**
 * Encrypts an object/string to an obfuscated Base64 XOR cipher representation.
 */
export function encryptData(data: any): string {
  try {
    const stringified = JSON.stringify(data);
    let result = '';
    for (let i = 0; i < stringified.length; i++) {
      const charCode = stringified.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      result += String.fromCharCode(charCode);
    }
    // Encode safely to Base64 (supporting unicode characters)
    return btoa(unescape(encodeURIComponent(result)));
  } catch (e) {
    return '';
  }
}

/**
 * Decrypts an obfuscated Base64 XOR cipher string back to its original object format.
 */
export function decryptData(encrypted: string): any {
  try {
    if (!encrypted) return null;
    const decoded = decodeURIComponent(escape(atob(encrypted)));
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      result += String.fromCharCode(charCode);
    }
    return JSON.parse(result);
  } catch (e) {
    return null;
  }
}

export const secureStorage = {
  setItem(key: string, value: any): void {
    const encrypted = encryptData(value);
    localStorage.setItem(key, encrypted);
  },

  getItem<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return decryptData(raw) as T;
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  }
};
