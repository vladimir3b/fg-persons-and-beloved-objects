import { IPerson } from 'src/data/person.interface';
import { Component, OnInit } from '@angular/core';

import { ManagePersonsService, PersonsModifiedEvent } from 'src/app/services/manage-persons.service';
import { Person } from 'src/data/person.class';
import { ManageObjectsService } from 'src/app/services/manage-objects.service';
import { IObject } from 'src/data/object.interface';

interface ICloseableTab {
  title: string;
  content: string;
}

@Component({
  selector: 'fg-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  /**
   * Properties
   */

  /**
   * Life Cycle Hooks
   */
  constructor(
    private _managePersons: ManagePersonsService,
    private _manageObjects: ManageObjectsService
  ) {}

  ngOnInit() {
    this._managePersons.simulateReadData();
    this._manageObjects.simulateReadData();
  }

  /**
   * Methods
   */


}
