class AppContainer {
	static authors = []; // static is similar to class variable in Ruby (@@authors), which belongs to class, not to instance
	static books = []; // instances of Book pushed into books array
	static genres = [];
	static comments = [];
	static domElements = { // more organized way of targeting DOM elements
		showBooksBtn: document.querySelector('.show-books-btn'),
		hideBooksBtn: document.querySelector('.hide-books-btn'),
		showEmailsBtn: document.getElementById('show-emails'),
		searchBtn: document.getElementById('search-btn')
	}

	bindEventListeners() { // adding listeners to AppContainer.domElements
		// bind(this) binds the instance of class, are used for preventing default behavior (preventDefault()), if the book array is static (static book = []), we can avoid using bind

		AppContainer.domElements.showBooksBtn.addEventListener('click', AppContainer.showBooks); // class name has access to static method, which is visible across the files

		AppContainer.domElements.hideBooksBtn.addEventListener('click', this.hideBooks);

		AppContainer.domElements.showEmailsBtn.addEventListener('click', this.toggleEmails);

		AppContainer.domElements.searchBtn.addEventListener('click', this.searchBook);
	}

	static showAuthors() {
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
		AppContainer.authors.forEach((author) => {
			const li = document.createElement('li');
			if (author.email !== null) {
				li.innerText = `${author.email}`;
				ul.appendChild(li);
			}
		});
		authorEmails.appendChild(ul);
		const btn = document.createElement('button');
		btn.className = 'hide-button';
		btn.style.backgroundColor = '#6CC3D5';
		btn.style.color = 'white';
		btn.innerText = 'Hide Emails';
		authorEmails.appendChild(btn);
		btn.addEventListener('click', (event) => {
			const ul = document.querySelector('.author-emails ul');
			ul ? ul.remove() : null;
			event.target.remove();
		});
	}

	static showBooks() {
		const bookDiv = document.querySelector('.book-div');
		const ul = document.createElement('ul');
		AppContainer.books.forEach((book) => {
			const p = document.createElement('p');
			p.textContent = `${book.title}. Rating: ${book.rating} `;
			ul.appendChild(p);
			const btn = document.createElement('button');
			btn.style.backgroundColor = '#FF7851';
			btn.style.color = 'lightBlue';
			btn.className = 'delete-button';
			btn.innerText = ` Delete`;
			p.appendChild(btn);
			btn.addEventListener('click', (ev) => {
				ev.target.parentNode.remove();
			});
			//btn.addEventListener('click', (event) => this.deleteBook)
			//btn.addEventListener('click', this.deleteBook)
			//btn.addEventListener('click', AppAdapter.deleteBook); // half works, hits the method, but the book element is undefined
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
		const ul = document.querySelector('.book-div ul');
		ul ? ul.remove() : null;
	}

	searchBook() {
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
}
