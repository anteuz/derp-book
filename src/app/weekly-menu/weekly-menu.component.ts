import {Component, OnInit} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';
import {Observable} from 'rxjs/Observable';
import * as fromWeeklyMenu from './store/weekly-menu.reducers';
import * as WeeklyMenuActions from './store/weekly-menu.actions';
import {Store} from '@ngrx/store';
import {Recipe} from '../shared/recipe.model';

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


  onDrop(e: DropEvent, day: string) {
    const fromSlot = e.dragData.fromSlot;
    const recipeItem = e.dragData.item;
    const dropToDay = day;
    console.log(fromSlot, recipeItem, day);
    this.store.dispatch(new WeeklyMenuActions.AddRecipeToMenuSlot({slotName: day, recipe: recipeItem}));
    if (fromSlot === 'unsorted') {
      this.store.dispatch(new WeeklyMenuActions.RemoveRecipeFromUnsortedSlot(recipeItem));
    } else {
      this.store.dispatch(new WeeklyMenuActions.RemoveRecipeFromMenuSlot({slotName: fromSlot, recipe: recipeItem}));
    }
  }
  onDropToUnsorted(e: DropEvent) {
    console.log(e);
    const recipe: Recipe = e.dragData.item;
    console.log(recipe);
    const day = e.dragData.fromSlot;
    console.log(day);
    this.store.dispatch(new WeeklyMenuActions.RemoveRecipeFromMenuSlot({slotName: day, recipe: recipe}));
    this.store.dispatch(new WeeklyMenuActions.AddRecipeToUnSortedSlot(recipe));
  }

}
