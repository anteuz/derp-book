import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService) { }

  saveRecipeData() {
    return this.http.put(
      'https://derp-kitchen-erp.firebaseio.com/derp.json',
      this.recipeService.getRecipes()
    );
  }
  fetchRecipeData() {
    return this.http.get(
      'https://derp-kitchen-erp.firebaseio.com/derp.json'
    ).map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.initRecipes(recipes);
      }
    );
  }
}
