import * as moment from 'moment';

import {
  IPerson,
  IPersonName,
  GenderType
} from './person.interface';
import { IObject } from './object.interface';
import { objects } from './object.data';

export class Person implements IPerson {

  /**
   * Properties
   */
  constructor (
    public id: string,
    public birthDate: string,
    public name: IPersonName,
    public gender: GenderType,
    public address: string,
    public phone: string
  ) {}

  /**
   * Methods
   */
  public age(): string {
    return moment(this.birthDate, 'YYYYMMDD').fromNow();
  }

  public listOfObjects(): Array<IObject> {
    const list: Array<IObject> = [];
    objects.forEach((object: IObject) => {
      if (object.personId === this.id) {
        list.push(object);
      }
    });
    return list;
  }

}
