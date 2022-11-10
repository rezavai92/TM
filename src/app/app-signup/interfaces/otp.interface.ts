import { UserRoles } from '../../shared/constants/tm-config.constant'

export interface IProcessOtpPayload{
    MobileNumber: string,
    Role: UserRoles
}

export interface IVerifyOtpPayload{
    MobileNumber: string,
    Role: UserRoles,
    Otp : string
}