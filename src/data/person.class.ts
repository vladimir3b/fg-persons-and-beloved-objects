import * as moment from 'moment';
import { Injector } from '@angular/core';

import {
  IPerson,
  IPersonName,
  GenderType
} from './person.interface';
import { IObject } from './object.interface';
import { ManageObjectsService } from 'src/app/services/manage-objects.service';

export class Person implements IPerson {

  /**
   * Properties
   */
  private _manageObjects: ManageObjectsService;

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
  public age(): number {
    return Number(moment(this.birthDate, 'YYYYMMDD').fromNow().split(' ')[0]);
  }

}
