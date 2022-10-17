import {
    IBankInformation,
    IMobileFinancialServiceInfo,
    ITraditionalBankInfo,
} from '../interfaces/bank-info.interface';

export class BankInfoModel implements IBankInformation<ITraditionalBankInfo> {
    constructor(public Info: ITraditionalBankInfo, public Type: string) { }
}

export class MfsBankInfoModel
    implements IBankInformation<IMobileFinancialServiceInfo>
{
    constructor(public Info: IMobileFinancialServiceInfo, public Type: string) { }
}
