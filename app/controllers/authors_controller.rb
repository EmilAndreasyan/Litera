class AuthorsController < ApplicationController
    
    def index
        render json: Author.all
    end

    def create
        author = Author.new(name: params[:name], age: params[:age], gender: params[:gender], email: params[:email])
        if author.save
          flash[:success] = "Author successfully created"
          render json: author
        else
          flash[:error] = "Something went wrong"
        end
    end
    
    
end
