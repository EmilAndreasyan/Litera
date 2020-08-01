class Genre < ApplicationRecord
    has_many :books
    has_many :authors, through: :books
    accepts_nested_attributes_for :books
    # has_many :comments, through: :books

    # validates_presence_of :name
end
