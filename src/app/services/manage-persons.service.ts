import { Injectable } from '@angular/core';

import { IPerson } from 'src/data/person.interface';
import { persons } from 'src/data/person.data';
import { Person } from 'src/data/person.class';
import { Subject } from 'rxjs';

interface IManagePersonsMetadata {
  markedForEdit: boolean;
}

interface IManagePersons {
  person: IPerson;
  metadata: IManagePersonsMetadata;
}

@Injectable({
  providedIn: 'root'
})
export class ManagePersonsService {

  /**
   * Properties
   */
  private _listOfPersons: Array<IManagePersons> = [];
  public get numberOfPersons(): number {
    return this._listOfPersons.length;
  }
  public listOfPersonsWasModified: Subject<boolean> = new Subject();

   /**
    * Life Cycle Hooks
    */
  constructor() {
    persons.forEach((person: IPerson) => {
      this.add(person);
    });
  }

  /**
   * Methods
   */
  public personsById(): Array<string> {
    const list: Array<string> = [];
    this._listOfPersons.forEach((item: IManagePersons) => {
      list.push(item.person.id);
    });
    return list;
  }

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
    return this._clone(this._listOfPersons.find((item: IManagePersons) => id === item.person.id).person);
  }

  private _indexForId(id: string): number {
    return this._listOfPersons.findIndex((item: IManagePersons) => id === item.person.id);
  }

  public add(person: IPerson): void {
    this._listOfPersons.push({
      person,
      metadata: {
        markedForEdit: false
      }
    });
    this.listOfPersonsWasModified.next(true);
  }

  public delete(id: string): void {
    this._listOfPersons.splice(this._indexForId(id), 1);
    this.listOfPersonsWasModified.next(true);
  }

  public markedForEdit(id: string): boolean {
    return this._listOfPersons[this._indexForId(id)].metadata.markedForEdit;
  }

}
