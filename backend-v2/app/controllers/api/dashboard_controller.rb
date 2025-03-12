module Api
  class DashboardController < BaseController
    before_action :authenticate_user!
    
    # GET /api/dashboard/stats
    def stats
      total_posts = Post.count
      published_posts = Post.where(status: 'published').count
      draft_posts = Post.where(status: 'draft').count
      total_views = Post.sum(:views)
      
      # Get most viewed posts
      most_viewed_posts = Post.order(views: :desc).limit(5)
      
      # Get recent posts
      recent_posts = Post.order(created_at: :desc).limit(5)
      
      render json: {
        posts: {
          total: total_posts,
          published: published_posts,
          draft: draft_posts
        },
        views: total_views,
        most_viewed_posts: most_viewed_posts,
        recent_posts: recent_posts
      }
    end
  end
end
