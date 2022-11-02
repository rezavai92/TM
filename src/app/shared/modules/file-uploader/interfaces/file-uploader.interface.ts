export interface IFileUploadDataContext {
    title?: string,
    description?: string,
    documentUrl?: string,
    isRequired?: boolean,
    isDisabled?: boolean,
    showBorderBox?: boolean,
    customHintOnGivenRestriction: boolean,
    fileName?: string,
    fileId?: string,
    tags?: string[]

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