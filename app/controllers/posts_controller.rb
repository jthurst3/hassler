class PostsController < ApplicationController

	before_filter :authenticate, except: [:show, :index]

	def authenticate
		if Rails.env == 'development'
			return true
		end
		authenticate_or_request_with_http_basic do |username, pass|
			username == ENV['hassler_blog_username'] and pass == ENV['hassler_blog_pass']
		end
	end

	# create a new post
	def new
		@post = Post.new
	end
	def create
		@post = Post.new(params[:post].permit(:title, :text, :caption, :url, :file))
		if @post.save
			redirect_to @post
		else
			render 'new'
		end
	end
	def show
		@post = Post.find_by_url(params[:id])
		# @post = Post.find(params[:id])
	end

	# edit posts
	def edit
		@post = Post.find_by_url(params[:id])
		# @post = Post.find(params[:id])
	end
	def update
		@post = Post.find_by_url(params[:id])
		# @post = Post.find(params[:id])
		
		# from http://stackoverflow.com/questions/17713570/undefined-method-permit-for-nilnilclass-in-rails-guide-section-5-7
		if params.has_key?(:post)
			@post.update(params[:post].permit(:title, :text, :caption, :url, :file))
			redirect_to @post
		else
			render 'edit'
		end
	end

	# delete posts
	def destroy
		@post = Post.find_by_url(params[:id])
		# @post = Post.find(params[:id])
		@post.destroy

		redirect_to posts_path
	end

	# index
	def index
		@posts = Post.all
	end

	private
	def post_params
		params.require(:post).permit(:title, :text, :caption, :url, :file)
	end
end
