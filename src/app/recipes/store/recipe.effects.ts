import {Actions, Effect} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/switchMap';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/withLatestFrom';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.http.get<Recipe[]>(
        environment.recipesApi
      );
    })
    .map(
      (recipes: Recipe[]) => {
        for (const recipe of recipes) {
          if (!recipe['shoppingListState']) {
            recipe['shoppingListState'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        environment.recipesApi,
        state.recipes
      );
      return this.http.request(req);
    });

constructor (private actions$: Actions, private http: HttpClient,
             private store: Store<fromRecipe.FeatureState>) {}
}
