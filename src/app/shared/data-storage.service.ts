import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) { }

  saveRecipeData() {
    const token = this.authService.getToken();
    return this.http.put(
      'https://derp-kitchen-erp.firebaseio.com/derp.json?auth=' + token,
      this.recipeService.getRecipes()
    );
  }
  fetchRecipeData() {
    const token = this.authService.getToken();

    return this.http.get(
      'https://derp-kitchen-erp.firebaseio.com/derp.json?auth=' + token
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
