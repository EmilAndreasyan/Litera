class Books {
	constructor(id, title, publisher, rating, author, genre) {
		// id for identification, so that we can update or destroy
		this.id = id;
		this.title = title;
		this.publisher = publisher;
		this.rating = rating;
		this.author = author;
		this.genre = genre;
		AppContainer.books.push(this); // continuation, once instances of Books class (this) is created, push them into AppContainer class' static books array
	}

	static delete(bookId) {
        AppContainer.books = AppContainer.books.filter((el) => parseInt(bookId, 10) !== el.id);
	}

	static byAuthor(authorName) {
		return AppContainer.books.filter((book) => book.author.name === authorName);
	}
}
