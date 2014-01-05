class ProjectsController < ApplicationController
	def new
		@project = Project.new
	end
	def index
		@projects = Project.all
	end

	def show
		@project = Project.find(params[:id])
	end
end
