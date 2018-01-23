import {Action} from '@ngrx/store';
import {Recipe} from '../../shared/recipe.model';

export const ADD_RECIPE_TO_UNSORTED_SLOT = 'ADD_RECIPE_TO_UNSORTED_SLOT';
export const ADD_RECIPE_TO_MENU_SLOT = 'ADD_RECIPE_TO_MENU_SLOT';
export const REMOVE_RECIPE_FROM_MENU_SLOT = 'REMOVE_RECIPE_FROM_MENU_SLOT';

export class AddRecipeToUnSortedSlot implements Action {
  readonly type = ADD_RECIPE_TO_UNSORTED_SLOT;
  constructor(public payload: Recipe) {}
}
export class AddRecipeToMenuSlot implements Action {
  readonly type = ADD_RECIPE_TO_MENU_SLOT;
  constructor(public payload: {slotName: string, recipe: Recipe}) {}
}
export class RemoveRecipeFromMenuSlot implements Action {
  readonly type = REMOVE_RECIPE_FROM_MENU_SLOT;
  constructor(public payload: {slotName: string, recipe: Recipe}) {}
}

export type WeeklyMenuActions = AddRecipeToUnSortedSlot | AddRecipeToMenuSlot | RemoveRecipeFromMenuSlot;
