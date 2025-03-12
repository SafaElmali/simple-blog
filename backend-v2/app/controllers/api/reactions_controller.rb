module Api
  class ReactionsController < BaseController
    skip_before_action :authenticate_user!, only: [:status]
    before_action :set_post
    
    # GET /api/reactions/:post_id/status
    def status
      ip_address = request.remote_ip
      reaction = @post.reactions.find_by(ip_address: ip_address)
      
      render json: { 
        liked: reaction.present?,
        count: @post.reactions.count
      }
    end
    
    # POST /api/reactions/:post_id/increment
    def increment
      ip_address = request.remote_ip
      reaction = @post.reactions.find_or_initialize_by(ip_address: ip_address)
      
      if reaction.new_record? && reaction.save
        render json: { 
          liked: true,
          count: @post.reactions.count
        }
      else
        render json: { 
          liked: true,
          count: @post.reactions.count,
          message: 'Already liked'
        }
      end
    end
    
    # DELETE /api/reactions/:post_id/reset
    def reset
      ip_address = request.remote_ip
      reaction = @post.reactions.find_by(ip_address: ip_address)
      
      if reaction&.destroy
        render json: { 
          liked: false,
          count: @post.reactions.count
        }
      else
        render json: { 
          liked: false,
          count: @post.reactions.count,
          message: 'Not liked yet'
        }
      end
    end
    
    private
    
    def set_post
      @post = Post.find(params[:post_id])
    end
  end
end
