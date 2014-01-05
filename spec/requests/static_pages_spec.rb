require 'spec_helper'

describe "Static pages" do
  subject { page }

  describe "Home page" do
    before { visit root_path }

    it { should have_content('J. Hassler Thurston') }

    it {should have_title(full_title('')) }

    it { should_not have_title('Home | ')}
  end

  describe "Help page" do
    before { visit help_path }

    it { should have_content('Help') }

    it {should have_title(full_title('')) }

    it { should have_title('Help | ')}
  end

  describe "About page" do
    before { visit about_path }

    it { should have_content('About Me') }

    it {should have_title(full_title('')) }

    it { should have_title('About | ')}
  end

  describe "Contact page" do
    before { visit contact_path }

    it { should have_content('Contact')}
    it {should have_title(full_title(''))}
    it {should have_title('Contact | ')}
  end

  describe "Acknowledgements page" do
    before { visit acknowledgements_path }

    it { should have_content('Acknowledgements')}
    it {should have_title(full_title(''))}
    it {should have_title('Acknowledgements | ')}
  end

  describe "Projects page" do
    before { visit projects_path }

    it { should have_content('Projects')}
    it {should have_title(full_title(''))}
    it {should have_title('Projects | ')}
  end

  describe "CV page" do
    before { visit cv_path }

    it { should have_content('CV')}
    it {should have_title(full_title(''))}
    it {should have_title('CV | ')}
  end

  describe "Resume page" do
    before { visit resume_path }

    it { should have_content('Resume')}
    it {should have_title(full_title(''))}
    it {should have_title('Resume | ')}
  end
end







