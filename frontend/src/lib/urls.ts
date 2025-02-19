const ADMIN_ROOT = "/admin" as const;
const ADMIN_DASHBOARD = `${ADMIN_ROOT}/dashboard` as const;

export const urls = {
  admin: {
    root: ADMIN_ROOT,
    login: `${ADMIN_ROOT}/login`,
    dashboard: {
      root: ADMIN_DASHBOARD,
      posts: {
        root: `${ADMIN_DASHBOARD}/posts`,
        new: `${ADMIN_DASHBOARD}/posts/new`,
        edit: (id: string) => `${ADMIN_DASHBOARD}/posts/${id}`,
      },
      settings: `${ADMIN_DASHBOARD}/settings`,
    },
  },
} as const;

export type Urls = typeof urls; 