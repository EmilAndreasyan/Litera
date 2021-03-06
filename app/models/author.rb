class Author < ApplicationRecord
    has_many :books
    has_many :genres, through: :books
    accepts_nested_attributes_for :books
    # has_many :comments, through: :books

  validates_presence_of :name, :age, :gender, :email
  validates_uniqueness_of :email, :name
end
