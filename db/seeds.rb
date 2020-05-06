# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# binding.pry
Comment.destroy_all
Book.destroy_all
Author.destroy_all
Genre.destroy_all



@author1 = Author.create(name: Faker::Name.name, gender: Faker::Gender.binary_type, age: rand(18..80), email: Faker::Internet.email)
@author2 = Author.create(name: Faker::Name.name, gender: Faker::Gender.binary_type, age: rand(18..80), email: Faker::Internet.email)
@author3 = Author.create(name: Faker::Name.name, gender: Faker::Gender.binary_type, age: rand(18..80), email: Faker::Internet.email)

@genre1 = Genre.create(name: Faker::Book.genre)
@genre2 = Genre.create(name: Faker::Book.genre)
@genre3 = Genre.create(name: Faker::Book.genre)
@genre4 = Genre.create(name: Faker::Book.genre)
@genre5 = Genre.create(name: Faker::Book.genre)

@book1 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author1, genre: @genre1)
@book2 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author2, genre: @genre2)
@book3 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author3, genre: @genre3)
@book4 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author1, genre: @genre4)
@book5 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author2, genre: @genre5)
@book6 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author3, genre: @genre1)
@book7 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author1, genre: @genre2)
@book8 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author2, genre: @genre3)
@book9 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author3, genre: @genre4)
@book10 = Book.create(title: Faker::Book.title, rating: rand(1..5), publisher: Faker::Book.publisher, author: @author1, genre: @genre5)

@comment1 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book1)
@comment2 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book2)
@comment3 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book3)
@comment4 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book4)
@comment4 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book5)
@comment5 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book6)
@comment6 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book7)
@comment7 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book8)
@comment8 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book9)
@comment9 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book10)
@comment10 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book1)
@comment11 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book2)
@comment12 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book3)
@comment13 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book4)
@comment14 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book5)
@comment15 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book6)
@comment16 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book7)
@comment17 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book8)
@comment18 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book9)
@comment19 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book10)
@comment20 = Comment.create(date: Faker::Date.between(from: 2.years.ago, to: Date.today), likes: rand(0..5000), dislikes: rand(0..5000), book: @book1)

