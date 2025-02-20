const ADMIN_ROOT = "/admin";
const ADMIN_DASHBOARD = `${ADMIN_ROOT}/dashboard`;

export class UrlUtil {
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
