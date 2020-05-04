echnical and Complexity Requirements

- The application must be an HTML, CSS, and JavaScript frontend with a Rails API backend. All interactions between the client and the server must be handled asynchronously (AJAX) and use JSON as the communication format.

- The JavaScript application must use Object Oriented JavaScript (classes) to encapsulate related data and behavior.

- The domain model served by the Rails backend must include a resource with at least one has-many relationship. For example, if you were building an Instagram clone, you might display a list of photos with associated comments.

- The backend and frontend must collaborate to demonstrate Client-Server Communication. Your application should have at least 3 AJAX calls, covering at least 2 of Create, Read, Update, and Delete (CRUD). Your client-side JavaScript code must use fetch with the appropriate HTTP verb, and your Rails API should use RESTful conventions.

AJAX requests
- get/books
- post/books
- update/books/:id
- delete/books/:id

- in showAuthorBooks, how to select only books for author in option select???? should it be nested route author/:id/books in routes and controller show action?
- how to get child elements (author/:id/books)
- how to invoke listener outside if the scope (this?)
- which folder serves as a convention for CSS file (like src for JS)?
- search for a book