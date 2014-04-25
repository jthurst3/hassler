class Post < ActiveRecord::Base
	validates :title, presence: true,
                    length: { minimum: 5 }
    validates :text, presence: true

    def full_url
		return url if url.start_with? 'http'
		return "posts/#{url}"
	end

	def to_param
		"#{url}"
	end
end
