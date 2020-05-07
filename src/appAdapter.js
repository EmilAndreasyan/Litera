class AppAdapter {
	url = 'http://localhost:3000'; // this -> instance, this.constructor -> class, static -> class method visible across the js files
	static domElements = {
		newBookForm: document.getElementById('new-book-form')
	}

	bindEventListeners() {
		AppAdapter.domElements.newBookForm.addEventListener('submit', () => this.createBook(event)); // when submit, arrow function
	}

	getAuthors() {
		fetch(this.url + '/authors')
			.then((response) => response.json())
			.then((data) => {
				data.forEach((author) => {
					new Authors(author.id, author.name, author.gender, author.age, author.email);
				});
				AppContainer.showAuthors();
			})
			.catch((err) => console.log(err));
	}

	getBooks() {
		fetch(this.url + '/books') // GETting data from url/books
			.then((response) => response.json())
			.then((data) => {
				// populate with books
				data.forEach((book) => {
					// iterating over data/books hash and creating instances of Books class (new Book, see continuation in book.js)
					const { id, title, publisher, rating, author, genre } = book;
					new Books(id, title, publisher, rating, author, genre);
					if (!AppContainer.authors.map((author) => author.name).includes(book.author.name)) {
						// if authors array does not include the author name, create a new book.author as well
						new Authors(book.author.name, book.author.gender, book.author.age, book.author.email);
					}
				});
				AppContainer.showBooks(); // runs this function immediately after fetching (IIF) so that it the result could be visible when the page loads
			})
			.catch((err) => console.log(err));
	}

	createBook(event) {
		event.preventDefault();
		fetch(`${this.url}/books`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				title: event.target.title.value,
				publisher: event.target.publisher.value,
				rating: event.target.rating.value
				// author: event.target.author.value,
				// genre: event.target.genre.value
			})
		})
			.then((resp) => resp.json())
			.then((data) => {
				const { id, title, publisher, rating, author, genre } = data;
				new Books(id, title, publisher, rating, author, genre);
			})
			.catch((err) => console.log(err));
	}

	static deleteBook(event) {
		event.preventDefault();
		AppContainer.books.forEach((book) => {
			fetch(`${this.url}/books/${book.id}`, { method: 'DELETE' })
				.then((response) => response.json())
				.then((data) => {
					Books.delete(data.id);
				})
				.catch((err) => console.log(err));
		});
		// event.preventDefault()
		// book = event.target.parentElement
		// fetch(`${this.url}/books/${book.id}`, {	method: 'DELETE' })
		// .then(resp => resp.json())
		// .then(data => {
		// 	Books.delete(data.id)
		// })
		// .catch(err => console.log(err))
	}
}
