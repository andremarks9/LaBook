import { UserRepository } from "../../src/business/UserRepository";
import { BaseDataBase } from "../../src/data/BaseDataBase";
import UserDataBase from "../../src/data/UserDataBase"
import { Friendship } from "../../src/model/Friendship";
import { User } from "../../src/model/User";
import { user1, user2 } from "./UserMock";

export class UserDataBaseMock extends BaseDataBase{

    public TABLE_USERS = "labook_users"
    public TABLE_FRIENDSHIP = "labook_friendship"
    
    insert = async (user:User) => {
        return user
    }

    findByEmail = async (email:string) => {
        if(email === "andre@gmail.com"){
            return user1
        } else if(email === "lucas@gmail.com"){
            return user2
        } else {
            undefined
        }
    }

    login = async (email:string) => {
        return user1 as any
    }

    getUserById = async (id:string) => {
        return user1
    }

    checkingFriendship = async (id_user_requester:string, id_user_requested:string) => {
        return undefined
    }

    handleFriendshipById = async (id:string, id_user_requester:string, id_user_requested:string) => {}

    deleteFriendshipById = async (id:string) => {}
}