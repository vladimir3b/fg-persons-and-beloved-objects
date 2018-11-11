import { Component, OnInit } from '@angular/core';
import { INavigationBorders } from '../navigator/navigator.component';
import { ManagePersonsService, PersonsModifiedEvent } from 'src/app/services/manage-persons.service';
import { ManageObjectsService } from 'src/app/services/manage-objects.service';
import { IPerson } from 'src/data/person.interface';
import { IObject } from 'src/data/object.interface';

@Component({
  selector: 'fg-list-of-items',
  templateUrl: './list-of-items.component.html',
  styleUrls: ['./list-of-items.component.scss']
})
export class ListOfItemsComponent implements OnInit {

  /**
   * Properties
   */
  public firstIndex: number;
  public lastIndex: number;
  public optionIndex: number;
  public pageIndex: number;
  public pageSizeOptions: Array<number>;

  public appellative: { female: string; male: string; };

  public listOfPersonsIds: Array<string> = [];
  public get numberOfElements(): number {
    return this.listOfPersonsIds.length;
  }


  /**
   * Life Cycle Hooks
   */
  constructor(
    private _managePersons: ManagePersonsService,
    private _manageObjects: ManageObjectsService
  ) {
    this.appellative = {
      female: 'Mrs.',
      male: 'Mr.'
    };
    this.optionIndex = 1;
    this.pageIndex = 0;
    this.pageSizeOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100];
    this._managePersons.personsModified.subscribe((personModified: PersonsModifiedEvent) => {
      this.listOfPersonsIds = this._managePersons.listOfPersonsIds();
      if (personModified.operation === 'delete') {
        console.log(`Person ${ personModified.item.name.firstName } ${ personModified.item.name.lastName } was deleted...`);
      }
    });
  }

  ngOnInit() {
    this.firstIndex = 0;
    this.lastIndex = this.pageSizeOptions[this.optionIndex];
  }

   /**
   * Methods
   */
  navigate(navigationBorders: INavigationBorders): void {
    this.firstIndex = navigationBorders.firstElement;
    this.lastIndex = navigationBorders.lastElement;
  }

  public person(id: string): IPerson {
    return this._managePersons.person(id);
  }

  public object(id: string): IObject {
    return this._manageObjects.object(id);
  }

  public listOfObjectsForAPerson(personId: string): Array<string> {
    return this._manageObjects.listOfObjectsForAPerson(personId);
  }

  public delete(id: string): void {
    this._managePersons.delete(id);
  }

}
