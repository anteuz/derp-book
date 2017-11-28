import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {
 recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Yummu stuff',
      'Dummy recipe',
      'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/73536_445913437265_1694896_n.jpg?oh=c5416ff7447f12b0380cbeaf8de7f287&oe=5A6BC2CB',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potato', 4)
      ]),
    new Recipe(
      'Yummu stuff',
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

}
