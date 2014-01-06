class CreateProjects < ActiveRecord::Migration
  def change
  	drop_table :projects

    create_table :projects do |t|
      t.string :name
      t.text :description
      t.string :url
      t.string :file

      t.timestamps
    end
  end
end
