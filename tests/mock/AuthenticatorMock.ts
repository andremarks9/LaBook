import { AuthenticationData } from "../../src/model/AuthenticationData"

export class AuthenticatorMock {

    public generateToken(input:AuthenticationData):string {
        return "token_mock"
    }

    public getTokenData(token:string):AuthenticationData {
       return {
           id: "id_mock"
       }
    }
}