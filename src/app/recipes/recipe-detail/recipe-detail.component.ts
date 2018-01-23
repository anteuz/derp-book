import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as WeeklyMenuActions from '../../weekly-menu/store/weekly-menu.actions';
import {Observable} from 'rxjs/Observable';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/take';
import {IngredientAmountType} from '../../shared/recipeIngredient.model';
import {ColorPalette} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;
  id: number;
  ingredientAmountTypes = IngredientAmountType;
  ingredientColors = ColorPalette;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeState = this.store.select('recipes');
        }
      );
  }

  addToShoppingList() {
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredients));
      });
  }

  addToWeeklyMenu() {
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new WeeklyMenuActions.AddRecipeToUnSortedSlot(
          recipeState.recipes[this.id]));
      });
  }

  onEditRecipe() {
    // complicated for demo purposes
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

  getStyle(ingredientColor: string) {
    return '5px solid ' + ColorPalette[ingredientColor];
  }
}
