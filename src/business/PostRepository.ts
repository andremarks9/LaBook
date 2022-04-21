import { Post, POST_TYPES } from "../model/Post"
import { likeInputDTO } from "./PostBusiness"

export interface PostRepository{

    createPost(post:Post):Promise<Post>

    getPostById(id:string):Promise<Post>

    getPostSignedUp(id:string):Promise<string[]>

    getPostSignedUp1(id:string[]):Promise<Post[]>

    getPostByType(type:POST_TYPES):Promise<Post[]>

    likedPost(liked:likeInputDTO):Promise<likeInputDTO>

    deslikedPost(id:string):Promise<void>

    getLikedPost(id:string, userId:string):Promise<likeInputDTO[]>

    postComment(id:string, userId:string, postId:string, message:string, date:Date):Promise<void>

    deleteComment(id:string):Promise<void>
}