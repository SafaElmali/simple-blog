module Api
  class UploadsController < BaseController
    skip_before_action :authenticate_user!, only: [:create]
    
    # POST /api/upload
    def create
      if params[:image].blank?
        return render json: { error: 'No file uploaded' }, status: :bad_request
      end
      
      # Check file type
      allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      unless allowed_types.include?(params[:image].content_type)
        return render json: { error: 'Only image files are allowed' }, status: :bad_request
      end
      
      # Check file size (5MB limit)
      if params[:image].size > 5.megabytes
        return render json: { error: 'File size exceeds 5MB limit' }, status: :bad_request
      end
      
      # Generate a unique filename
      filename = "#{Time.now.to_i}#{File.extname(params[:image].original_filename)}"
      filepath = Rails.root.join('public', 'uploads', filename)
      
      # Create uploads directory if it doesn't exist
      FileUtils.mkdir_p(Rails.root.join('public', 'uploads')) unless Dir.exist?(Rails.root.join('public', 'uploads'))
      
      # Save the file
      File.open(filepath, 'wb') do |file|
        file.write(params[:image].read)
      end
      
      render json: { url: "/uploads/#{filename}" }
    end
  end
end
