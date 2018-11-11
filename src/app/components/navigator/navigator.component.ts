import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

interface INavigationBorders {
  firstElement: number;
  lastElement: number;
}

@Component({
  selector: 'fg-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
class NavigatorComponent implements OnInit {

  /**
   * Properties
   */
  @Input() public showGoToPage: boolean;
  @Input() public showFirstLastButtons: boolean;
  @Input() public pageIndex: number;
  @Input() public pageSizeOptions: Array<number>;
  @Input() public numberOfElements: number;
  @Input() public optionIndex: number;
  @Output() public navigationBorders: EventEmitter<INavigationBorders>;
  public pageSize: number;

   /**
   * Life Cycle Hooks
   */
  constructor() {
    this.navigationBorders = new EventEmitter();
  }

  ngOnInit() {
    this.pageSize = this.pageSizeOptions[this.optionIndex];
  }

  /**
   * Methods
   */
  public changePage($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.navigationBorders.emit({
      firstElement: $event.pageSize * $event.pageIndex,
      lastElement: (($event.pageIndex + 1) * $event.pageSize <= $event.length) ?
      ($event.pageIndex + 1) * $event.pageSize : $event.length
    });
  }

  public numberOfPages(): number {
    return Math.floor(this.numberOfElements / this.pageSize);
  }

  public goToPage(pageNumber: number): void {
    if (pageNumber <= -1) {
      pageNumber = 0;
    }
    if (pageNumber >= this.numberOfPages() + 1) {
        pageNumber = this.numberOfPages();
    }
    this.changePage({
      pageIndex: pageNumber,
      pageSize:
    })
  }

}

export {
  INavigationBorders,
  NavigatorComponent
};
