import { UserBusiness } from "../src/business/UserBusiness";
import { AuthenticatorMock } from "./mock/AuthenticatorMock";
import { IdGeneratorMock } from "./mock/GenerateIDMock";
import { HashManagerMock } from "./mock/HashManagerMock";
import { UserDataBaseMock } from "./mock/UserDataBaseMock";

const hashManager = new HashManagerMock()
const authenticator = new AuthenticatorMock()
const idGenerator = new IdGeneratorMock()
const userDataBase = new UserDataBaseMock()

const userBusinessMock = new UserBusiness(
   hashManager,
   authenticator,
   idGenerator,
   userDataBase
)

// describe("signup", () => {
//     test("Return error if a parameter is missing!", async () => {
//         expect.assertions(1)
//         try {
//             await userBusinessMock.signup({
//                 name:"",
//                 email:"andre@hotmail.com", 
//                 password: "123456 "
//             })
//         } catch (error:any) {
//             expect(error.message).toEqual("It is missing a parameter!")
            
//         }
//     })
// })

describe("getUserByID", () => {
    test("Return error if a parameter is missing!", async () => {
        expect.assertions(1)
        try {
            await userBusinessMock.getUserById("")
        } catch (error:any) {
            expect(error.message).toEqual("It is missing a parameter!")
            
        }
    })
})

