import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateReadingTime = (content: string): number => {
  // Strip HTML tags
  const strippedContent = content.replace(/<[^>]*>/g, "");

  // Average reading speed (words per minute)
  const wordsPerMinute = 200;

  // Count words (split by whitespace)
  const wordCount = strippedContent.trim().split(/\s+/).length;

  // Calculate reading time in minutes
  return Math.ceil(wordCount / wordsPerMinute);
};
