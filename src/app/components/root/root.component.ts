import { IPerson } from 'src/data/person.interface';
import { Component, OnInit } from '@angular/core';
import { ManagePersonsService } from 'src/app/services/manage-persons.service';
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
  public listOfPersonsIds: Array<string> = [];

  /**
   * Life Cycle Hooks
   */
  constructor(private _managePersons: ManagePersonsService) {
    this.listOfPersonsIds = this._managePersons.listOfPersonsIds;
  }

  ngOnInit() {
    const testPerson = new Person('sdfsdfsf', '19991212', {firstName: 'adfsdf', lastName: 'etwaer'}, 'female','werwer','54545');
    console.log(testPerson);
  }

    /**
   * Methods
   */
  public person(id: string): IPerson {
    return this._managePersons.person(id);
  }

}
