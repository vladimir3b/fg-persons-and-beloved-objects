import { IPerson } from 'src/data/person.interface';
import { Component, OnInit } from '@angular/core';

import { ManagePersonsService, PersonsModifiedEvent } from 'src/app/services/manage-persons.service';
import { Person } from 'src/data/person.class';

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
  public numberOfElementsPerPage: number = 10;
  public get numberOfElements(): number {
    return this.listOfPersonsIds.length;
  }
  pageSizeOptions: number[] = [5, 10, 25, 100];
  public appellative  = {
    female: 'Mrs.',
    male: 'Mr.'
  };
  public listOfPersonsIds: Array<string> = [];

  /**
   * Life Cycle Hooks
   */
  constructor(private _managePersons: ManagePersonsService) {
    this._managePersons.personsModified.subscribe((personModified: PersonsModifiedEvent) => {
      // console.log(personModified.id);
      this.listOfPersonsIds = this._managePersons.listOfPersonsIds();
    });
  }

  ngOnInit() {
    this._managePersons.simulateReadData();
  }

    /**
   * Methods
   */
  public person(id: string): IPerson {
    return this._managePersons.person(id);
  }

}
