import * as ShoppingListActions from './shopping-list.actions';
import {ColorPalette, Ingredient} from '../../shared/ingredient.model';
import {IngredientAmountType, RecipeIngredient} from '../../shared/recipeIngredient.model';

export interface State {
  ingredients: RecipeIngredient[];
  editedIngredient: RecipeIngredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new RecipeIngredient(new Ingredient('Apple', ColorPalette.COLOR4), 10, 'PCT'),
    new RecipeIngredient(new Ingredient('Mango', ColorPalette.COLOR5), 50, 'PCT')
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function ShoppingListReducers(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updateIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [... state.ingredients];
      ingredients[state.editedIngredientIndex] = updateIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
