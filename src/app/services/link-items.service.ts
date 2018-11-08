import { Injectable } from '@angular/core';
import { ManagePersonsService } from './manage-persons.service';
import { ManageObjectsService } from './manage-objects.service';
import { ManageItemsService } from './manage-items.service';
import { IObject } from 'src/data/object.interface';
import { IPerson } from 'src/data/person.interface';

@Injectable({
  providedIn: 'root'
})
export class LinkItemsService {

   /**
    * Life Cycle Hooks
    */
  constructor(
    private _managePersons: ManagePersonsService,
    private _manageObjects: ManageObjectsService,
  ) {}

  /**
   * Methods
   */

  // public listOfObjectsIdsForAPerson(personId: string): Array<string> {
  //   const list: Array<string> = [];
  //   this._manageObjects.listOfObjectsIds.forEach((id: string) => {
  //     if (this._manageObjects.object(id).personId === personId) {
  //       list.push(id);
  //     }
  //   });
  //   return list;
  // }

}
