class Genre < ApplicationRecord
    has_many :books
    has_many :authors, through: :books
    has_many :comments, through: :books

    # validates_presence_of :name
end
