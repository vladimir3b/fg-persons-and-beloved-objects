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
  ) {
    this._manageObjects = Injector.create([{
      provide: ManageObjectsService
    }]).get(ManageObjectsService);
    // read more on https://stackoverflow.com/questions/38309481/angular-2-inject-service-into-class/43887382
  }

  /**
   * Methods
   */
  public age(): string {
    return moment(this.birthDate, 'YYYYMMDD').fromNow();
  }

  public listOfObjectsIds(): Array<string> {
    const list: Array<string> = [];
    this._manageObjects.listOfObjectsIds.forEach((id: string) => {
      if (this._manageObjects.object(id).personId === this.id) {
        list.push(id);
      }
    });
    return list;
  }

}
