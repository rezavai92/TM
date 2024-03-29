import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FinanceTypeEnum } from '../constants/signup.constants';
import {
	IMobileFinancialServiceInfo,
	ITraditionalBankInfo,
} from '../interfaces/bank-info.interface';
import {
	ISignUpGeneralInfoFormData,
	ISignupGeneralInfoFormDataForRegistration,
} from '../interfaces/general-info.interface';
import {
	IProfessionalInfoFormDataForRegistration,
	ISignUpProfessionalInfoFormData,
} from '../interfaces/professional-info.interface';
import { IRegisterUserPayload } from '../interfaces/signup.interface';
import {
	BankInfo,
	MfsInfo,
	UserFinancialInfo,
} from '../models/bank-information.model';
import * as moment from 'moment';
import { SharedUtilityService } from '../../shared/services/shared-utilities/shared-utility.service';
import { IHttpCommonResponse } from '../../shared/models/interfaces/HttpResponse.interface';
import {
	SpecializationRoleMapList,
	UserRoles,
} from '../../shared/constants/tm-config.constant';
import { DoctorsSpecializationEnum } from 'src/app/shared/shared-data/shared-enums';

@Injectable({
	providedIn: 'root',
})
export class SignupService {
	constructor(
		private http: HttpClient,
		private _util: SharedUtilityService
	) {}

	registerUser(payload: IRegisterUserPayload) {
		const headers: any = new HttpHeaders().set(
			'content-type',
			'application/json'
		);

		return this.http.post<IHttpCommonResponse<any>>(
			`${environment.UserService}RegisterUser`,
			payload,
			{
				headers: headers,
				observe: 'body',
				//	withCredentials : true
			}
		);
	}

	getDateOnlyString(date: Date) {
		const momentObject = moment(date);
		const d = momentObject.format('yyyy-MM-DD');
		return d.toString();
	}

	prepareFinancialInfoModelFromFormData(
		bankGroupFormData: ITraditionalBankInfo | null,
		mfsGroupFormData: IMobileFinancialServiceInfo | null,
		financeType: FinanceTypeEnum
	) {
		let bfs: BankInfo | null = null;
		let mfs: MfsInfo | null = null;

		if (financeType === FinanceTypeEnum.Bank) {
			bfs = new BankInfo(
				bankGroupFormData as ITraditionalBankInfo,
				financeType
			);
		} else {
			mfs = new MfsInfo(
				mfsGroupFormData as IMobileFinancialServiceInfo,
				financeType
			);
		}

		const financialInfo = new UserFinancialInfo(mfs, bfs, financeType);

		return financialInfo;
	}

	mergeAllDocumentIds(
		generalInfoFormData: ISignupGeneralInfoFormDataForRegistration,
		professionalInfoFormData: IProfessionalInfoFormDataForRegistration
	) {
		const documentIds = [
			generalInfoFormData.NidFrontPartDocId,
			generalInfoFormData.NidBackPartDocId,
			...professionalInfoFormData.ProfessionalDocumentIds,
		];

		return documentIds;
	}

	parsePasswordFromGroup(groupData: any) {
		return groupData.Password;
	}

	prepareUserRegistrationPayload(
		generalInfoFormData: ISignupGeneralInfoFormDataForRegistration,
		professionalInfoFormData: IProfessionalInfoFormDataForRegistration,
		financialInfo: UserFinancialInfo
	): IRegisterUserPayload {
		// need to complete this
		debugger;
		let payload: IRegisterUserPayload = {
			FirstName: generalInfoFormData.FirstName,
			LastName: generalInfoFormData.LastName,
			Dob: this.getDateOnlyString(
				new Date(generalInfoFormData.DateOfBirth)
			),
			Gender: generalInfoFormData.Gender,
			Email: generalInfoFormData.Email,
			NidNumber: generalInfoFormData.NidNumber,
			FinancialInfo: this._util.trimStringPropFromAnObject(financialInfo),
			BusinessPhoneNumber: professionalInfoFormData.BusinessPhoneNumber,
			BusinessEmail: professionalInfoFormData.BusinessEmail,
			Specializations: professionalInfoFormData.Specializations,
			Password: this.parsePasswordFromGroup(
				generalInfoFormData.PasswordGroup
			),
			DocumentIds: this.mergeAllDocumentIds(
				generalInfoFormData,
				professionalInfoFormData
			),
			ProfileImageId: generalInfoFormData.ProfileImageId,
			PhoneNumber: generalInfoFormData.PhoneNumber,
			Roles: [
				this.getUserRoleFromSpecialization(
					professionalInfoFormData.Specializations[0]
				) as string,
			],
		};

		payload = this._util.trimStringPropFromAnObject(payload);
		return payload;
	}

	storeUploadedDocumentIdsInSignup(id: string) {
		const stored = window.localStorage.getItem('signupUploadedDocIds');
		const parsedIds: string[] = stored ? JSON.parse(stored) : [];
		parsedIds.push(id);
		window.localStorage.setItem(
			'signupUploadedDocIds',
			JSON.stringify(parsedIds)
		);
	}

	cleanupUploadIdsFromStorage() {
		const stored = window.localStorage.getItem('signupUploadedDocIds');

		if (stored) {
			window.localStorage.removeItem('signupUploadedDocIds');
		}
	}

	getUserRoleFromSpecialization(desig: DoctorsSpecializationEnum) {
		const got = SpecializationRoleMapList.filter(
			(item) => item.specialization === desig
		);

		return got && got.length ? got[0].role : null;
	}
}
