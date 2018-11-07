import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type TypeOfItem = 'beloved-object' | 'person';
type TypeOfOperation = 'add' | 'delete';

interface IItem<V> {
  id: V;
}

interface IManageItems<T extends IItem<V>, U, V> {
  obj: T;
  typeOfItem: TypeOfItem;
  metadata: U;
}

interface IModifiedItem<V> {
  id: V;
  typeOfItem: TypeOfItem;
  operation: TypeOfOperation;
}

@Injectable({
  providedIn: 'root'
})
class ManageItemsService<T extends IItem<V>, U, V> {
  /**
   *  T = type/interface of items - persons or objects
   *  U = type/interface of metadata - to mark edited items
   *  V = type of ids, generally we use string
   */

  /**
   * Properties
   */
  private _listOfItems: Array<IManageItems<T, U, V>> = [];
  public listOfItemsWasModified: Subject<IModifiedItem<V>> = new Subject();

  /**
   * Life Cycle Hooks
   */
  constructor() { }

  /**
   * Methods
   */
  private _item(id: V, typeOfItem: TypeOfItem): T {
    return this._listOfItems.find((item: IManageItems<T, U, V>) => (id === item.obj.id) && (item.typeOfItem === typeOfItem)).obj;
  }

  private _indexForId(id: V, typeOfItem: TypeOfItem): number {
    return this._listOfItems.findIndex((item: IManageItems<T, U, V>) => (id === item.obj.id) && (item.typeOfItem === typeOfItem));
  }

  public initialize(listOfItems: Array<T>, metadata: U, typeOfItem: TypeOfItem): void {
    listOfItems.forEach((item: T) => {
      this.add(item, metadata, typeOfItem);
    });
  }

  public listOfItemsIds(typeOfItem: TypeOfItem): Array<V> {
    const list: Array<V> = [];
    this._listOfItems.forEach((item: IManageItems<T, U, V>) => {
      if (item.typeOfItem === typeOfItem) {
        list.push(item.obj.id);
      }
    });
    return list;
  }

  public item(id: V, clone: (item: T) => T, typeOfItem: TypeOfItem): T {
    return clone(this._item(id, typeOfItem));
  }

  public add(obj: T,  metadata: U, typeOfItem: TypeOfItem): void {
    this._listOfItems.push({
      obj,
      metadata,
      typeOfItem
    });
    this.listOfItemsWasModified.next({
      id: obj.id,
      typeOfItem,
      operation: 'add'
    });
  }

  public delete(id: V, typeOfItem: TypeOfItem): void {
    this.listOfItemsWasModified.next({
      id: this._item(id, typeOfItem).id,
      typeOfItem,
      operation: 'delete'
    });
    this._listOfItems.splice(this._indexForId(id, typeOfItem), 1);
  }

  public update(id: V, newItem: T, clone: (item: T) => T, typeOfItem: TypeOfItem ): void {
    this._listOfItems[this._indexForId(id, typeOfItem)].obj = clone(newItem);
  }

  public changeMetadata(id: V, metadata: U, typeOfItem: TypeOfItem): void {
    this._listOfItems[this._indexForId(id, typeOfItem)].metadata = metadata;
  }

  public metadata(id: V, typeOfItem: TypeOfItem): U {
    return this._listOfItems[this._indexForId(id, typeOfItem)].metadata;
  }

}

export {
  TypeOfItem,
  IModifiedItem,
  TypeOfOperation,
  ManageItemsService
};
