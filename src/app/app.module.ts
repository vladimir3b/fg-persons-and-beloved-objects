import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { WindowModule } from '@progress/kendo-angular-dialog';

import { RootComponent } from './components/root/root.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { KuiWindowComponent } from './components/kui-window/kui-window.component';
import { CustomComponentComponent } from './components/custom-component/custom-component.component';


@NgModule({
  declarations: [
    RootComponent,
    KuiWindowComponent,
    CustomComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    DialogsModule,
    WindowModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
