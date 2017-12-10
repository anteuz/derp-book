import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {


  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Yummu stuff1',
      'Dummy recipe',
      'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/73536_445913437265_1694896_n.jpg?oh=c5416ff7447f12b0380cbeaf8de7f287&oe=5A6BC2CB',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potato', 4)
      ]),
    new Recipe(
      2,
      'Yummu stuff2',
      'Dummy recipe',
      'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/73536_445913437265_1694896_n.jpg?oh=c5416ff7447f12b0380cbeaf8de7f287&oe=5A6BC2CB',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potato', 4)
      ])
  ];


  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }

}
