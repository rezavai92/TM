import { DoctorsSpecializationEnum } from "../shared-data/shared-enums";

export const defaultDate = '0001-01-01';
export enum UserRoles  {
    DOCTOR= 'Doctor',
}

export const Roles = [UserRoles.DOCTOR];

export const SpecializationRoleMapList = [
    {
        specialization: DoctorsSpecializationEnum.EyeSpecialist,
        role : UserRoles.DOCTOR
    },

    {
        specialization: DoctorsSpecializationEnum.HeartSpecialist,
        role : UserRoles.DOCTOR
    },

    {
        specialization: DoctorsSpecializationEnum.GeneralDoctor,
        role : UserRoles.DOCTOR
    },


]

