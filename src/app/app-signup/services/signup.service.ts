import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FinanceTypeEnum } from '../constants/signup.constants';
import { IMobileFinancialServiceInfo, ITraditionalBankInfo } from '../interfaces/bank-info.interface';
import { ISignUpGeneralInfoFormData } from '../interfaces/general-info.interface';
import { ISignUpProfessionalInfoFormData } from '../interfaces/professional-info.interface';
import { IRegisterUserPayload } from '../interfaces/signup.interface';
import { BankInfo, MfsInfo, UserFinancialInfo } from '../models/bank-information.model';
import * as moment from 'moment'
import { SharedUtilityService } from '../../shared/services/shared-utilities/shared-utility.service';

@Injectable({
	providedIn: 'root'
})
export class SignupService {

	constructor(private http: HttpClient,
		private _util: SharedUtilityService
	) { }

	registerUser(payload: IRegisterUserPayload) {

		const header: any = new HttpHeaders({
			'Content-Type': 'application/json',
		});
		const httpOption = { headers: header }

		return this.http.post<any>(`${environment.UserService}Register`, payload, { ...httpOption });

	}


	getDateOnlyString(date: Date) {

		const momentObject = moment(date)
		const d = momentObject.format('yyyy-MM-DD');
		return d.toString();

	}

	prepareFinancialInfoModelFromFormData(
		bankGroupFormData: (ITraditionalBankInfo | null),
		mfsGroupFormData: (IMobileFinancialServiceInfo | null),
		financeType: FinanceTypeEnum) {

		let bfs: (BankInfo | null) = null;
		let mfs: (MfsInfo | null) = null;

		if (financeType === FinanceTypeEnum.Bank) {
			bfs = new BankInfo(bankGroupFormData as ITraditionalBankInfo, financeType)
		}

		else {
			mfs = new MfsInfo(mfsGroupFormData as IMobileFinancialServiceInfo, financeType);
		}

		const financialInfo = new UserFinancialInfo(mfs, bfs, financeType);

		return financialInfo;
	}


	mergeAllDocumentIds(docsInGeneralInfoForm: string[], docsInProInfoForm: string[]) {
		return [...docsInGeneralInfoForm, ...docsInProInfoForm]
	}

	parsePasswordFromGroup(groupData: any) {

		return groupData.Password;
	}


	prepareUserRegistrationPayload(
		generalInfoFormData: ISignUpGeneralInfoFormData,
		professionalInfoFormData: ISignUpProfessionalInfoFormData,
		financialInfo: UserFinancialInfo): IRegisterUserPayload {

		// need to complete this
		let payload: IRegisterUserPayload = {
			firstName: generalInfoFormData.FirstName,
			lastName: generalInfoFormData.LastName,
			dob: this.getDateOnlyString(new Date(generalInfoFormData.DateOfBirth)),
			gender: generalInfoFormData.Gender,
			email: generalInfoFormData.Email,
			nidNumber: generalInfoFormData.NidNumber,
			financialInfo: this._util.trimStringPropFromAnObject(financialInfo),
			businessPhoneNumber: professionalInfoFormData.BusinessPhoneNumber,
			businessEmail: professionalInfoFormData.BusinessEmail,
			Specializations: professionalInfoFormData.Specializations,
			password: this.parsePasswordFromGroup(generalInfoFormData.PasswordGroup),
			DocumentIds: this.mergeAllDocumentIds(professionalInfoFormData.ProfessionalDocuments, []),
			profileImageId: '',
		}

		payload = this._util.trimStringPropFromAnObject(payload);
		return payload;

	}


}
