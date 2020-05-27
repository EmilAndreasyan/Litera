Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  resources :authors, only: [:index, :create]
  resources :books, only: [:index, :create, :update, :destroy]
  resources :genres, only: [:index]
  

  # get '/test' => 'application#test'
end
