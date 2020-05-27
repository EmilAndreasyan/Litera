class Comments {
    constructor(id, likes, dislikes) {
        this.id = id
        this.likes = likes
        this.dislikes = dislikes
        AppContainer.comments.push(this)
    }
}