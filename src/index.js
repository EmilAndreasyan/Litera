const app = new AppContainer
const addapter = new AppAdapter // js file containing fetch requests (getBooks, getAuthors, etc)
app.bindEventListeners() // thus having access to all the events stored in new AppContainer.bindEventListeners() scope
addapter.bindEventListeners()
addapter.getBooks()
addapter.getAuthors()