class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :content, :cover_image, :slug, :views, :status, :tags, :created_at, :updated_at
end
