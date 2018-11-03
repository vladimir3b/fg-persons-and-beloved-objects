import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'fg-kui-window',
  templateUrl: './kui-window.component.html',
  styleUrls: ['./kui-window.component.scss']
})
export class KuiWindowComponent implements OnInit, OnDestroy {

  /**
   * Properties
   */
  @Input() public opened: boolean;
  @Output() public openedChange: EventEmitter<boolean> = new EventEmitter();

  /**
   * Life Cycle Hooks
   */
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('Kendo-window was closed...');
  }

  /**
   * Methods
   */
  public close() {
    this.opened = false;
    this.openedChange.emit(false);
  }

}
