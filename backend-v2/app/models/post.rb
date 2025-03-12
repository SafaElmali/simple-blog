class Post < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  
  validates :title, presence: true
  validates :description, presence: true
  validates :content, presence: true
  validates :cover_image, presence: true
  validates :slug, presence: true, uniqueness: true
  
  enum status: { draft: 'draft', published: 'published' }
  
  has_many :reactions, dependent: :destroy
  
  # Generate a new friendly ID if title changes
  def should_generate_new_friendly_id?
    title_changed? || super
  end
  
  # Convert string tags to array and vice versa
  def tags=(value)
    if value.is_a?(String)
      super(value.split(',').map(&:strip))
    else
      super
    end
  end
end
