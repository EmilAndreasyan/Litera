class BooksController < ApplicationController
    def index
        books = Book.all
        render json: books, include: [:author, :genre], status: 200
    end

    def create
    #   author = Author.find_or_create_by(name: params[:name])
    #   genre = Genre.find_or_create_by(name: params[:name])
    #   book = Book.create(title: params[:title], publisher: params[:publisher], rating: params[:rating], author: author, genre: genre)
    #   render json: book, status: 201      
      author = Author.find_or_create_by(id: params[:id])
      genre = Genre.find_or_create_by(id: params[:id])
      book = Book.create(title: params[:title], publisher: params[:publisher], rating: params[:rating], author: author, genre: genre)
      render json: book, include: [:author, :genre], status: 201
    end

    def destroy
        Book.find_by(id: params[:id]).destroy
        render json: {id: params[:id], message: "The book was succesfully deleted"}, status: 200
        # if book.destroy
        #     render json: {id: params[:id], message: "The book was succesfully deleted"}, status: 200
        # else
        #     render json: {message: "The book was not found"}
        # end
    end

    private

    def author_params
        params.require(:author).permit(:name, :age, :gender, :email)
    end

    def genre_params
        params.require(:genre).permit(:name)
    end

    def book_params
        params.require(:book).permit(:title, :publisher, :rating, :author_id, :genre_id) # parent_id
    end
    
end
