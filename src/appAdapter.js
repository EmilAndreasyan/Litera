class AppAdapter {
	url = 'http://localhost:3000'; // this -> instance, this.constructor -> class, static -> class method visible across the js files
	static domElements = {
		newBookForm: document.getElementById('new-book-form')
	};

	bindEventListeners() {
		// AppAdapter == this.constructor (name of class)
		this.constructor.domElements.newBookForm.addEventListener('submit', () => this.createBook(event)); // when submit, arrow function then preventDefault in function body
	}

	getAuthors() {
		fetch(this.url + '/authors')
			.then((response) => response.json())
			.then((data) => {
				data.forEach((author) => {
					if (author.name !== null && author.email !== null) {
						new Authors(author.id, author.name, author.gender, author.age, author.email);
					}
				});
				AppContainer.showAuthors();
			})
			.catch((err) => console.log(err));
	}

	getBooks() {
		fetch(this.url + '/books')
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
				rating: event.target.rating.value,
				author: event.target.author.name.value,
				genre: event.target.genre.name.value
			})
		})
			.then((resp) => resp.json())
			.then((data) => {
				//debugger
				const { id, title, publisher, rating, author, genre } = data;
				new Books(id, title, publisher, rating, author, genre);
				new Authors(data.id, data.name, data.gender, data.age, data.email)
				new Genres(data.id, data.name)
			})
			.catch((err) => console.log(err));
	}

	static deleteBook() {
		// how to connect event.currentTarget.parentElement with book.id?
		//event.preventDefault();
		//const bookName = event.currentTarget.parentElement.textContent.split('.')[0];
		AppContainer.books.forEach((book) => {
			//debugger
			fetch(`${this.url}/books/${book.id}`, { method: 'DELETE' })
				.then(response => response.json())
				.then((data) => {
					Books.delete(data.id);
				})
				.catch((err) => console.log(err));
			});
		//this.getBooks()-
		// event.preventDefault()
	// 	let book = event.target.parentElement
	// 	fetch(`${this.url}/books/${book.id}`, {	method: 'DELETE' })
	// 	.then(resp => resp.json())
	// 	.then(data => {
	// 		Books.delete(data.id)
	// 	})
	// 	.catch(err => console.log(err))
	}

}
