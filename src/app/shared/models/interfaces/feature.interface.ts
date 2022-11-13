export interface Navigation {
    id:  string,
    title?: string,
    translate: string,
    type?: string,
    url: string,
    iconType?: string,
    icon?: string,
    isVisible?: boolean
}


export interface IGetAppsPayload{

    featureId: string,
    appName: string,
    featureName : string
}