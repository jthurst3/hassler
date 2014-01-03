class PostsController < ApplicationController
	# create a new post
	def new
		@post = Post.new
	end
	def create
		@post = Post.new(params[:post].permit(:title, :text))
		if @post.save
			redirect_to @post
		else
			render 'new'
		end
	end
	def show
		@post = Post.find(params[:id])
	end

	# edit posts
	def edit
		@post = Post.find(params[:id])
	end
	def update
		@post = Post.find(params[:id])
		
		if @post.update(params[:post].permit(:title, :text))
			redirect_to @post
		else
			render 'edit'
		end
	end

	# delete posts
	def destroy
		@post = Post.find(params[:id])
		@post.destroy

		redirect_to posts_path
	end

	# index
	def index
		@posts = Post.all
	end

	private
	def post_params
		params.require(:post).permit(:title, :text)
	end
end
