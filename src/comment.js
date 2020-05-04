class Comments {
    constructor(date, likes, dislikes, book){
        this.date = date;
        this.likes = likes;
        this.dislikes = dislikes;
        this.book = book
        AppContainer.comments.push(this)
        // AppContainer.comments = this
    }
}