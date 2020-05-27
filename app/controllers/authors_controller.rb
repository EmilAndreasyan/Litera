class AuthorsController < ApplicationController
    
    def index
      render json: Author.all, status: 200
    end

    def create
      # author = Author.create(id: params[:id], name: params[:name], age: params[:age], gender: params[:gender], email: params[:email])
      # render json: author, status: 201
        author = Author.new(name: params[:name], age: params[:age], gender: params[:gender], email: params[:email])
        if author.save
          render json: author, status: 201
        else
          render json: {message: "Something went wrong"}
        end
    end
    
    
end
