import * as moment from 'moment';
import { Injector } from '@angular/core';

import {
  IPerson,
  IPersonName,
  GenderType
} from './person.interface';
import { IObject } from './object.interface';
import { ManageObjectsService } from 'src/app/services/manage-objects.service';
import { ManageItemsService } from 'src/app/services/manage-items.service';

export class Person implements IPerson {

  /**
   * Properties
   */
  private static _manageObjects: ManageObjectsService;

  constructor (
    public id: string,
    public birthDate: string,
    public name: IPersonName,
    public gender: GenderType,
    public address: string,
    public phone: string
  ) {

    if (!Person._manageObjects) {
      const injector = Injector.create({providers: [
        {
          provide: ManageObjectsService, 
          deps: [ ManageItemsService ]
        },
        {
          provide: ManageItemsService,
          deps: []
        }
      ]});     
      const manageItems = injector.get(ManageItemsService);
      console.log(manageItems)
      // Person._manageObjects = injector.get([ManageObjectsService]);
      // console.log('cretin', Person._manageObjects);
    }
    // const injector = Injector.create({providers: [{provide: ManageObjectsService, deps: []}]});
    // console.log(injector.get(ManageObjectsService));
    // console.log(injector.get(ManageObjectsService));
    // this._manageObjects = Injector.create({
    //   providers: [{
    //       provide: ManageObjectsService
    //     }
    //   ] 
    // }).get(ManageObjectsService);
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
    // this._manageObjects.listOfObjectsIds.forEach((id: string) => {
    //   if (this._manageObjects.object(id).personId === this.id) {
    //     list.push(id);
    //   }
    // });
    return list;
  }

}
