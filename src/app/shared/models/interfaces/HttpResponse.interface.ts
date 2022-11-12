export interface IHttpCommonResponse <T>{
    statusCode: number, 
    responseData: T,
    responseMessage : string,
    isSucceed : boolean
}