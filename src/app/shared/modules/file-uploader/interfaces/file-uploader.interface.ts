import { EventEmitter } from "@angular/core";

export interface IFileUploadDataContext {
    title?: string,
    description?: string,
    documentUrl?: string,
    isRequired?: boolean,
    isDisabled?: boolean,
    showBorderBox?: boolean,

}


export interface IFileUploadConfig {
    maxSize: number; // (in MB)
    maxFiles?: number;
    fileTypes?: string[];
    filesRead?: number;
    inputId?: string;
    showErrorInsideBox?: boolean;
    errorCallback?: Function;
    accessModifier?: any

}