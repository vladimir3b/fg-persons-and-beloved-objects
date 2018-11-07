import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPerson } from 'src/data/person.interface';

type TypeOfOperation = 'add' | 'delete';

interface IItem<Id> {
  id: Id;
}

interface IManagedItem<Item extends IItem<Id>, ItemMetadata, Id> {
  item: Item;
  metadata: ItemMetadata;
}

interface IItemModifiedEvent<V> {
  id: V;
  operation: TypeOfOperation;
}

@Injectable({
  providedIn: 'root'
})
class ManageItemsService<    
    Item extends IItem<Id>,     
    ItemMetadata,
    Id
  > {


  /**
   * Properties
   */

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

  public add(
    managedItems: Array<IManagedItem<Item, ItemMetadata, Id>>,
    item: Item,
    metadata: ItemMetadata,
    itemsModified: Subject<IItemModifiedEvent<Id>>
    ): void {  
    managedItems.push({
      item,
      metadata
    });
    itemsModified.next({
      id: item.id,
      operation: 'add'
    })
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
  IManagedItem,
  IItemModifiedEvent,
  TypeOfOperation,
  ManageItemsService
};
