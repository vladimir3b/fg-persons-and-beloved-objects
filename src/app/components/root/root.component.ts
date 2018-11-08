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
  public appellative  = {
    female: 'Mrs.',
    male: 'Mr.'
  };

  public indexPageSizeOptions = 1;
  public pageSizeOptions: number[] = [5, 10, 20, 30];
  public firstIndex: number;
  public lastIndex: number;

  public listOfPersonsIds: Array<string> = [];
  public get numberOfElements(): number {
    return this.listOfPersonsIds.length;
  }  

  /**
   * Life Cycle Hooks
   */
  constructor(private _managePersons: ManagePersonsService) {
    this._managePersons.personsModified.subscribe((personModified: PersonsModifiedEvent) => {      
      this.listOfPersonsIds = this._managePersons.listOfPersonsIds();
      if (personModified.operation === 'delete') {
        console.log(`Person ${ personModified.item.name.firstName } ${ personModified.item.name.lastName } was deleted...`);
      }
    });
  }

  ngOnInit() {
    this._managePersons.simulateReadData();
    this.firstIndex = 0;
    this.lastIndex = this.pageSizeOptions[this.indexPageSizeOptions];
  }

    /**
   * Methods
   */
  public person(id: string): IPerson {
    return this._managePersons.person(id);
  }

  public changePage(pageEvent: any, $event: any) {
    const first: number = $event.pageSize * $event.pageIndex;
    const last: number = (($event.pageIndex + 1) * $event.pageSize <= $event.length) ?
      ($event.pageIndex + 1) * $event.pageSize : $event.length;
    this.firstIndex = first;
    this.lastIndex = last;
    pageEvent = $event;
  }

  public delete(id: string): void {
    this._managePersons.delete(id);
  }


}
