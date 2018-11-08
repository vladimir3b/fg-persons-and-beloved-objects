import { IObject } from './object.interface';

type GenderType = 'male' | 'female';

interface IPersonName {
  firstName: string;
  lastName: string;
  middleName?: string;
}

interface IPerson {
  id: string;
  birthDate: string;
  name: IPersonName;
  gender: GenderType;
  address: string;
  phone: string;
  listOfObjectsIds?: Array<string>;
  age?: () => number;
}

export {
  GenderType,
  IPerson,
  IPersonName
};
