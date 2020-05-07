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
      book = Book.new(title: params[:title], publisher: params[:publisher], rating: params[:rating], author_id: author, genre_id: genre)
      if book.save
      render json: book, include: [:author, :genre], status: 201
      else
        render json: {message: "The book wan not instantiated"}
      end
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
    
end
