class BooksController < ApplicationController
    def index
        books = Book.all
        render json: books, include: [:author, :genre], status: 200
    end

    def create
      author = Author.find_by(name: params[:name].downcase)
      genre = Genre.find_by(name: params[:name])
      book = Book.create(title: params[:title], publisher: params[:publisher], rating: params[:rating], author: author, genre: genre)
      render json: book, status: 201
    end

    def destroy
        book = Book.find(params[:id])
        render json: {id: params[:id], message: "The book was succesfully deleted"}, status: 200
    end
    
end
