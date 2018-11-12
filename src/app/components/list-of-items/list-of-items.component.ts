import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { INavigationBorders } from '../navigator/navigator.component';
import { ManagePersonsService, PersonsModifiedEvent } from 'src/app/services/manage-persons.service';
import { ManageObjectsService } from 'src/app/services/manage-objects.service';
import { IPerson } from 'src/data/person.interface';
import { IObject } from 'src/data/object.interface';

const PAGE_SIZE_OPTIONS_FOR_PERSONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100];
const OPTION_INDEX_FOR_PERSONS = 1;
const PAGE_NUMBER_FOR_PERSONS = 0;

interface IItemStat {
  person: number;
  object: number;
}

interface IListOfItems {
  pageNumber: IItemStat;
  itemsPerPage: IItemStat;
  selectedIndex: IItemStat;
}

interface IManageIndexesForLists {
  pageSizeOptions: Array<number>;
  optionIndex: number;
  pageNumber: number;
  firstIndex: number;
  lastIndex: number;
  openedIndex: number;
}

@Component({
  selector: 'fg-list-of-items',
  templateUrl: './list-of-items.component.html',
  styleUrls: ['./list-of-items.component.scss']
})
export class ListOfItemsComponent implements OnInit {

  /**
   * Properties
   */
  private _itemsPerPagePersons: number;
  private _itemsPerPageObjects: number;
  private _pageNumberPersons: number;
  private _pageNumberObjects: number;

  public manageIndexesForPersonsList: IManageIndexesForLists;
  public manageIndexesForObjectsList: IManageIndexesForLists;

  public firstPersonsIndex: number;
  public lastPersonsIndex: number;
  public firstObjectsIndex: number;
  public lastObjectsIndex: number;
  public pageSizeOptionsIndex: {
    persons: number;
    objects: number;
  } ;
  public pageNumber:{
    persons: number;
    objects: number;
  }
  public pageSizeOptions: { 
    persons: Array<number>;
    objects: Array<number>
  };
  public indexOpenedPerson: number;
  public indexOpenedObject: number;

  public appellative: { female: string; male: string; };

  public listOfPersonsIds: Array<string> = [];
  public get numberOfElements(): number {
    return this.listOfPersonsIds.length;
  }

  public dataListOfItems: Subject<IListOfItems>;

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
    this.manageIndexesForPersonsList = {
      pageSizeOptions: PAGE_SIZE_OPTIONS_FOR_PERSONS,
      optionIndex: OPTION_INDEX_FOR_PERSONS,
      pageNumber: PAGE_NUMBER_FOR_PERSONS,
      firstIndex: 0,
      lastIndex: 
    }
    this.pageSizeOptionsIndex = {
      persons: 0,
      objects: 0
    };
    this.pageNumber = {
      persons: 4,
      objects: 3
    };
    this.pageSizeOptions = {
      persons: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100],
      objects: [5, 10, 15]
    };
    this._managePersons.personsModified.subscribe((personModified: PersonsModifiedEvent) => {
      this.listOfPersonsIds = this._managePersons.listOfPersonsIds();
      if (personModified.operation === 'delete') {
        console.log(`Person ${ personModified.item.name.firstName } ${ personModified.item.name.lastName } was deleted...`);
      }
    });
    this.dataListOfItems = new Subject();
  }

  ngOnInit() {
    this.indexOpenedPerson = -1;
    this.indexOpenedObject = -1;
    this.firstPersonsIndex = 0;
    this.lastPersonsIndex = this.pageSizeOptions.persons[this.pageSizeOptionsIndex] ;
    this.firstObjectsIndex = 0;
    this.lastObjectsIndex = 5;
    this._itemsPerPagePersons = this.pageSizeOptions.persons[this.pageSizeOptionsIndex] ;
    // this._itemsPerPageObjects = 
  }

   /**
   * Methods
   */
  public emitDataListOfItems() {
    let l: IListOfItems = {
      itemsPerPage: {
        person: this._itemsPerPagePersons,
        object: this._itemsPerPageObjects
      },
      pageNumber: {
        person: this._pageNumberPersons,
        object: this._pageNumberObjects
      },
      selectedIndex: {
        person: this.indexOpenedPerson,
        object: this.indexOpenedObject
      }
    }
    console.log(l);
  }

  public navigatePersons(navigationBorders: INavigationBorders): void { 
    // this._
    this.firstPersonsIndex = navigationBorders.firstElement;
    this.lastPersonsIndex = navigationBorders.lastElement;
  }

  public navigateObjects(navigationBorders: INavigationBorders): void {
    console.log(navigationBorders);
    this.firstObjectsIndex = navigationBorders.firstElement;
    this.lastObjectsIndex = navigationBorders.lastElement;
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

  public deletePerson(id: string): void {
    this._managePersons.delete(id);
    this.indexOpenedPerson = -1;
    this.indexOpenedObject = -1;
  }

  public deleteObject(id: string): void {
    this._manageObjects.delete(id);
    this.indexOpenedObject = -1;
  }

  openedPerson(index: number): void {
    this.indexOpenedPerson = index;
  }

  closedPerson(): void {
    this.indexOpenedPerson = -1;
  }

  openedObject(index: number): void {
    this.indexOpenedObject = index;
  }

  closedObject(): void {
    this.indexOpenedObject = -1;
  }


}
