import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  saveRecipeData() {

    const token = this.authService.getToken();
/*    return this.http.put(
      'https://derp-kitchen-erp.firebaseio.com/derp.json',
      this.recipeService.getRecipes(),
      {
        observe: 'body',
        params: new HttpParams().append('auth', token)
      }
    );*/

    const req = new HttpRequest(
      'PUT',
      'https://derp-kitchen-erp.firebaseio.com/derp.json',
      this.recipeService.getRecipes()
    );
    return this.http.request(req);
  }

  fetchRecipeData() {
    const token = this.authService.getToken();
    return this.http.get<Recipe[]>(
      'https://derp-kitchen-erp.firebaseio.com/derp.json'
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
