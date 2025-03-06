/**
 * Formats a URL by ensuring it has the HTTPS protocol
 * @param url The URL to format
 * @returns The formatted URL with HTTPS protocol if no protocol was present
 */
export const formatUrl = (url: string): string => {
  if (!url) return "";
  
  // Remove leading/trailing whitespace
  url = url.trim();
  
  // Check if the URL already has a protocol
  if (!/^https?:\/\//i.test(url)) {
    // Add https:// if no protocol is present
    url = `https://${url}`;
  }
  
  return url;
}; 