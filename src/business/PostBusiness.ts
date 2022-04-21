import { Post, POST_TYPES } from "../model/Post"
import { Authenticator } from "../services/AuthenticatorData"
import { dateToString } from "../services/Date"
import { IdGenerator } from "../services/GenerateID"
import { PostRepository } from "./PostRepository"

export type PostInputDTO = {
    photo:string,
    description: string,
    type:POST_TYPES,
    author_id:string
}

export type likeInputDTO = {
    id:string,
    user_id:string,
    post_id:string
}

export type CommentInputDTO = {
    id:string,
    user_id:string,
    post_id:string,
    message:string,
    date:Date
}

export class PostBusiness{
    private authenticator:Authenticator
    private postDataBase:PostRepository
    private generateID:IdGenerator

    constructor(postDataImplementation:PostRepository){
        this.authenticator = new Authenticator()
        this.generateID = new IdGenerator()
        this.postDataBase = postDataImplementation
    }

    createPost = async(input:PostInputDTO, token:string) => {
        const {photo, description, type, author_id} = input
        
        if(!photo || !description || !type || !author_id){
            throw new Error("It is missing a parameter!")
        }
        
        const getToken = this.authenticator.getTokenData(token)
        
        if(!getToken){
            throw new Error("The token is unauthorized!")
        }
        
        const id = this.generateID.generate()
        const created_at:Date = new Date()

        const post:Post = new Post(id, photo, description, type, created_at, author_id)

        await this.postDataBase.createPost(post)
    }

    getPostById = async(id:string, token:string) => {
        const inputId = id
        const inputToken = token

        if(!inputId || !inputToken){
            throw new Error("It is missing a parameter!")
        }

        const getToken = this.authenticator.getTokenData(inputToken)

        if(!getToken){
            throw new Error("The token is unauthorized!")
        }

        const result = await this.postDataBase.getPostById(inputId)

        if(result){
            return result
        } else{
            throw new Error("No post found!")
        }

        return result

    }

    getPostSignedUp = async(token:string) => {

        if(!token){
            throw new Error("It is missing a parameter!")
        }

        const getToken = this.authenticator.getTokenData(token)

        if(!getToken){
            throw new Error("The token is unauthorized!")
        }

        const result = await this.postDataBase.getPostSignedUp(getToken.id)

        if(result.length === 0){
            throw new Error("There is no post!")
        }

        const result1 = await this.postDataBase.getPostSignedUp1(result)

        if(result1.length === 0){
            throw new Error("There is no post!")
        }
       
        return result1
    }

    getPostByType = async(type:POST_TYPES, token:string) => {
        if(!type || !token){
            throw new Error("It is missing a parameter!")
        }

        const getToken = this.authenticator.getTokenData(token)

        if(!getToken){
            throw new Error("The token is unauthorized!")
        }

        const result = await this.postDataBase.getPostByType(type)

        if(result.length === 0){
            throw new Error("There is no posts!")
        }

        return result
    }

    likeDeslikePost = async(token:string, postId:string) => {
        if(!token || !postId){
            throw new Error("It is missing a parameter!")
        }

        const getToken = this.authenticator.getTokenData(token)

        if(!getToken){
            throw new Error("The token is unauthorized!")
        }

        const result = await this.postDataBase.getLikedPost(postId, getToken.id)

        if(result.length === 0){
            const id = this.generateID.generate()
            const liked:likeInputDTO = {id:id, user_id:getToken.id, post_id: postId}
            await this.postDataBase.likedPost(liked)
            
            return "The post was liked!"
        }else{
            this.postDataBase.deslikedPost(result[0].id)

            return "The post was desliked!"
        }
    }

    postComment = async(token:string, postId:string, message:string) => {
        if(!token || !postId || !message){
            throw new Error("It is missing a parameter!")
        }

        const getToken = this.authenticator.getTokenData(token)

        if(!getToken){
            throw new Error("The token is unauthorized!")
        }

        const id = this.generateID.generate()
        const date:Date = new Date()
        
        const comment:CommentInputDTO = {id:id, user_id:getToken.id, post_id:postId, message:message, date:date}

        await this.postDataBase.postComment(comment.id, comment.user_id, comment.post_id, comment.message, comment.date)

    }

    deleteComment = async(token:string, commentId:string) => {
        if(!token || !commentId){
            throw new Error("It is missing a parameter!")
        }
         const getToken = this.authenticator.getTokenData(token)

         if(!getToken){
            throw new Error("The token is unauthorized!") 
         }

         await this.postDataBase.deleteComment(commentId)
    }
}