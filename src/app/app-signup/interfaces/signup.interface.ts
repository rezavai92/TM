import { DoctorsSpecializationEnum } from '../../shared/shared-data/shared-enums';
import { UserFinancialInfo } from '../models/bank-information.model';

export interface IRegisterUserPayload {
	FirstName: string;
	LastName: string;
	//address: string,
	Email: string;
	Dob: string;
	ProfileImageId: string;
	UserId?: string;
	Gender: string;
	NidNumber: string;
	PhoneNumber: string;
	FinancialInfo: UserFinancialInfo;
	BusinessPhoneNumber: string;
	BusinessEmail: string;
	Specializations: DoctorsSpecializationEnum[];
	Password: string;
	DocumentIds: string[];
	Roles: string[];
}
