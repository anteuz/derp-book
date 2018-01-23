import {Recipe} from '../../shared/recipe.model';
import {ColorPalette, Ingredient} from '../../shared/ingredient.model';
import * as RecipeActions from '../store/recipe.actions';
import * as fromApp from '../../store/app.reducers';
import {IngredientAmountType, RecipeIngredient} from '../../shared/recipeIngredient.model';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Tasty Tester Pasta',
      'A super tasty italian style pasta',
      'http://www.seriouseats.com/images/2017/03/20170306-fast-pasta-recipes-roundup-01.jpg',
      [
        new RecipeIngredient(new Ingredient('Pasta', 'COLOR1'), 10, 'PCT'),
        new RecipeIngredient(new Ingredient('Tomato sauce', 'COLOR4'), 2, 'PCT')
      ]
    )
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.recipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
