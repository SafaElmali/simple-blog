class UploadsController < ApplicationController
  # GET /uploads/:filename
  def show
    filename = params[:filename]
    filepath = Rails.root.join('public', 'uploads', filename)
    
    if File.exist?(filepath)
      # Get the file's content type
      content_type = case File.extname(filename).downcase
                     when '.jpg', '.jpeg'
                       'image/jpeg'
                     when '.png'
                       'image/png'
                     when '.webp'
                       'image/webp'
                     else
                       'application/octet-stream'
                     end
      
      send_file filepath, type: content_type, disposition: 'inline'
    else
      render json: { error: 'File not found' }, status: :not_found
    end
  end
end
