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
  age?: () => string;
  listOfObjects?: () => Array<IObject>;
}

export {
  GenderType,
  IPerson,
  IPersonName
};
