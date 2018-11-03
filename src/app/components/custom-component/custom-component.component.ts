import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'fg-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.scss']
})
export class CustomComponentComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    console.log('Custom component was created...');
  }

  ngOnDestroy(): void {
    console.log('Custom component was destroyed...');
  }

}
