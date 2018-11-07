import { Injectable } from '@angular/core';

import { ManageItemsService, IModifiedItem } from './manage-items.service';
import { IObject } from 'src/data/object.interface';
import { objects } from 'src/data/object.data';
import { BelovedObject } from 'src/data/object.class';


interface IManageObjectsMetadata {
  markedForEdit: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ManageObjectsService {

  /**
   * Properties
   */
  public listOfObjectsIds: Array<string> = [];

  /**
   * Life Cycle Hooks
   */
  constructor(private _manageItems: ManageItemsService<IObject, IManageObjectsMetadata, string>) {
    this._manageItems.listOfItemsWasModified.subscribe((modifiedObjects: IModifiedItem<string>) => {
      this.listOfObjectsIds = this._manageItems.listOfItemsIds('beloved-object');
    });
    this._manageItems.initialize(objects, {
      markedForEdit: false
    }, 'beloved-object');
  }

  /**
   * Methods
   */
  private _clone(object: IObject): IObject {
    return new BelovedObject(
      object.id,
      object.age,
      object.color,
      object.type,
      object.about,
      object.personId
    );
  }

  public object(id: string): IObject {
    return this._manageItems.item(id, this._clone, 'beloved-object');
  }

  public add(object: IObject): void {
    this._manageItems.add(object, {
      markedForEdit: false
    }, 'beloved-object');
  }

  public delete(id: string): void {
    this._manageItems.delete(id, 'beloved-object');
  }

  public update(id: string, newObject: IObject): void {
    this._manageItems.update(id, newObject, this._clone, 'beloved-object');
  }

  public markedForEdit(id: string): boolean {
    return this._manageItems.metadata(id, 'beloved-object').markedForEdit;
  }

  public markForEdit(id: string): void {
    this._manageItems.changeMetadata(id, {
      markedForEdit: true
    }, 'beloved-object');
  }

}
