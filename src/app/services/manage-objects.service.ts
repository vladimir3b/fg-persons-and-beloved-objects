import { Injectable } from '@angular/core';

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
  constructor() {

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

}
