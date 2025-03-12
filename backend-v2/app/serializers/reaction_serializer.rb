class ReactionSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :created_at
  
  belongs_to :post
end
