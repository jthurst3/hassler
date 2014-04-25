class AddColumnsToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :caption, :text
    add_column :posts, :url, :string
    add_column :posts, :file, :string
  end
end
