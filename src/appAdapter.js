class AppAdapter {
	url = 'http://localhost:3000'; // this -> instance, this.constructor -> class, static -> class method accessible across the js files
	static domElements = {
		newBookForm: document.getElementById('new-book-form'),
		newAuthorForm: document.getElementById('new-author-form')
	};

	bindEventListeners() {
		// AppAdapter == this.constructor (name of class)
		this.constructor.domElements.newBookForm.addEventListener('submit', () => this.createBook(event)); // when submit, arrow function then preventDefault in function body
		this.constructor.domElements.newAuthorForm.addEventListener('submit', (event) => this.createAuthor(event));
	}

	getAuthors() {
		fetch(this.url + '/authors')
			.then((response) => response.json())
			.then((data) => {
				//debugger
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
					new Books(book.id, book.title, book.publisher, book.rating, book.author, book.genre);
					if (!AppContainer.authors.map((author) => author.name).includes(book.author.name)) {
						// if authors array does not include the author name, create a new book.author as well
						const { id, name, gender, age, email } = author;
						new Authors(id, name, gender, age, email);
					}
				});
				AppContainer.showBooks(); // runs this function immediately after fetching so that its result could be visible when the page loads
			})
			.catch((err) => console.log(err));
	}

	createBook(event) {
		event.preventDefault();
		fetch(this.url + '/books', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				title: event.target.title.value,
				publisher: event.target.publisher.value,
				rating: event.target.rating.value
				// author: event.target.author.name.value,
				// genre: event.target.genre.name.value
			})
		})
		.then((response) => response.json())
		.then((data) => {
			//debugger
				if (data !== undefined) {
				new Books(data.id, data.title, data.publisher, data.rating, data.author, data.genre);
			}
				// const bookDiv = document.querySelector('.book-div');
				// const ul = document.createElement('ul');
				// const li = document.createElement('li');
				// li.textContent = `${data.title}. ${data.rating}`;
				// ul.appendChild(li);
				// bookDiv.appendChild(ul);

				// doesn't work
				// if (!AppContainer.authors.map(author => author.name.includes(book.author.name))) {
				// 	const {id, name, gender, age, email} = author
				// 	new Authors(id, name, gender, age, email);
				// } else if (!AppContainer.genres.map(genre => genre.name.includes(book.genre.name))) {
				// 	const {id, name} = genre
				// 	new Genres(id, name);
				// }
			})
			.catch((err) => console.log(err));
	}

	createAuthor(event) {
		event.preventDefault();
		fetch(`${this.url}/authors`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				name: event.target.name.value,
				gender: event.target.gender.value,
				//gender: event.target.male.value || event.target.female.value || event.target.other.value,
				age: event.target.age.value,
				email: event.target.email.value
			})
		})
			.then((resp) => resp.json())
			.then((data) => {
				if (data !== undefined) {
					new Authors(data.id, data.name, data.age, data.gender, data.email);
					// const authorDiv = document.querySelector('.author-div');
					// const p = document.createElement('p')
					// p.innerText = data.name
				}
			})
			.catch((err) => console.log(err));
	}

	static deleteBook(ev) {
		AppContainer.books.forEach((book) => {
			if (book.id === parseInt(ev.target.dataset.id, 10)) {
			fetch(`http://localhost:3000/books/${book.id}`, { method: 'DELETE' })
				.catch((err) => console.log(err));
			}
		});
	}

	static deleteAuthor() {
		AppContainer.authors.forEach((author) => {
			fetch(`${this.url}/authors/${author.id}`, { method: 'delete' });
		});
	}
}
