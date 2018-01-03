import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  saveRecipeData() {
    const req = new HttpRequest(
      'PUT',
      'https://derp-kitchen-erp.firebaseio.com/derp.json',
      this.recipeService.getRecipes()
    );
    return this.http.request(req);
  }

  fetchRecipeData() {
    return this.http.get<Recipe[]>(
      'https://derp-kitchen-erp.firebaseio.com/derp.json'
    ).map(
      (recipes: Recipe[]) => {
        for (const recipe of recipes) {
          if (!recipe['shoppingListState']) {
            recipe['shoppingListState'] = [];
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
