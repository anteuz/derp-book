import {WeeklyMenu} from '../weekly-menu.model';
import {Recipe} from '../../shared/recipe.model';
import * as WeeklyMenuActions from './weekly-menu.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  weeklyMenu: State;
  unSortedRecipes: State;
}

export interface State {
  weeklyMenu: WeeklyMenu;
  unSortedRecipes: Recipe[];
}

const initialState: State = {
  weeklyMenu: new WeeklyMenu(
    [
      {day: 'Monday', menu: []},
      {day: 'Tuesday', menu: []},
      {day: 'Wednesday', menu: []},
      {day: 'Thursday', menu: []},
      {day: 'Friday', menu: []},
      {day: 'Saturday', menu: []},
      {day: 'Sunday', menu: []}
    ]
  ),
  unSortedRecipes: []
};

export function WeeklyMenuReducers (state = initialState, action: WeeklyMenuActions.WeeklyMenuActions) {

  switch (action.type) {
    case WeeklyMenuActions.ADD_RECIPE_TO_UNSORTED_SLOT:
      return {
        ...state,
        unSortedRecipes: [...state.unSortedRecipes, action.payload]
      };
    case WeeklyMenuActions.REMOVE_RECIPE_FROM_UNSORTED_SLOT:
      const unSortedRecipes = [...state.unSortedRecipes];
      const removeIndex = unSortedRecipes.findIndex(item => item.name === action.payload.name);
      unSortedRecipes.splice(removeIndex, 1);
      return {
        ...state,
        unSortedRecipes: unSortedRecipes
      }
    case WeeklyMenuActions.ADD_RECIPE_TO_MENU_SLOT:
      // get menu list of current weekly menu
      const menuList = [...state.weeklyMenu.menuList];
      // get menu for slot name
      const slotRecipes = menuList.find(x => x.day === action.payload.slotName);
      // add recipe to menu slot
      slotRecipes.menu.push(action.payload.recipe);
      // update state
      return {
        ...state,
        weeklyMenu: {...state.weeklyMenu, ...menuList}
      }
    case WeeklyMenuActions.REMOVE_RECIPE_FROM_MENU_SLOT:
      // get menu list of current weekly menu
      const r_menuList = [...state.weeklyMenu.menuList];
      // get menu for slot name
      const r_slotRecipes = r_menuList.find(x => x.day === action.payload.slotName);
      // remove recipe from menu slot
      const r_index = r_slotRecipes.menu.findIndex(d => d.name === action.payload.recipe.name); // find index in your
      // array
      // splice from array
      r_slotRecipes.menu.splice(r_index, 1);
      // update state
      return {
        ...state,
        weeklyMenu: {...state.weeklyMenu, ...r_menuList}
      }
    default:
      return state;
  }
}
