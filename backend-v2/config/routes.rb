Rails.application.routes.draw do
  devise_for :users, skip: :all
  
  # API routes
  namespace :api do
    # Test route
    get "test", to: proc { |env| [200, {"Content-Type" => "application/json"}, ["{\"message\":\"API is working!\"}"]] }
    
    # Auth routes
    post "auth/register", to: "auth#register"
    post "auth/login", to: "auth#login"
    post "auth/admin/create-first", to: "auth#create_first_admin"
    post "auth/admin", to: "auth#create_admin"
    
    # Post routes
    resources :posts
    get "posts/by-slug/:slug", to: "posts#show_by_slug"
    
    # Dashboard routes
    get "dashboard/stats", to: "dashboard#stats"
    
    # Reaction routes
    get "reactions/:post_id/status", to: "reactions#status"
    post "reactions/:post_id/increment", to: "reactions#increment"
    delete "reactions/:post_id/reset", to: "reactions#reset"
    
    # File upload
    post "upload", to: "uploads#create"
  end
  
  # Health check
  root to: "application#health_check"
  
  # Serve static files from /public/uploads
  get "/uploads/:filename", to: "uploads#show"
end
