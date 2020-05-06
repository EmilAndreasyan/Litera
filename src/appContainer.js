class AppContainer {
	static authors = []; // static is similar to class variable in Ruby (@@authors), which belongs to class, not to instance
	static books = []; // instances of Book pushed into books array
	static genres = [];
	static comments = [];
	url = 'http://localhost:3000/';

	bindEventListeners() {
		// bind(this) binds the instance of class, are used for preventing default behavior (preventDefault()), if the book array is static (static book = []), we can avoid using bind
		const showBooksBtn = document.querySelector('.show-books-btn');
		showBooksBtn.addEventListener('click', this.showBooks);

		const hideBooksBtn = document.querySelector('.hide-books-btn');
		hideBooksBtn.addEventListener('click', this.hideBooks);

		const showEmailsBtn = document.getElementById('show-emails');
		showEmailsBtn.addEventListener('click', this.toggleEmails);

		// const searchInput = document.getElementById('search-input');
		// searchInput.addEventListener('focus', this.searchBook);
		const searchBtn = document.getElementById('search-btn');
		searchBtn.addEventListener('click', this.searchBook);

		const newBookForm = document.getElementById('new-book-form');
		newBookForm.addEventListener('submit', () => this.createBook(event));
	}

	getAuthors() {
		fetch(this.url + '/authors')
			.then((response) => response.json())
			.then((data) => {
				data.forEach((author) => {
					new Authors(author.id, author.name, author.gender, author.age, author.email);
				});
				this.showAuthors();
			})
			.catch((err) => console.log(err));
	}

	showAuthors() {
		// creating select with options
		const authorDiv = document.querySelector('.author-div'); // targeting
		const selectAuthors = document.getElementById('select-authors'); // targeting
		for (const element of AppContainer.authors) {
			const option = document.createElement('option'); // creating options
			option.value = element.name;
			option.text = element.name;
			selectAuthors.appendChild(option);
		}
		authorDiv.appendChild(selectAuthors);
	}

	toggleEmails() {
		// how to select only books for particular author in option select????
		const authorEmails = document.querySelector('.author-emails');
		const ul = document.createElement('ul');
		const btn = document.createElement('button');
		btn.className = 'hide-button';
		btn.style.backgroundColor = 'teal';
		btn.style.borderRadius = '7px';
		btn.style.color = 'white';
		btn.innerText = 'Hide emails';
		AppContainer.authors.forEach((author) => {
			const li = document.createElement('li');
			li.innerText = `${author.email}`;
			ul.appendChild(li);
		});
		authorEmails.appendChild(ul);
		authorEmails.appendChild(btn);
		btn.addEventListener('click', (event) => {
			const ul = document.querySelector('.author-emails ul');
			ul ? ul.remove() : null;
			event.target.remove();
		});
	}

	getBooks() {
		fetch(this.url + '/books') // GETting data from url/books
			.then((response) => response.json())
			.then((data) => {
				// populate with books
				data.forEach((book) => {
					// iterating over data/books hash and creating instances of Books class (new Book, see continuation in book.js)
					new Books(book.id, book.title, book.publisher, book.rating, book.author, book.genre);
					if (!AppContainer.authors.map((author) => author.name).includes(book.author.name)) {
						// if authors array does not include the author name, create a new book.author as well
						new Authors(book.author.name, book.author.gender, book.author.age, book.author.email);
					}
				});
				this.showBooks(); // runs this function immediately after fetching (IIF) so that it the result could be visible when the page loads
			})
			.catch((err) => console.log(err));
	}

	showBooks() {
		const bookDiv = document.querySelector('.bookDiv');
		const ul = document.createElement('ul');
		AppContainer.books.forEach((book) => {
			const li = document.createElement('li');
			li.innerText = `${book.title}. ${book.rating} (rating) `;
			const btn = document.createElement('button');
			btn.className = 'delete-button';
			btn.innerText = ` Delete`;
			li.appendChild(btn);
			ul.appendChild(li);
			// btn.addEventListener('click', (ev) => {
			// 	ev.target.parentNode.remove();
			// });
			// btn.addEventListener('click', () => this.deleteBook)
			btn.addEventListener('click', this.deleteBook.bind(this))
			// btn.addEventListener('click', (ev, book) => {
			// 	// how to invoke deleteBook fetch request? (url, book)
			// 	//debugger
			// 	book = ev.target.parentNode
			// 	AppContainer.books.forEach((book) => {
			// 		fetch(`http://localhost:3000/books/${book.id}`, {
			// 			method: 'DELETE'
			// 		})
			// 			.then((resp) => resp.json())
			// 			.then((data) => {
			// 				Books.delete(data.id);
			// 			})
			// 			.catch((err) => console.log(err));
			// 	});
			// });
		});
		bookDiv.appendChild(ul);
	}

	hideBooks() {
		const ul = document.querySelector('.bookDiv ul');
		ul ? ul.remove() : null;
	}

	searchBook(ev) {
		// how to find and return a value in a hash?
		let searchShowDiv, input, filter, ul, li;
		searchShowDiv = document.getElementsByClassName('search-show');
		input = document.getElementById('search-input');
		filter = input.value.toUpperCase();
		ul = document.createElement('ul');
		li = document.createElement('li');
		for (const element of AppContainer.books) {
			// how to itearate over hash key
			if (AppContainer.books[title].includes(filter)) {
				li.innerText = `${element.title}`;
				ul.appendChild(li);
			} else {
				console.log(`${filter} is not found`);
			}
		}
		searchShowDiv.appendChild(ul);
	}

	createBook(event) {
		//debugger
		event.preventDefault();
		// const newBookForm = document.getElementById('newBook');
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
				new Activity(id, title, publisher, rating, author, genre);
			})
			.catch((err) => console.log(err));
	}

	// static
	deleteBook() {
		AppContainer.books.forEach((book) => {
			fetch(this.url + `books/${book.id}`, {
				method: 'DELETE'
			})
				.then((response) => response.json())
				.then((data) => {
					Books.delete(data.id);
				})
				.catch((err) => console.log(err));
		});
	}
}
