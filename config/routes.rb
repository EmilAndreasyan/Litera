Rails.application.routes.draw do
  
  resources :books, only: [:index, :create, :destroy]
  resources :authors, only: [:index, :create] do 
    resources :books, only: [:index, :create, :destroy]
  end
  resources :genres, only: [:index]
  resources :comments, only: [:index]
  

  get '/test' => 'application#test'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
