import { PortalLanguageEnum } from './shared-enums';

export const Gender = [
  {
    Key: 'MALE',
    Value: 'male',
  },
  {
    Key: 'FEMALE',
    Value: 'female',
  },
  {
    Key: 'OTHERS',
    Value: 'others',
  },
];

export const PortalLanguages = [
  { Key: 'ENGLISH', Value: PortalLanguageEnum.English },
  { Key: 'BENGALI', Value: PortalLanguageEnum.Bengali },
];

export const emailRegexString = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';

export const numberRegexString = "^[0-9]*$";