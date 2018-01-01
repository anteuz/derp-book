import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  saveRecipeData() {
    const token = this.authService.getToken();
    return this.http.put(
      'https://derp-kitchen-erp.firebaseio.com/derp.json?auth=' + token,
      this.recipeService.getRecipes(),
      {
        observe: 'body',
        headers: new HttpHeaders().append('OwnSuperSecretHeader', 'Batman')
      }
    );
  }

  fetchRecipeData() {
    const token = this.authService.getToken();
    return this.http.get<Recipe[]>(
      'https://derp-kitchen-erp.firebaseio.com/derp.json?auth=' + token,
      {
        observe: 'body',
        responseType: 'json'
      }
    ).map (
      (recipes: Recipe[]) => {
        for (const recipe of recipes) {
           if (!recipe['ingredients']) {
             recipe['ingredients'] = [];
           }
         }
        return recipes;
      }
    ).subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.initRecipes(recipes);

      }
    );
  }
}
