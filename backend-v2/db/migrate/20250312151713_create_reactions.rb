class CreateReactions < ActiveRecord::Migration[7.2]
  def change
    create_table :reactions do |t|
      t.references :post, null: false, foreign_key: true
      t.string :ip_address

      t.timestamps
    end
  end
end
