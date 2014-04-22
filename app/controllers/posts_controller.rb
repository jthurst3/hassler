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
		
		# from http://stackoverflow.com/questions/17713570/undefined-method-permit-for-nilnilclass-in-rails-guide-section-5-7
		if params.has_key?(:post)
			@post.update(params[:post].permit(:title, :text))
			redirect_to @post
		else
			render 'edit'
		end
	end

	# delete posts
	def destroy
		@post = Post.find(params[:id])
		@post.destroy

		redirect_to blog_path
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
