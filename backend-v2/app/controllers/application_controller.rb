class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  
  # Health check endpoint
  def health_check
    render json: {
      status: "ok",
      message: "Biiheev API is running",
      environment: Rails.env,
      timestamp: Time.current.iso8601
    }
  end
  
  # Handle 404 errors
  def not_found
    render json: {
      status: "error",
      message: "Route not found"
    }, status: :not_found
  end
end
