class ProjectMigration < ActiveRecord::Migration
  def up
  	add_column :project, :name, :string
  	add_column :project, :url, :string
  	add_column :project, :file, :string

  	remove_column :project, :title
  end
  def down
  	drop_table :project
  end
end
