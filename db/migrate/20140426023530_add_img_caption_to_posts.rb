class AddImgCaptionToPosts < ActiveRecord::Migration
  def change
  	add_column :posts, :imgcaption, :string
  end
end
