import { ManagePersonsService } from './services/manage-persons.service';
import { ManageObjectsService } from './services/manage-objects.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { WindowModule } from '@progress/kendo-angular-dialog';

import { RootComponent } from './components/root/root.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { KuiWindowComponent } from './components/kui-window/kui-window.component';
import { ManageItemsService } from './services/manage-items.service';


@NgModule({
  declarations: [
    RootComponent,
    KuiWindowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatExpansionModule,
    DialogsModule,
    WindowModule
  ],
  providers: [ 
    ManageItemsService,
    ManageObjectsService,
    ManagePersonsService
   ],
  bootstrap: [RootComponent]
})
export class AppModule { }
