module Api
  class BaseController < ApplicationController
    before_action :authenticate_user!, except: [:health_check]
    
    # Handle ActiveRecord::RecordNotFound
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    
    # Handle unauthorized access
    rescue_from Pundit::NotAuthorizedError, with: :unauthorized
    
    private
    
    def not_found
      render json: { error: 'Resource not found' }, status: :not_found
    end
    
    def unauthorized
      render json: { error: 'Unauthorized access' }, status: :unauthorized
    end
    
    def admin_only!
      unless current_user&.admin?
        render json: { error: 'Admin access required' }, status: :forbidden
        return
      end
    end
  end
end
