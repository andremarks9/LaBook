import UserDataBase from "../data/UserDataBase";
import { User } from "../model/User";
import { Authenticator } from "../services/AuthenticatorData";
import { IdGenerator } from "../services/GenerateID";
import { HashManager } from "../services/HashManager";

export type SignupInputDTO ={
    name:string,
    email:string,
    password:string        
}

export type LoginInputDTO ={
    email:string,
    password:string        
}

export type friendshipDTO ={
    id: string,
    is_user_requester:string,
    is_user_requested:string,
}

export class UserBusiness{

    constructor(
        private hashManager:HashManager,
        private authenticator:Authenticator,
        private generateID:IdGenerator,
        private userDataBase:UserDataBase,
    ){}

    signup = async(input:SignupInputDTO) => {

        const {name, email, password} = input

        if(!name || !email || !password){
            throw new Error("It is missing a parameter!")
        }

        const isEmailFound = await this.userDataBase.findByEmail(email)

        if(isEmailFound){
            throw new Error("There is already an account registered with this email!")
        }

        const id:string = this.generateID.generate()

        const hashPassword = await this.hashManager.hash(password)

        const token:string = this.authenticator.generateToken({id})

        const user:User = new User(id, name, email,hashPassword)
        await this.userDataBase.insert(user)

        return token
    }

    login = async(input:LoginInputDTO) => {

        const { email, password } = input

        if(!email || !password){
            throw new Error("It is missing a parameter!")
        }

        const user = await this.userDataBase.login(email)

        if(!user){
            throw new Error("Please insert the right login!")
        }

        const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword())
        
        if(!isPasswordCorrect){
            throw new Error("Please insert the right password!")
        }

        const token = this.authenticator.generateToken({id:user.getId()})

        return token
    }

    getUserById = async(id:string) => {
        const result = await this.userDataBase.getUserById(id)
        if(result === undefined){
            throw new Error("It is missing a parameter!")
        }

        return result
    }

    handleFriendshipById = async(id:string, token:string) => {
        const inputId = id
        const inputToken = token

        if(!inputId || !inputToken){
            throw new Error("It is missing a parameter!")
        }

        const getToken = this.authenticator.getTokenData(inputToken)

        const isAFriendship = await this.userDataBase.checkingFriendship(inputId, getToken.id)

        if(isAFriendship){
            await this.userDataBase.deleteFriendshipById(isAFriendship.id)
            return "The friendship was deleted sucessfully!"
        } else{
            const idFriendship = this.generateID.generate()
                const befriend: friendshipDTO = {
                    id: idFriendship,
                    is_user_requester:id,
                    is_user_requested:getToken.id,
                }
            await this.userDataBase.handleFriendshipById(befriend.id, befriend.is_user_requester, befriend.is_user_requested)
            return "The friendship was done sucessfully!"
        }
    }
}