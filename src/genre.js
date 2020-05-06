class Genres {
    constructor(id, name){
        this.id = id
        this.name = name
        AppContainer.genres.push(this)
    }
}