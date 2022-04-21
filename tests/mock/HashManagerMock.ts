export class HashManagerMock{

    public async hash(text:string):Promise<any>{
        return "hash"
    }

    public async compare(text:string, hash:string):Promise<boolean> {
        return text === hash
    }
}