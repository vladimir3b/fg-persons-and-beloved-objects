import { Injectable } from '@angular/core';

import { IPerson } from 'src/data/person.interface';
import { persons } from 'src/data/person.data';
import { Person } from 'src/data/person.class';
import { Subject } from 'rxjs';
import { ManageItemsService, IManagedItem, IItemModifiedEvent } from './manage-items.service';

type ManagedPerson = IManagedItem<IPerson, IPersonMetadata, string>;
type PersonsModifiedEvent = IItemModifiedEvent<IPerson>;

interface IPersonMetadata {
  markedForEdit: boolean;
}

const isEditedMetadata: IPersonMetadata = {
  markedForEdit: true
};

const isNotEditedMetadata: IPersonMetadata = {
  markedForEdit: false
};


@Injectable({
  providedIn: 'root'
})
class ManagePersonsService {

  /**
   * Properties
   */
  private _managedPersons: Array<ManagedPerson> = [];
  public personsModified: Subject<PersonsModifiedEvent> = new Subject();

   /**
    * Life Cycle Hooks
    */
  constructor(private _manageItems: ManageItemsService<
      IPerson,
      IPersonMetadata,
      string
    >) {}

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

  public listOfPersonsIds(): Array<string> {
    return this._manageItems.listOfItemsIds(
      this._managedPersons
    );
  }

  public simulateReadData() {
    persons.forEach((person: IPerson) => {
      this.add(person);
    });
  }

  public add(person: IPerson): void {
    this._manageItems.add(
      this._managedPersons,
      person,
      isNotEditedMetadata,
      this.personsModified
    );
  }

  public delete(id: string): void {
    this._manageItems.delete(
      this._managedPersons,
      id,
      this.personsModified
    );
  }

  public person(id: string): IPerson {
    return this._manageItems.item(this._managedPersons, id, this._clone);
  }

  public update(id: string, newPerson: IPerson): void {
    this._manageItems.update(this._managedPersons, id, newPerson, this._clone);
  }

  public markForEdit(id: string): void {
    this._manageItems.changeMetadata(this._managedPersons, id, {
      markedForEdit: true
    });
  }

  public markedForEdit(id: string): boolean {
    return this._manageItems.metadata(this._managedPersons, id).markedForEdit;
  }

}


export {
  PersonsModifiedEvent,
  ManagePersonsService
};
