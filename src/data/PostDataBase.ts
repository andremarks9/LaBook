import { PostRepository } from "../business/PostRepository";
import { BaseDataBase } from "./BaseDataBase";
import { Post, POST_TYPES } from "../model/Post";
import { likeInputDTO } from "../business/PostBusiness";

export default class PostDataBase extends BaseDataBase implements PostRepository{
    
    protected TABLE_POST = "labook_posts"
    protected TABLE_FRIENDSHIP = "labook_friendship"
    protected TABLE_USER = "labook_users"
    protected TABLE_LIKED_POST = "labook_postLiked"
    protected TABLE_COMMENT_POST = "labook_postComment"

    createPost = async(post:Post) => {
        try {
            await BaseDataBase.connection(this.TABLE_POST)
                .insert(post)

            return post

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getPostById = async(id:string) => {
        try {
            const result = await BaseDataBase.connection(this.TABLE_POST)
                .select("*")
                .where({id})

            return result[0] && Post.toPostModel(result[0])
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getPostSignedUp = async(id:string) => {
        try {
            const result = await BaseDataBase.connection(this.TABLE_FRIENDSHIP)
                .select("id")
                .where("id_user_requester", "=", id)
                .orWhere("id_user_requested", "=", id)

            return result

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getPostSignedUp1 = async(id:string[]) => {
        try {
            const result = await BaseDataBase.connection(this.TABLE_POST)
                .select()
                .where("author_id", "=", id[1])
                .orderBy("created_at", "desc")

            return result

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getPostByType = async(type:POST_TYPES) => {
        try {
            const result = await BaseDataBase.connection(this.TABLE_POST)
                .select()
                .where("type", type)
                .orderBy("created_at", "desc")

            return result
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    likedPost = async(liked:likeInputDTO) => {
        try {
            await BaseDataBase.connection(this.TABLE_LIKED_POST)
                .insert({id:liked.id, id_user_liked:liked.user_id, id_post_liked:liked.post_id})
              
            return liked
        } catch (error:any) {
            throw new Error(error.message)

        }
    }

    getLikedPost = async(postId:string, userId:string) => {
        try {
            const result = BaseDataBase.connection(this.TABLE_LIKED_POST)
                .select()
                .where("id_post_liked", "=", postId)
                .andWhere("id_user_liked", "=", userId)

            return result
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    deslikedPost = async(id:string) => {
        try {
            await BaseDataBase.connection(this.TABLE_LIKED_POST)
                .delete()
                .where("id", "=", id)
            
        } catch (error:any) {
            throw new Error(error.message)

        }
    }

    postComment = async(id: string, userId: string, postId: string, message:string, date:Date) => {
        try {
            const result = await BaseDataBase.connection(this.TABLE_COMMENT_POST)
                .insert({id:id, id_user_comment:userId, id_post_comment:postId, message:message, created_at:date})
   
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    deleteComment = async(id:string) => {
        try {
            await BaseDataBase.connection(this.TABLE_COMMENT_POST)
                .delete()
                .where("id", "=", id)
                
        } catch (error:any) {
            throw new Error(error.message) 
        }
    }
}