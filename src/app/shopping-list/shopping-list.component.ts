import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromApp from '../store/app.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
import {IngredientAmountType, RecipeIngredient} from '../shared/recipeIngredient.model';
import {ColorPalette} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState: Observable<{ ingredients: RecipeIngredient[] }>;
  ingredientAmountTypes = IngredientAmountType;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.shoppingListState = this.store.select('shoppingList');

  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
  onCheckCollected(index: number) {
    this.store.dispatch(new ShoppingListActions.CollectIngredient(index));
  }
  onUndoCollected(ingredient: RecipeIngredient) {
    this.store.dispatch(new ShoppingListActions.ReturnIngredient(ingredient));

  }
  getStyle(ingredientColor: string) {
    return '5px solid ' + ColorPalette[ingredientColor];
  }
}
