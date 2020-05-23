# frozen_string_literal: true

Rails.application.routes.draw do
  # Route the login to authenticate method.
  post 'auth/login', to: 'authentication#authenticate'

  # Route signup to the create user method.
  post 'signup', to: 'users#create'

  # Establish a route of 1:n party:pcs
  resources :parties do
    resources :player_characters
  end

  # Establish a route of 1:n opponent:npcs
  resources :opponents do
    resources :non_player_characters
  end
end
