import * as ShoppingListActions from './shopping-list.actions';
import {ColorPalette, Ingredient} from '../../shared/ingredient.model';
import {RecipeIngredient} from '../../shared/recipeIngredient.model';

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
      const ingredients = [...state.ingredients];
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

    case ShoppingListActions.COLLECT_INGREDIENT:
      const index = action.payload;
      const c_ingredient = state.ingredients[action.payload];
      c_ingredient.ingredient.isCollected = true;

      const c_ingredients = [...state.ingredients];
      c_ingredients[index] = c_ingredient;
      return {
        ...state,
        ingredients: c_ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.RETURN_INGREDIENT:
      const r_ingredient = action.payload;

      r_ingredient.ingredient.isCollected = false;

      const r_ingredients = [...state.ingredients];

      const r_index = r_ingredients.findIndex((x: RecipeIngredient) => {
        if (x.ingredient.ingredientName === r_ingredient.ingredient.ingredientName) {
          return true;
        } else {
          return false;
        }
      });

      r_ingredients[r_index] = r_ingredient;

      return {
        ...state,
        ingredients: r_ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
