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
    case WeeklyMenuActions.ADD_RECIPE_TO_MENU_SLOT:
      // get menulist of current weekly menu
      const menuList = [...state.weeklyMenu.menuList];
      // get menu for slot name
      const slotRecipes = menuList.find(x => x.day === action.payload.slotName);
      // add recipe to menu slot menu
      slotRecipes.menu.push(action.payload.recipe);
      // update state
      return {
        ...state,
        weeklyMenu: {...state.weeklyMenu, ...menuList}
      }
    default:
      return state;
  }
}
