class AppContainer {
	static authors = []; // static is similar to class variable in Ruby (@@authors), which belongs to class, not to instance
	static books = []; // instances of Book pushed into books array
	static genres = [];
	static comments = [];
	static domElements = {
		// more organized way of targeting DOM elements
		showBooksBtn: document.querySelector('.show-books-btn'),
		hideBooksBtn: document.querySelector('.hide-books-btn'),
		showEmailsBtn: document.querySelector('.show-emails'),
		searchInput: document.querySelector('.search-input'),
		searchBookForm: document.querySelector('.search-book-form')
	};

	bindEventListeners() {
		// adding listeners to AppContainer.domElements
		// bind(this) binds the instance of class, are used for preventing default behavior (preventDefault()), if the book array is static (static book = []), we can avoid using bind

		// AppAdapter == this.constructor (name of class)

		this.constructor.domElements.showBooksBtn.addEventListener('click', this.constructor.showBooks); // class name has access to static method, which is visible across the files
		this.constructor.domElements.hideBooksBtn.addEventListener('click', this.hideBooks);
		this.constructor.domElements.showEmailsBtn.addEventListener('click', this.toggleEmails);
		this.constructor.domElements.searchInput.addEventListener('focus', (ev) => {
			ev.target.style.backgroundColor = 'lightgreen';
		});
		this.constructor.domElements.searchInput.addEventListener('blur', (ev) => {
			ev.target.style.backgroundColor = '';
			ev.target.value = '';
		});
		//this.constructor.domElements.searchInput.addEventListener('input', this.searchBook);
		this.constructor.domElements.searchBookForm.addEventListener('submit', () => this.searchBook(event));
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
			if (author.email !== undefined) {
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

	searchBook(event) {
		// const num = event.charCode; // code of the event
		// const letter = String.fromCharCode(num);
		// how to capitalize each letter in input and compare to Object value???
		event.preventDefault();
		let searchShowDiv, input, filter, h5, deleteBtn;
		searchShowDiv = document.querySelector('.search-show');
		input = document.querySelector('.search-input').value;
		h5 = document.createElement('h5');
		deleteBtn = document.createElement('button');
		// filter gets string with "Every Word Uppercased"
		filter = input.split(' ').map((word) => (word.charAt(0).toUpperCase() + word.slice(1)).split(',')).join(' ');
		AppContainer.books.forEach((book) => {
			//debugger
			if (book.title.includes(filter)) {
				h5.textContent = `We have a book matching your search! ${book.title} `;
			} else {
				console.log(`We haven't found any results for ${filter} `) // doesn't work, how to invoke this outside of loop?
			}
		});
		// for (const key in AppContainer.books) {
		// debugger
		// 	if (Object.entries(AppContainer.books).includes(filter)) {
		// 		// doesn't work, need to compare similar value types
		// 		console.log('hello');
		// 		h5.textContent = `we have found your book! ${key}`;
		// 	} else {
		// 		h5.textContent = `We haven't found any results for ${filter} `;
		// 	}
		// }
		// return function(input, key) {
		// 	for (const key in object) {
		// 		if (object.hasOwnProperty(key)) {
		// 			const element = object[key];
		// 		}
		// 	}
		// };
		// 	return function (input) {
		// 		console.log('hello')
		// 	for (const [key, value] of Object.entries(AppContainer.books)) {
		// 		if (input === value) {
		// 			console.log(`${key}: ${value}`)
		// 		} else {
		// 			console.log('falilure')
		// 		}

		// 	}
		// }
		searchShowDiv.appendChild(h5);
		deleteBtn.innerText = 'delete';
		h5.appendChild(deleteBtn);
		deleteBtn.addEventListener('click', (ev) => {
			ev.target.parentNode.remove();
			deleteBtn.removeEventListener('click', this);
		});
	}
}
