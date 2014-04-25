class Project < ActiveRecord::Base
	validates :name, uniqueness: true

	def full_url
		return url if url.start_with? 'http'
		return "projects/#{url}"
	end
end
