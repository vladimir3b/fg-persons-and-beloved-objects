import { ManagePersonsService } from './services/manage-persons.service';
import { ManageObjectsService } from './services/manage-objects.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTreeModule } from '@angular/material/tree';
import { WindowModule } from '@progress/kendo-angular-dialog';

import { RootComponent } from './components/root/root.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { KuiWindowComponent } from './components/kui-window/kui-window.component';
import { ManageItemsService } from './services/manage-items.service';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { ListOfItemsComponent } from './components/list-of-items/list-of-items.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RootComponent,
    KuiWindowComponent,
    MenuBarComponent,
    MainHeaderComponent,
    DashboardComponent,
    NavigatorComponent,
    ListOfItemsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTreeModule,
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
