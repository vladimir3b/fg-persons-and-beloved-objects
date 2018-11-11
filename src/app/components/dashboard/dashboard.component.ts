import { Component, OnInit } from '@angular/core';
import { INavigationBorders } from '../navigator/navigator.component';

@Component({
  selector: 'fg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /**
   * Life Cycle Hooks
   */
  constructor() { }

  ngOnInit() {
  }

  /**
   * Methods
   */
  public showBorders(navigationBorders: INavigationBorders): void {
    console.log(navigationBorders);
  }

}
