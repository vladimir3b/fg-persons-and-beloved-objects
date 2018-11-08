import { Injectable } from '@angular/core';

import { IManagedItem, IItemModifiedEvent, ManageItemsService } from './manage-items.service';
import { IObject } from 'src/data/object.interface';
import { Subject } from 'rxjs';
import { BelovedObject } from 'src/data/object.class';
import { objects } from 'src/data/object.data';



type ManagedObject = IManagedItem<IObject, IObjectMetadata, string>;
type ObjectsModifiedEvent = IItemModifiedEvent<IObject>;

interface IObjectMetadata {
  markedForEdit: boolean;
}

const isEditedMetadata: IObjectMetadata = {
  markedForEdit: true
};

const isNotEditedMetadata: IObjectMetadata = {
  markedForEdit: false
};


@Injectable({
  providedIn: 'root'
})
 class ManageObjectsService {

  /**
   * Properties
   */
  private _managedObjects: Array<ManagedObject> = [];
  public objectsModified: Subject<ObjectsModifiedEvent> = new Subject();

  /**
   * Life Cycle Hooks
   */
  constructor(private _manageItems: ManageItemsService<
    IObject,
    IObjectMetadata,
    string
  >) {}

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

  public listOfObjectsIds(): Array<string> {
    return this._manageItems.listOfItemsIds(
      this._managedObjects
    );
  }

  public listOfObjectsForAPerson(personId: string): Array<string> {
    const list: Array<string> = [];
    this._managedObjects.forEach((element: ManagedObject) => {
      if (element.item.personId === personId) {
        list.push(element.item.id);
      }
    });
    return list;
  }

  public simulateReadData() {
    objects.forEach((object: IObject) => {
      this.add(object);
    });
  }

  public add(Object: IObject): void {
    this._manageItems.add(
      this._managedObjects,
      Object,
      isNotEditedMetadata,
      this.objectsModified
    );
  }

  public delete(id: string): void {
    this._manageItems.delete(
      this._managedObjects,
      id,
      this.objectsModified
    );
  }

  public object(id: string): IObject {
    return this._manageItems.item(this._managedObjects, id, this._clone);
  }

  public update(id: string, newObject: IObject): void {
    this._manageItems.update(this._managedObjects, id, newObject, this._clone);
  }

  public markForEdit(id: string): void {
    this._manageItems.changeMetadata(this._managedObjects, id, {
      markedForEdit: true
    });
  }

  public markedForEdit(id: string): boolean {
    return this._manageItems.metadata(this._managedObjects, id).markedForEdit;
  }

}


export {
  ObjectsModifiedEvent,
  ManageObjectsService
};
