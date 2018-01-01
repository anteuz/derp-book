import {Recipe} from './recipe.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  initRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
