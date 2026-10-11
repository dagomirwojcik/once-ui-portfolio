/**
 * Client-side utility functions
 */

/**
 * Limits text to a maximum number of words
 * @param text - The text to truncate
 * @param maxWords - Maximum number of words allowed
 * @returns Truncated text with "..." if it exceeds the word limit
 */
export function limitWords(text: string, maxWords: number): string {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}
