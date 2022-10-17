export interface IBankInformation<T extends IMobileFinancialServiceInfo | ITraditionalBankInfo> {
    Type: string,
    Info: T
}

export interface ITraditionalBankInfo {
    BankName: string,
    BranchName: string,
    AccountHolderName: string,
    AccountNumber: string,
    BankRouteNumber: string

}

export interface IMobileFinancialServiceInfo {
    PhoneNumber: number,
    ServiceProvider: string
}