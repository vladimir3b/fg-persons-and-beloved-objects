import { Component, OnInit } from '@angular/core';

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
  public opened: boolean;
  public closeableTabs: Array<ICloseableTab> = [];

  /**
   * Life Cycle Hooks
   */
  constructor() { }

  ngOnInit() {
    this.opened = false;
    for (let i: number = 0; i <= 50; i++) {
      this.closeableTabs.push({
        title: `Title ${i}`,
        content: `Content ${i}`
      });
    }
  }

    /**
   * Methods
   */

   public onCloseTab(index: number): void {
    this.closeableTabs.splice(index, 1);
  }

}
