import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyMenuComponent } from './weekly-menu.component';
import {SharedModule} from '../shared/shared.module';
import {WeeklyMenuRoutingModule} from './weekly-menu-routing/weekly-menu.routing.module';
import {NgDragDropModule} from 'ng-drag-drop';
import {StoreModule} from '@ngrx/store';
import { WeeklyMenuReducers } from './store/weekly-menu.reducers';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WeeklyMenuRoutingModule,
    NgDragDropModule,
    StoreModule.forFeature('weeklyMenu', WeeklyMenuReducers)
  ],
  declarations: [
    WeeklyMenuComponent
  ]
})
export class WeeklyMenuModule { }
