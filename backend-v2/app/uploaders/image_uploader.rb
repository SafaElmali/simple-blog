class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file

  # Override the directory where uploaded files will be stored.
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Add a white list of extensions which are allowed to be uploaded.
  def extension_allowlist
    %w(jpg jpeg png webp)
  end

  # Limit file size
  def size_range
    0..5.megabytes
  end

  # Create different versions of your uploaded files:
  version :thumb do
    process resize_to_fit: [100, 100]
  end

  version :medium do
    process resize_to_fit: [400, 400]
  end

  # Add a white list of extensions which are allowed to be uploaded.
  def content_type_allowlist
    /image\/(jpe?g|png|webp)/
  end

  # Override the filename of the uploaded files:
  def filename
    "#{secure_token}#{File.extname(original_filename)}" if original_filename.present?
  end

  protected
  
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
end
