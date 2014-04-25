Hassler::Application.routes.draw do
  # get "welcome/index"
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # first REST resource
  root 'static_pages#home'
  match '/home',    to: 'static_pages#home',    via: 'get'
  match '/help',    to: 'static_pages#help',    via: 'get'
  match '/about',   to: 'static_pages#about',   via: 'get'
  match '/contact', to: 'static_pages#contact', via: 'get'
  match '/acknowledgements', to: 'static_pages#acknowledgements', via: 'get'
  # match '/cv',      to: 'static_pages#cv',      via: 'get'
  # match '/resume',  to: 'static_pages#resume',  via: 'get'

  # projects
  match '/projects',to: 'projects#index', via: 'get'
  match '/projects/:project',to:'projects#show', via: 'get'

  
  # match '/hacc',    to: 'projects#hacc',        via: 'get'
  # match '/automata',to: 'projects#automata',    via: 'get'
  # match '/cribbage',to: 'projects#cribbage',    via: 'get'
  # blog
  # match '/blog',    to: 'posts#index',          via: 'get'
  # match '/blog',    to: 'posts#create',         via: 'post'
  # match '/blog/new',to: 'posts#new',            via: 'get'
  # match '/blog/:id/edit',to:'posts#edit',       via: 'get'
  # match '/blog/:id',to: 'posts#show',           via: 'get'
  # match '/blog/:id',to: 'posts#destroy',        via: 'delete'

  # controller :posts do
  #   get 'posts'     => :index
  #   post 'posts'    => :create
  #   get 'posts/new' => :new, as: 'new_post'
  #   get 'posts/:url/edit' => :edit, as: 'edit_post'
  #   get 'posts/:url'      => :show, as: 'post'
  #   patch 'posts/:url' => :update
  #   put 'posts/:url'   => :update
  #   delete 'posts/:url/delete'   => :destroy
  # end

  resources :posts

  # root to: "welcome#index"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # old routes
  get '/connectfour' => redirect("/projects/connectfour")
  get '/hacc' => redirect("/projects/hacc")
  get '/automata' => redirect("/projects/automata")
end
