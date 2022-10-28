import { FinanceTypeEnum } from "../constants/signup.constants"

export interface IBankInfoForm {
    FinanceType: FinanceTypeEnum
}

export interface IBankInformation<T extends IMobileFinancialServiceInfo | ITraditionalBankInfo> {
    Type: string,
    Info: T
}

export interface ITraditionalBankInfo {
    BankName: string,
    BranchName: string,
    AccountHolderName: string,
    AccountNumber: string,
    RoutingNumber?: string

}

export interface IMobileFinancialServiceInfo {
    PhoneNumber: number,
    OperatorName: string
}