export class User{

    private _userToken!: any;
    constructor(
        public ItemId: string,
        public FirstName: string,
        public LastName: string,
        public Email: string,
        public Roles : string[]
    ) {
        
    }


    getUserToken() {
        return this._userToken;   
    }

    setUserToken(token : any) {
        if (token) {
            this._userToken = token;
        }
    }

}