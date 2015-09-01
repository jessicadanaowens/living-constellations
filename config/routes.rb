Rails.application.routes.draw do
  get '/' => "home#index"
  get '/new' => "home#new"
end
