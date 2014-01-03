module ApplicationHelper
  # Returns the full title on a per-page basis.
  # from http://ruby.railstutorial.org/chapters/rails-flavored-ruby#top
  def full_title(page_title)
    base_title = "Hassler Thurston"
    if page_title.empty?
      base_title
    else
      "#{page_title} | #{base_title}"
    end
  end
end
