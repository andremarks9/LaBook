import { Friendship } from "../model/Friendship"
import { User } from "../model/User"

export interface UserRepository{

    insert(user:User):Promise<User>

    findByEmail(email:string):Promise<User | undefined>

    login(email:string):Promise<User>

    checkingFriendship(id_user_requester:string, id_user_requested:string):Promise<Friendship | undefined>

    handleFriendshipById(id:string, id_user_requester:string, id_user_requested:string):Promise<void>

    deleteFriendshipById(id:string):Promise<void>
}