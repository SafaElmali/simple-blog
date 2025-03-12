module Api
  class PostsController < ApplicationController
    before_action :set_post, only: [:show, :update, :destroy]
    
    # GET /api/posts
    def index
      posts = Post.all.order(created_at: :desc)
      render json: posts
    end
    
    # GET /api/posts/:id
    def show
      render json: @post
    end
    
    # GET /api/posts/by-slug/:slug
    def show_by_slug
      post = Post.friendly.find(params[:slug])
      post.increment!(:views)
      render json: post
    end
    
    # POST /api/posts
    def create
      post = Post.new(post_params)
      
      if post.save
        render json: post, status: :created
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # PUT /api/posts/:id
    def update
      if @post.update(post_params)
        render json: @post
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # DELETE /api/posts/:id
    def destroy
      @post.destroy
      render json: { message: 'Post deleted successfully' }
    end
    
    private
    
    def set_post
      @post = Post.find(params[:id])
    end
    
    def post_params
      params.require(:post).permit(:title, :description, :content, :cover_image, :status, :tags)
    end
  end
end
