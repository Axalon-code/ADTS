import xss from "xss";

/**
 * Sanitizes a string to prevent XSS attacks
 * Removes potentially dangerous HTML/JavaScript from user input
 */
export function sanitizeString(input: string | undefined | null): string {
  if (!input) return "";
  return xss(input, {
    whiteList: {}, // No HTML tags allowed by default
    stripIgnoreTag: true, // Strip all unknown tags
    stripIgnoreTagBody: ["script", "style"], // Remove script and style tags completely
  });
}

/**
 * Sanitizes an object's string properties
 * Useful for sanitizing form data objects
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  
  for (const key in sanitized) {
    const value = sanitized[key];
    if (typeof value === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeString(value);
    }
  }
  
  return sanitized;
}

/**
 * Sanitizes HTML content while allowing safe formatting tags
 * Use this for rich text fields like blog post content
 */
export function sanitizeRichText(input: string | undefined | null): string {
  if (!input) return "";
  return xss(input, {
    whiteList: {
      p: [],
      br: [],
      b: [],
      strong: [],
      i: [],
      em: [],
      u: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      ul: [],
      ol: [],
      li: [],
      a: ["href", "title", "target"],
      blockquote: [],
      code: [],
      pre: [],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script", "style", "iframe", "object", "embed"],
  });
}
