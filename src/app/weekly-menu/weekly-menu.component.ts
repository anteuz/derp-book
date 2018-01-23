import {Component, OnInit} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';
import {Observable} from 'rxjs/Observable';
import * as fromWeeklyMenu from './store/weekly-menu.reducers';
import * as WeeklyMenuActions from './store/weekly-menu.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.css']
})
export class WeeklyMenuComponent implements OnInit{

  weeklyMenuState: Observable<fromWeeklyMenu.State>;

  constructor(
    private store: Store<fromWeeklyMenu.FeatureState>
  ) {}


  ngOnInit() {
    this.weeklyMenuState = this.store.select('weeklyMenu');
  }


  onDrop(e: DropEvent, index: number, day: string) {
    console.log(e, index, day);
    this.store.dispatch(new WeeklyMenuActions.AddRecipeToMenuSlot({slotName: day, recipe: e.dragData}));
  }

  removeItem(item: any, list: Array<any>) {

  }

}
