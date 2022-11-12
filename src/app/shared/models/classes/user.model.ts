export class UserToken{

    constructor(
        private _userToken : string
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