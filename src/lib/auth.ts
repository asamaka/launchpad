"use client";

const OTP_STORAGE_KEY = "weelz_otp";
const USER_STORAGE_KEY = "weelz_user";

export interface User {
  phone: string;
  name?: string;
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(phone: string, otp: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(OTP_STORAGE_KEY, JSON.stringify({ phone, otp, ts: Date.now() }));
}

export function verifyOTP(phone: string, otp: string): boolean {
  if (typeof window === "undefined") return false;
  const stored = sessionStorage.getItem(OTP_STORAGE_KEY);
  if (!stored) return false;

  const data = JSON.parse(stored);
  const isValid = data.phone === phone && data.otp === otp;
  const isExpired = Date.now() - data.ts > 5 * 60 * 1000;

  if (isValid && !isExpired) {
    sessionStorage.removeItem(OTP_STORAGE_KEY);
    return true;
  }

  return false;
}

export function setUser(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) return null;
  return JSON.parse(stored);
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_STORAGE_KEY);
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}
