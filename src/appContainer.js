class AppContainer {
	static authors = []; // static is similar to class variable in Ruby (@@authors), which belongs to class, not to instance
	static books = []; // instances of Book pushed into books array
	static genres = [];
	//static comments = [];
	static domElements = {
		// more organized way of targeting DOM elements
		displayAuthorButton: document.querySelector('.display-author-button'),
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
		this.constructor.domElements.displayAuthorButton.addEventListener('click', this.constructor.showAuthorForm);

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
		const authorDiv = document.querySelector('.author-div');
		for (const element of AppContainer.authors) {
			const p = document.createElement('p');
			p.textContent = element.name;
			authorDiv.appendChild(p);
		}
	}

	static showAuthorForm() {
		const newAuthorForm = document.getElementById('new-author-form');
		newAuthorForm.style.display = 'block';
		const btn = document.querySelector('.hide-author-button');
		btn.addEventListener('click', () => {
			newAuthorForm.style.display = 'none';
		});
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
		btn.className = 'btn btn-info btn-sm m-2';
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
			const li = document.createElement('li');
			li.textContent = `${book.title}. Rating: ${book.rating} `;
			ul.appendChild(li);
			const btn = document.createElement('button');
			btn.className = 'btn btn-danger btn-sm m-2';
			btn.innerText = 'delete';
			btn.dataset.id = book.id
			li.appendChild(btn);
			btn.addEventListener('click', AppAdapter.deleteBook); 
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
		event.preventDefault();
		let searchShowDiv, input, filter, h5, h4, deleteBtn;
		searchShowDiv = document.querySelector('.seach-show-div');
		input = document.querySelector('.search-input').value;
		h5 = document.createElement('h5');
		h4 = document.createElement('h4');
		deleteBtn = document.createElement('button');
		deleteBtn.className = 'btn btn-warning btn-sm ml-2';
		// filter gets string with "Every Word Uppercased"
		filter = input.split(' ').map((word) => (word.charAt(0).toUpperCase() + word.slice(1)).split(',')).join(' ');
		AppContainer.books.forEach((book) => {
			if (book.title.toLowerCase().includes(filter.toLowerCase())) {
				h5.textContent = `We have a book that may match your search! ${book.title} `;
			} else {
				h4.textContent = `We haven't found any results for ${filter} `; // doesn't work, creates only delete button
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
