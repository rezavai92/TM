export interface IHttpCommonResponse <T>{
    StatusCode: number, 
    ResponseData: T,
    ResponseMessage : string,
    IsSucceed : boolean
}