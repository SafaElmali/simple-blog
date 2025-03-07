export type DashboardStats = {
  totalPosts: number;
  totalViews: number;
  totalUsers: number;
  viewsOverTime: Array<{
    views: number;
    createdAt: string;
  }>;
  popularPosts: Array<{
    _id: string;
    title: string;
    views: number;
    slug: string;
  }>;
};
