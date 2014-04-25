class ProjectsController < ApplicationController
	def new
		@project = Project.new
	end
	def index
		@projects = Project.all
	end

	def show
		@project = Project.find_by!(url: params[:project])
		render template: 'projects/' + @project.full_url
	end
end
