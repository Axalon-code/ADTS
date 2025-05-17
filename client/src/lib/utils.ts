import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  // Basic UK phone number formatting
  if (!phone) return "";
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Check if it's a UK number
  if (cleaned.startsWith("44") && cleaned.length >= 11) {
    return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 6)} ${cleaned.substring(6, 9)} ${cleaned.substring(9)}`;
  }
  
  // Default formatting
  if (cleaned.length === 11) {
    return `${cleaned.substring(0, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`;
  }
  
  return phone;
}

export function validateEmail(email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}
