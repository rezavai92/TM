import { EventEmitter } from "@angular/core";

export interface IFileUploadDataContext{
    title? : string,
    description? : string,
    documentUrl? : string,
    isRequired? : boolean,
    isDisabled? : boolean,

}


export interface IFileUploadConfig{
    maxSize: number; // (in MB)
    maxFiles?: number;
    fileTypes?: string;
    filesRead?: number;
    uploadOnConfirm?: EventEmitter<any>;
    inputId?: string;
    IsErrorMsgShowOnBox?: boolean;
    errorCallback?: Function;
    removeFileEvent?: EventEmitter<any>;
    clearFileUploadQueue?: EventEmitter<any>;
    accessModifier? : any

}