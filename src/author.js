class Authors {
    constructor(id, name, gender, age, email){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age
        this.email = email
        AppContainer.authors.push(this)
    }
    
    
}