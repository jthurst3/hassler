class AddImgCaptionToPosts < ActiveRecord::Migration
  def change
  	remove_column :posts, :image_caption, :string
  	add_column :posts, :imgcaption, :string
  end
end
