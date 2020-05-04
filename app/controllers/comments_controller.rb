class CommentsController < ApplicationController
    def index
        render json: Comment.all, :include => :book
    end
    
end
