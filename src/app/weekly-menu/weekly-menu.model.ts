import {Recipe} from '../shared/recipe.model';

export class WeeklyMenu {

  constructor(public menuList: [{ day: string, menu: Recipe[] }] ) {}
}
