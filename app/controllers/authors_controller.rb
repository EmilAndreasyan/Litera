class AuthorsController < ApplicationController
    
    def index
      render json: Author.all, status: 200
    end

    def create
        # author = Author.new(name: params[:name], age: params[:age], gender: params[:gender], email: params[:email])
        author = Author.new(author_params)
        if author.save
          render json: author, status: 201
        else
          render json: {message: "Something went wrong"}
        end
    end

    private

    def author_params
     params.require(:author).permit(:name, :age, :gender, :email)
    # params.require(:author).permit(:name, :age, :gender, :email, :books: [:title, :publisher, :rating, :genre])
    end
    
    
end
