import { UserRepository } from "../business/UserRepository";
import { Friendship } from "../model/Friendship";
import { User } from "../model/User";
import { BaseDataBase } from "./BaseDataBase";

export default class UserDataBase extends BaseDataBase{

    public TABLE_USERS = "labook_users"
    public TABLE_FRIENDSHIP = "labook_friendship"

    insert = async(user:User):Promise<User> => {
        try {
            await BaseDataBase.connection(this.TABLE_USERS)
                .insert(user)

            return user

        } catch (error) {
            throw new Error("The user could not be inserted to the database!")
        }
    }

    findByEmail = async(email:string):Promise<User | undefined> => {
        try {
            const result:User[] = await BaseDataBase.connection(this.TABLE_USERS)
                .select("*")
                .where({email})

            return result[0] && User.toUserModel(result[0])
            
        } catch (error) {
            throw new Error("The user could not be found in the database!")
        }
    }

    getUserById = async(id:string):Promise<User | undefined> => {
        try {
            const result:User[] = await BaseDataBase.connection(this.TABLE_USERS)
                .select("*")
                .where({id})

            return result[0] && User.toUserModel(result[0])
            
        } catch (error) {
            throw new Error("The user could not be found in the database!")
        }
    }

    login = async(email:string):Promise<User> => {
        try {
            const result:User[] = await BaseDataBase.connection(this.TABLE_USERS)
                .select("*")
                .where({email})

            return result[0] && User.toUserModel(result[0])
        } catch (error:any) {
            throw new Error("The user could not be found in the database!")
        }
    }

    checkingFriendship = async(id_user_requester:string, id_user_requested:string):Promise<Friendship | undefined> => {
        try {
            const result:Friendship[] = await BaseDataBase.connection(this.TABLE_FRIENDSHIP)
                .select()
                .where("id_user_requester", "=", id_user_requester)
                .andWhere("id_user_requested", "=", id_user_requested)
                .orWhere("id_user_requester", "=", id_user_requested)
                .andWhere("id_user_requested", "=", id_user_requester)
            
            return result[0]

        } catch (error:any) {
            throw new Error("The friendship could not be found in the database!")
        }
    }


    handleFriendshipById = async(id:string, id_user_requester:string, id_user_requested:string):Promise<void> => {
        try {
            await BaseDataBase.connection(this.TABLE_FRIENDSHIP)
                .insert({id, id_user_requester, id_user_requested})

        } catch (error:any) {
            throw new Error("The friendship could not be done!")
        }
    }

    deleteFriendshipById = async(id:string):Promise<void> => {
        try {
            await BaseDataBase.connection(this.TABLE_FRIENDSHIP)
                .delete()
                .where("id", "=", id)

        } catch (error:any) {
            throw new Error("The friendship could not be deleted!")
        }
    }
}
