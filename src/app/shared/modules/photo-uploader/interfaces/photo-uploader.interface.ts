export interface IPhotoUploadDataContext {
    title?: string,
    description?: string,
    documentUrl?: string,
    isRequired?: boolean,
    isDisabled?: boolean,
    showBorderBox?: boolean,
    customHintOnGivenRestriction: boolean

}


export interface IPhotoUploadConfig {
    maxSize: number; // (in MB)
    maxFiles?: number;
    fileTypes?: string[];
    filesRead?: number;
    inputId?: string;
    showErrorInsideBox?: boolean;
    errorCallback?: Function;
    accessModifier?: any

}