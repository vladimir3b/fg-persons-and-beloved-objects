import { Injectable } from '@angular/core';

import { IPerson } from 'src/data/person.interface';
import { ManageItemsService, IModifiedItem } from './manage-items.service';
import { persons } from 'src/data/person.data';
import { Person } from 'src/data/person.class';

interface IManagePersonsMetadata {
  markedForEdit: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ManagePersonsService {

  /**
   * Properties
   */
  public listOfPersonsIds: Array<string> = [];

   /**
    * Life Cycle Hooks
    */
  constructor(private _manageItems: ManageItemsService<IPerson, IManagePersonsMetadata, string>) {
    this._manageItems.listOfItemsWasModified.subscribe((modifiedPersons: IModifiedItem<string>) => {
      this.listOfPersonsIds = this._manageItems.listOfItemsIds('person');
    });
    this._manageItems.initialize(persons, {
      markedForEdit: false
    }, 'person');
  }

  /**
   * Methods
   */
  private _clone(person: IPerson): IPerson {
    return new Person(
      person.id,
      person.birthDate,
      person.name,
      person.gender,
      person.address,
      person.phone
    );
  }

  public person(id: string): IPerson {
    return this._manageItems.item(id, this._clone, 'person');
  }

  public add(person: IPerson): void {
    this._manageItems.add(person, {
      markedForEdit: false
    }, 'person');
  }

  public delete(id: string): void {
    this._manageItems.delete(id, 'person');
  }

  public markedForEdit(id: string): boolean {
    return this._manageItems.metadata(id, 'person').markedForEdit;
  }

  public markForEdit(id: string): void {
    this._manageItems.changeMetadata(id, {
      markedForEdit: true
    }, 'person');
  }

}
