class AppContainer {
	static authors = []; // static is similar to class variable in Ruby (@@authors), which belongs to class, not to instance
	static books = []; // instances of Book pushed into books array
	static genres = [];
	static comments = [];
	url = 'http://localhost:3000/';

	bindEventListeners() {
		// bind(this) binds the instance of class, are used for preventing default behavior (preventDefault()), if the book array is static (static book = []), we can avoid using bind
		const showBooksBtn = document.querySelector('.showBooks');
		showBooksBtn.addEventListener('click', this.showBooks);

		const hideBooksBtn = document.querySelector('.hideBooks');
		hideBooksBtn.addEventListener('click', this.hideBooks);

		const showAuthorsBtn = document.querySelector('.showAuthors');
		showAuthorsBtn.addEventListener('click', this.showAuthors);

		const showEmailsBtn = document.getElementById('show-emails');
		showEmailsBtn.addEventListener('click', this.showEmails);

		const deleteBookBtn = document.querySelector('.deleteBook');
		deleteBookBtn.addEventListener('click', this.deleteBook);

		const newBookForm = document.getElementById('newBook');
		newBookForm.addEventListener('submit', this.createBook);
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
						// if authors arrasy does not include the author name, create a new book.author as well
						new Authors(book.author.name, book.author.gender, book.author.age, book.author.email);
					}
				});
				// this.showBooks() // runs this function immediately after fetching (IIF) so that it the result could be visible when the page loads
			})
			.catch((err) => console.log(err));
	}

	showBooks() {
		const bookDiv = document.querySelector('.bookDiv');
		const ul = document.createElement('ul');
		AppContainer.books.forEach(book => {
            const li = document.createElement('li');
            const btn = document.createElement('button')
            li.innerText = `${book.title}. ${book.rating} (rating) `;
            btn.innerText = ` Delete`
            li.appendChild(btn)
            ul.appendChild(li);
            btn.addEventListener('click', ev => {
                ev.target.parentNode.remove()
            })
            // btn.addEventListener('click', AppContainer.deleteBook) // how to invoke deleteBook fetch request?
		});
		bookDiv.appendChild(ul);
	}

	hideBooks() {
		const ul = document.querySelector('.bookDiv ul');
		ul ? ul.remove() : null;
	}

	createBook(event) {
		event.preventDefault();
		const newBookForm = document.getElementById('newBook');
		fetch(this.url + '/books', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				title: event.target.book.value
			})
		})
			.then((resp) => resp.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
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
		const authorDiv = document.getElementById('authorDiv'); // targeting
		const selectAuthors = document.getElementById('selectAuthors'); // targeting
		for (const element of AppContainer.authors) {
			const option = document.createElement('option'); // creating options
			option.value = element.name;
			option.text = element.name;
			selectAuthors.appendChild(option);
		}
		authorDiv.appendChild(selectAuthor);
	}

	showEmails(event) {
		// how to select only books for particular author in option select????
		//debugger
		event.target;
		const authorBooksDiv = document.getElementById('authorBooks');
		// const firstAuthor = document.getElementById('selectAuthors')[0];
		const ul = document.createElement('ul');
		AppContainer.authors.forEach((author) => {
			const li = document.createElement('li');
			li.innerText = `${author.email}`;
			ul.appendChild(li);
        });
		authorBooksDiv.appendChild(ul);
	}

	deleteBook(...books) {
		books.forEach((book) => {
			fetch(this.url + `${book.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((err) => console.log(err));
		});
	}
}
