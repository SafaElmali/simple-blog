const ADMIN_ROOT = "/admin";
const ADMIN_DASHBOARD = `${ADMIN_ROOT}/dashboard`;

export class UrlUtil {
  static buildSitePath() {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  static buildSitePostPath(slug: string) {
    return `${this.buildSitePath()}/${slug}`;
  }

  static buildAdminPath() {
    return `${ADMIN_ROOT}`;
  }

  static buildAdminDashboardPath() {
    return `${ADMIN_DASHBOARD}`;
  }

  static buildAdminLoginPath() {
    return `${ADMIN_ROOT}/login`;
  }

  static buildAdminRegisterPath() {
    return `${ADMIN_ROOT}/register`;
  }

  static buildAdminPostsPath() {
    return `${ADMIN_DASHBOARD}/posts`;
  }

  static buildAdminPostsNewPath() {
    return `${ADMIN_DASHBOARD}/posts/new`;
  }

  static buildAdminPostPath(id: string) {
    return `${ADMIN_DASHBOARD}/posts/${id}`;
  }

  static buildAdminCreatePostPath() {
    return `${ADMIN_DASHBOARD}/posts/new`;
  }
}

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
