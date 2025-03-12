class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.text :content, null: false
      t.string :cover_image, null: false
      t.string :slug, null: false
      t.integer :views, default: 0
      t.string :status, default: 'draft'
      t.string :tags, array: true, default: []

      t.timestamps
    end
    add_index :posts, :slug, unique: true
  end
end
