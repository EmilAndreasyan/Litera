const app = new AppContainer
app.bindEventListeners() // thus having access to all the events stored in bindEventListeners() scope
app.getBooks()
app.getAuthors()
app.showBooks()
app.deleteBook()







// const BACKEND_URL = 'http://localhost:3000';
// fetch(`${BACKEND_URL}/test`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));