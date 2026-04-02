"use client";
export default class TokenService {
  static setLocalStorage<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;

    const serialized =
      typeof value === "string" ? value : JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
  }

  static getLocalStorage<T = string>(key: string): T | null {
    if (typeof window === "undefined") return null;
    const value = window.localStorage.getItem(key);
    if (value === null) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  static removeLocalStorage(key: string): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  }
}
