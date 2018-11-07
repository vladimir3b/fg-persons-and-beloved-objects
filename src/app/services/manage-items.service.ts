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
  private _indexForId(
    managedItems: Array<IManagedItem<Item, ItemMetadata, Id>>,
    id: Id
  ): number {
    return managedItems.findIndex((element: IManagedItem<Item, ItemMetadata, Id>) => (id === element.item.id));
  }

  private _item(
    managedItems: Array<IManagedItem<Item, ItemMetadata, Id>>,
    id: Id
  ): Item {
    return managedItems[this._indexForId(managedItems, id)].item;
  }

  public listOfItemsIds(managedItems: Array<IManagedItem<Item, ItemMetadata, Id>>): Array<Id> {
    const list: Array<Id> = [];
    managedItems.forEach((element: IManagedItem<Item, ItemMetadata, Id>) => {
        list.push(element.item.id);
    });
    return list;
  }

  public item(
    managedItems: Array<IManagedItem<Item, ItemMetadata, Id>>,
    id: Id, clone: (item: Item) => Item
  ): Item {
    return clone(this._item(managedItems, id));
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
    });
  }

  public delete(
    managedItems: Array<IManagedItem<Item, ItemMetadata, Id>>,
    id: Id,
    itemsModified: Subject<IItemModifiedEvent<Id>>
  ): void {
    itemsModified.next({
      id: id,
      operation: 'delete'
    });
    managedItems.splice(this._indexForId(managedItems, id), 1);
  }

  public update(
    managedItems: Array<IManagedItem<Item, ItemMetadata, Id>>,
    id: Id,
    newItem: Item,
    clone: (item: Item) => Item
  ): void {
    managedItems[this._indexForId(managedItems, id)].item = clone(newItem);
  }

  public changeMetadata(
    managedItems: Array<IManagedItem<Item, ItemMetadata, Id>>,
    id: Id,
    metadata: ItemMetadata
  ): void {
    managedItems[this._indexForId(managedItems, id)].metadata = metadata;
  }

  public metadata(
    managedItems: Array<IManagedItem<Item, ItemMetadata, Id>>,
    id: Id
  ): ItemMetadata {
    return managedItems[this._indexForId(managedItems, id)].metadata;
  }

}

export {
  IManagedItem,
  IItemModifiedEvent,
  TypeOfOperation,
  ManageItemsService
};
