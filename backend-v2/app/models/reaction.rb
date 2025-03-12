class Reaction < ApplicationRecord
  belongs_to :post
  
  validates :ip_address, presence: true
  validates :ip_address, uniqueness: { scope: :post_id, message: "has already reacted to this post" }
  
  # Increment post views when reaction is created
  after_create :increment_post_views
  
  private
  
  def increment_post_views
    post.increment!(:views)
  end
end
