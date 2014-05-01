class CreatePostsTable < ActiveRecord::Migration
  def change
    create_table :posts do |t|
    	t.string   :title
	    t.text     :text
	    t.text     :caption
	    t.string   :url
	    t.string   :file
	    t.string   :imgcaption

	    t.timestamps
    end
  end
end
