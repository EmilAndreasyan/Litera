class Book < ApplicationRecord
  belongs_to :author
  belongs_to :genre
  # has_many :comments

  validates_presence_of :title, :rating, :publisher
end
