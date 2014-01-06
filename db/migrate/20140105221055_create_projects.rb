class CreateProjects < ActiveRecord::Migration
  def change

    create_table :projects do |t|
      t.string :name
      t.text :description
      t.string :url
      t.string :file

      t.timestamps
    end
  end
end
