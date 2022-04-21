export enum POST_TYPES {
    NORMAL = "normal",
    EVENT = "event"
}

export class Post{
    private id: string
    private photo: string
    private description: string
    private type: POST_TYPES
    private created_at: Date
    private author_id: string

    constructor(id:string, photo:string, description:string, type:POST_TYPES, created_at:Date, author_id:string){
        this.id = id
        this.photo = photo
        this.description = description
        this.type = type
        this.created_at = created_at
        this.author_id = author_id
    }

    public getId(){
        return this.id
    }

    public getPhoto(){
        return this.photo
    }

    public getDescription(){
        return this.description
    }

    public getType(){
        return this.type
    }

    public getCreate_At(){
        return this.created_at
    }

    public getAuthor_Id(){
        return this.author_id
    }

    public static toPostModel(data:any):Post {
        return new Post(data.id, data.photo, data.description, data.type, data.created_at, data.author_id)
    }
}